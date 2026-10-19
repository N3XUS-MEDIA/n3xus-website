/**
 * Cookie and storage consent.
 *
 * ── The rule ────────────────────────────────────────────────────────────────
 * Nothing that is not strictly necessary runs until the visitor says yes:
 * no Google tag, no analytics cookie, no lead-source note. Before a choice is
 * made (and after "reject") the site is exactly as functional, just unmeasured.
 *
 * ── The categories ──────────────────────────────────────────────────────────
 *   necessary   Always on, no consent needed: remembering this choice, and the
 *               light/dark setting the visitor picked themselves.
 *   analytics   Off until accepted: Google Analytics, and the session note of
 *               how the visitor arrived (src/lib/source.ts).
 *
 * There is deliberately no "marketing" category. The site runs no advertising
 * pixels (the old privacy text mentioned Meta Pixel and Google Ads; neither is
 * installed). If one is ever added, add a category here first: the test in
 * consent.test.ts fails if the privacy page does not describe it.
 *
 * ── Storage ─────────────────────────────────────────────────────────────────
 * The choice lives in localStorage under CONSENT_KEY, for 12 months, then we
 * ask again. A version bump (CONSENT_VERSION) also asks again, which is how a
 * new category gets consent rather than inheriting it.
 *
 * Everything here is safe to call where storage is blocked or absent.
 */

export const CONSENT_KEY = 'n3xus-consent';
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

/** The GA4 measurement id, so a withdrawal can switch collection off. */
export const GA4_MEASUREMENT_ID = 'G-223R7S2381';

export interface Consent {
  v: number;
  analytics: boolean;
  /** When the choice was made, ms since epoch. */
  at: number;
}

/** 'loading' on the server and the first client render: show nothing, avoid a flash. */
export type ConsentState = 'loading' | 'unset' | 'granted' | 'denied';

const CHANGE_EVENT = 'n3xus:consent';
const OPEN_EVENT = 'n3xus:consent-open';

/** Pure: validate what was stored. Anything malformed, stale or old-version is "no choice". */
export function parseConsent(raw: string | null, now = Date.now()): Consent | null {
  if (!raw) return null;
  try {
    const c = JSON.parse(raw) as Partial<Consent>;
    if (c.v !== CONSENT_VERSION) return null;
    if (typeof c.analytics !== 'boolean' || typeof c.at !== 'number') return null;
    if (now - c.at > CONSENT_MAX_AGE_MS || c.at > now + 60_000) return null;
    return { v: c.v, analytics: c.analytics, at: c.at };
  } catch {
    return null;
  }
}

/**
 * Held only when the browser refuses to store the choice (some private modes).
 * Without it the banner would come back on every page and the choice would
 * never take effect. Cleared as soon as a write succeeds.
 */
let memoryChoice: Consent | null = null;

export function readConsent(): Consent | null {
  try {
    const stored = parseConsent(localStorage.getItem(CONSENT_KEY));
    if (stored) return stored;
  } catch {
    // Fall through to the in-memory choice.
  }
  return memoryChoice;
}

/** Pure: the only thing that may switch analytics on. */
export function analyticsAllowed(state: ConsentState): boolean {
  return state === 'granted';
}

export function consentState(): ConsentState {
  const c = readConsent();
  return c ? (c.analytics ? 'granted' : 'denied') : 'unset';
}

/** Cookies the Google tag sets. Expired on withdrawal. */
export const ANALYTICS_COOKIE_PATTERNS = [/^_ga$/, /^_ga_/, /^_gid$/, /^_gat/, /^_gcl_/];

/** Pure: which of these cookie names are analytics cookies. */
export function analyticsCookieNames(cookieHeader: string): string[] {
  return cookieHeader
    .split(';')
    .map((c) => c.split('=')[0]!.trim())
    .filter((name) => name && ANALYTICS_COOKIE_PATTERNS.some((p) => p.test(name)));
}

function clearAnalyticsCookies(): void {
  try {
    const host = location.hostname.replace(/^www\./, '');
    for (const name of analyticsCookieNames(document.cookie)) {
      // A cookie is only removed by expiring it on the same domain and path it was set on.
      for (const domain of [undefined, host, `.${host}`]) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ''}`;
      }
    }
  } catch {
    // Best effort.
  }
}

/** Side effects of a choice. Granting does nothing here: the tag loads in <Analytics>. */
function applyConsent(analytics: boolean): void {
  try {
    // Google's documented opt-out switch: stops collection even if the tag is already loaded.
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_MEASUREMENT_ID}`] = !analytics;
    if (!analytics) {
      clearAnalyticsCookies();
      sessionStorage.removeItem('n3xus:source');
    }
  } catch {
    // Best effort.
  }
}

export function writeConsent(analytics: boolean): void {
  const c: Consent = { v: CONSENT_VERSION, analytics, at: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
    memoryChoice = null;
  } catch {
    // Storage blocked: keep the choice for this visit so it still takes effect.
    memoryChoice = c;
  }
  applyConsent(analytics);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: c }));
}

/** Let a footer link reopen the settings. */
export function openConsentPreferences(): void {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function onOpenPreferences(cb: () => void): () => void {
  window.addEventListener(OPEN_EVENT, cb);
  return () => window.removeEventListener(OPEN_EVENT, cb);
}

/** For useSyncExternalStore. */
export function subscribeConsent(cb: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, cb);
  // Another tab changing the choice.
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener('storage', cb);
  };
}

export const consentSnapshot = (): ConsentState => consentState();
export const consentServerSnapshot = (): ConsentState => 'loading';
