import { describe, expect, it } from 'vitest';
import { globSync, readFileSync } from 'node:fs';
import {
  CONSENT_KEY,
  CONSENT_MAX_AGE_MS,
  CONSENT_VERSION,
  analyticsAllowed,
  analyticsCookieNames,
  parseConsent,
} from './consent';
import { privacySections } from '@/content/privacy';

const NOW = 1_800_000_000_000;
const stored = (o: object) => JSON.stringify(o);

describe('parseConsent', () => {
  it('reads a valid choice', () => {
    expect(parseConsent(stored({ v: CONSENT_VERSION, analytics: true, at: NOW - 1000 }), NOW)).toEqual({
      v: CONSENT_VERSION,
      analytics: true,
      at: NOW - 1000,
    });
    expect(parseConsent(stored({ v: CONSENT_VERSION, analytics: false, at: NOW }), NOW)?.analytics).toBe(false);
  });

  it('treats nothing, junk and tampering as no choice (so we ask again, never assume yes)', () => {
    const bad = [
      null,
      '',
      'granted',
      '{',
      stored({}),
      stored({ v: CONSENT_VERSION, analytics: 'yes', at: NOW }),
      stored({ v: CONSENT_VERSION, analytics: true }),
    ];
    for (const raw of bad) expect(parseConsent(raw, NOW), String(raw)).toBeNull();
  });

  it('asks again after 12 months', () => {
    const old = stored({ v: CONSENT_VERSION, analytics: true, at: NOW - CONSENT_MAX_AGE_MS - 1 });
    expect(parseConsent(old, NOW)).toBeNull();
    const fresh = stored({ v: CONSENT_VERSION, analytics: true, at: NOW - CONSENT_MAX_AGE_MS + 1000 });
    expect(parseConsent(fresh, NOW)).not.toBeNull();
  });

  it('asks again when the consent version changes, so a new category never inherits a yes', () => {
    expect(parseConsent(stored({ v: CONSENT_VERSION + 1, analytics: true, at: NOW }), NOW)).toBeNull();
    expect(parseConsent(stored({ v: CONSENT_VERSION - 1, analytics: true, at: NOW }), NOW)).toBeNull();
  });

  it('rejects a timestamp from the future', () => {
    expect(parseConsent(stored({ v: CONSENT_VERSION, analytics: true, at: NOW + 3_600_000 }), NOW)).toBeNull();
  });
});

describe('analytics gate', () => {
  it('only an explicit grant allows analytics', () => {
    expect(analyticsAllowed('granted')).toBe(true);
    for (const s of ['loading', 'unset', 'denied'] as const) expect(analyticsAllowed(s), s).toBe(false);
  });
});

describe('analytics cookie clean-up', () => {
  it('finds the Google cookies and leaves everything else alone', () => {
    const header = '_ga=GA1.1.1; _ga_G-223R7S2381=GS1; _gid=x; session=abc; n3xus-theme=dark; _gcl_au=1';
    expect(analyticsCookieNames(header)).toEqual(['_ga', '_ga_G-223R7S2381', '_gid', '_gcl_au']);
    expect(analyticsCookieNames('')).toEqual([]);
  });
});

describe('the site discloses everything it stores', () => {
  const policy = privacySections.flatMap((s) => [s.heading, ...s.blocks.map((b) => b.text)]).join('\n');

  it('has a cookies section the banner can link to', () => {
    expect(privacySections.find((s) => s.id === 'cookies')).toBeDefined();
  });

  /**
   * Every key the code writes to localStorage or sessionStorage must be named in
   * the policy. This stops the policy drifting from the site again: the old one
   * described a Meta Pixel that was never installed and missed storage that was.
   */
  it('names every localStorage / sessionStorage key the code writes', () => {
    const files = globSync('{src,app}/**/*.{ts,tsx}').filter((f) => !/\.test\./.test(f));
    const keys = new Set<string>();
    for (const f of files) {
      const text = readFileSync(f, 'utf-8');
      for (const m of text.matchAll(/(?:localStorage|sessionStorage)\.setItem\(\s*([A-Za-z_]+|'[^']+')/g)) {
        keys.add(m[1]!);
      }
    }
    const consts: Record<string, string> = {
      CONSENT_KEY,
      THEME_STORAGE_KEY: 'n3xus-theme',
      KEY: 'n3xus:source',
      SEEN_KEY: 'n3xus:intro-seen',
    };
    const resolved = [...keys].map((k) => (k.startsWith("'") ? k.slice(1, -1) : (consts[k] ?? `UNRESOLVED(${k})`)));
    expect(resolved.filter((k) => k.startsWith('UNRESOLVED')), 'a storage key this test cannot resolve').toEqual([]);
    // The intro animation is on no live page (only /brand-preview), so it is not a live key.
    for (const k of resolved.filter((k) => k !== 'n3xus:intro-seen')) {
      expect(policy, `the privacy policy does not name the storage key "${k}"`).toContain(k);
    }
  });

  it('names the Google cookies and says they depend on consent', () => {
    expect(policy).toContain('_ga');
    expect(policy).toMatch(/only if you (accept|consent)/i);
  });

  it('says nothing about advertising pixels it does not run', () => {
    expect(policy).not.toMatch(/Marketing cookies —|Google \(Analytics, Ads\)|Meta \(advertising\)|our booking platform/);
    expect(policy).toMatch(/do not use advertising or marketing cookies/i);
  });

  it('names the providers that actually receive enquiries', () => {
    for (const p of ['Resend', 'Formspree', 'Vercel']) expect(policy, p).toContain(p);
  });

  it('mentions the chat assistant', () => {
    expect(policy.toLowerCase()).toContain('assistant');
  });
});

describe('no third-party tracking loads outside the consent gate', () => {
  /**
   * The Google tag is a client component that returns null unless analytics is
   * allowed, and nothing else in the app may load a tracker. A new external
   * script, pixel or iframe fails this test until it is deliberately gated.
   */
  it('keeps every external script inside <Analytics>, behind analyticsAllowed()', () => {
    const source = readFileSync('src/ui/Analytics.tsx', 'utf-8');
    // Comments explain what was removed (the <noscript> iframe); only code counts.
    const analytics = source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
    const gate = 'if (!analyticsAllowed(state)) return null';
    const gateAt = analytics.indexOf(gate);
    expect(gateAt).toBeGreaterThan(-1);
    expect(analytics.indexOf('<Script')).toBeGreaterThan(gateAt);
    expect(analytics).not.toMatch(/<iframe|<noscript/);
  });

  it('loads no other tracker anywhere in the app', () => {
    const files = globSync('{src,app}/**/*.{ts,tsx}').filter((f) => !/\.test\.|Analytics\.tsx$|consent\.ts$/.test(f));
    const TRACKERS =
      /googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|fbq\(|snap\.licdn\.com|static\.hotjar\.com|clarity\.ms|analytics\.tiktok\.com|doubleclick\.net/;
    for (const f of files) {
      const text = readFileSync(f, 'utf-8')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/(^|[^:])\/\/.*$/gm, '$1');
      expect(text, `${f} loads a tracker outside the consent gate`).not.toMatch(TRACKERS);
    }
  });
});
