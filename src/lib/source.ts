/**
 * Where a visitor came from — attached to every enquiry.
 *
 * Organic lead generation is only worth working at if you can tell it is
 * working. GA4 sees sessions; an enquiry in an inbox says nothing about how
 * the person found us. So the first thing a visit tells us (campaign tags, or
 * the site it came from) is kept for the session and written onto the
 * enquiry, and the lead email says "AI assistant (chatgpt.com)" instead of
 * nothing.
 *
 * Privacy: no personal data, no cookie. sessionStorage only, cleared when the
 * tab closes, and it holds a category, a hostname and a landing path. It counts
 * as analytics, so it is only written once the visitor has accepted analytics
 * (src/lib/consent.ts); until then it is held in memory and never stored.
 * Everything here is best-effort — a missing source is not an error.
 */

import { analyticsAllowed, consentState } from '@/lib/consent';

export type SourceKind = 'ai-assistant' | 'search' | 'social' | 'campaign' | 'referral' | 'direct';

export interface Source {
  kind: SourceKind;
  /** Hostname or campaign label, e.g. "chatgpt.com" or "newsletter / email". */
  detail?: string;
  /** The first page of the visit, e.g. "/services/website-os". */
  landing?: string;
}

const KEY = 'n3xus:source';

const AI_HOSTS = [
  'chatgpt.com',
  'chat.openai.com',
  'openai.com',
  'perplexity.ai',
  'claude.ai',
  'gemini.google.com',
  'copilot.microsoft.com',
  'you.com',
  'grok.com',
  'x.ai',
  'mistral.ai',
  'chat.mistral.ai',
  'deepseek.com',
  'meta.ai',
];
const SEARCH_HOSTS = ['google.', 'bing.com', 'duckduckgo.com', 'yahoo.com', 'ecosia.org', 'brave.com', 'startpage.com', 'yandex.'];
const SOCIAL_HOSTS = ['facebook.com', 'instagram.com', 'linkedin.com', 'lnkd.in', 'x.com', 'twitter.com', 't.co', 'tiktok.com', 'youtube.com', 'whatsapp.com', 'wa.me'];

const hostMatches = (host: string, list: string[]) =>
  list.some((h) => (h.endsWith('.') ? host.includes(h) : host === h || host.endsWith(`.${h}`)));

/** Pure: classify a visit from its URL query string and referrer. */
export function classifySource(search: string, referrer: string, ownHost = 'n3xus.media'): Source {
  const params = new URLSearchParams(search);
  const utmSource = params.get('utm_source')?.trim().toLowerCase();
  const utmMedium = params.get('utm_medium')?.trim().toLowerCase();

  if (utmSource) {
    // Links we publish for AI assistants to follow (llms.txt) are tagged.
    if (utmMedium === 'ai' || utmSource === 'llms.txt' || utmSource === 'llms') {
      return { kind: 'ai-assistant', detail: `link from ${utmSource}` };
    }
    return { kind: 'campaign', detail: utmMedium ? `${utmSource} / ${utmMedium}` : utmSource };
  }

  let host = '';
  try {
    host = referrer ? new URL(referrer).hostname.toLowerCase().replace(/^www\./, '') : '';
  } catch {
    host = '';
  }
  if (!host || host === ownHost || host.endsWith(`.${ownHost}`)) return { kind: 'direct' };
  if (hostMatches(host, AI_HOSTS)) return { kind: 'ai-assistant', detail: host };
  if (hostMatches(host, SEARCH_HOSTS)) return { kind: 'search', detail: host };
  if (hostMatches(host, SOCIAL_HOSTS)) return { kind: 'social', detail: host };
  return { kind: 'referral', detail: host };
}

const LABEL: Record<SourceKind, string> = {
  'ai-assistant': 'AI assistant',
  search: 'Search',
  social: 'Social',
  campaign: 'Campaign',
  referral: 'Another website',
  direct: 'Direct',
};

/** One readable line for an email: "AI assistant (chatgpt.com), landed on /services/ai". */
export function describeSourceValue(s: Source): string {
  const head = s.detail ? `${LABEL[s.kind]} (${s.detail})` : LABEL[s.kind];
  return s.landing ? `${head}, landed on ${s.landing}` : head;
}

/** Worked out on arrival, held in memory, and only written down once analytics is allowed. */
let pending: Source | null = null;

/** Call once per page load. Keeps the first source of the session, never overwrites it. */
export function captureSource(): void {
  try {
    if (!pending) {
      pending = {
        ...classifySource(location.search, document.referrer, location.hostname.replace(/^www\./, '')),
        landing: location.pathname,
      };
    }
    persistSource();
  } catch {
    // Not worth an exception.
  }
}

/** Writes the captured source down — only if the visitor has accepted analytics. */
export function persistSource(): void {
  try {
    if (!pending || !analyticsAllowed(consentState())) return;
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, JSON.stringify(pending));
  } catch {
    // Storage blocked (private mode, embedded). Not worth an exception.
  }
}

export function readSource(): Source | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Source) : null;
  } catch {
    return null;
  }
}

/** The line to send with an enquiry, or undefined if nothing was captured. */
export function currentSourceLine(): string | undefined {
  const s = readSource();
  return s ? describeSourceValue(s) : undefined;
}
