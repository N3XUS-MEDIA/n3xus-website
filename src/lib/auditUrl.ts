/**
 * The website-audit form's address check.
 *
 * A copy of the rules HQ enforces (n3xus/apps/hq/src/lib/audit/url.ts), kept
 * here so a visitor who types "localhost" or an IP address is told so at once
 * instead of watching a progress bar for a report that will never come. HQ
 * still runs its own check, and re-checks every redirect — this one is about
 * the visitor's experience, not security, so it is allowed to be the
 * friendlier of the two.
 *
 * Returns rather than throws, because both callers — the form and the API
 * route — want a message to show, not an exception to catch.
 */

export type AuditUrlCheck = { ok: true; url: string } | { ok: false; message: string };

const BLOCKED_HOSTS = new Set(['localhost', '0.0.0.0', 'metadata.google.internal']);
const BLOCKED_SUFFIXES = [
  '.localhost',
  '.local',
  '.internal',
  '.intranet',
  '.lan',
  '.home',
  '.corp',
  '.test',
  '.invalid',
  '.example',
];
const IPV4 = /^\d{1,3}(\.\d{1,3}){3}$/;

export function checkAuditUrl(input: string): AuditUrlCheck {
  const raw = input.trim();
  if (!raw) return { ok: false, message: 'Enter your website address.' };
  if (raw.length > 2048) return { ok: false, message: 'That address is too long.' };

  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;

  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return { ok: false, message: 'That doesn’t look like a web address.' };
  }

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return { ok: false, message: 'Only http and https websites can be audited.' };
  }
  if (url.username || url.password) {
    return { ok: false, message: 'Remove any username or password from the address.' };
  }
  if (url.port && url.port !== '80' && url.port !== '443') {
    return { ok: false, message: 'Only websites on the standard ports can be audited.' };
  }

  const host = url.hostname.toLowerCase().replace(/\.$/, '');
  if (host.startsWith('[') || host.includes(':') || IPV4.test(host)) {
    return { ok: false, message: 'Enter the website’s name rather than an IP address.' };
  }
  if (!host.includes('.') || BLOCKED_HOSTS.has(host) || BLOCKED_SUFFIXES.some((s) => host.endsWith(s))) {
    return { ok: false, message: 'That doesn’t look like a public website.' };
  }

  url.hash = '';
  url.hostname = host;
  return { ok: true, url: url.href };
}

/** "https://www.acme.co.za/" → "acme.co.za", for headings. */
export function displayHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
