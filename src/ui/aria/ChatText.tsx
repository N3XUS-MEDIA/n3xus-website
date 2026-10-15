import Link from 'next/link';
import { site } from '@/content/copy';

/**
 * A chat reply with its links made real.
 *
 * Replies are plain strings (the knowledge base, the contact copy and the
 * model all return text), so links are written as [label](url) and bare URLs
 * and email addresses are recognised too. Anything on our own domain becomes a
 * client-side <Link>, so following one doesn't close the chat or reload the
 * page; everything else opens in a new tab. Text is never injected as HTML.
 */
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"])|([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

const LINK_CLASS =
  'font-medium text-accent-ink underline underline-offset-4 hover:no-underline focus-visible:outline-accent-ink';

/** Our own origin(s), so absolute links to the site stay in-app. */
function internalPath(href: string): string | null {
  try {
    const u = new URL(href, site.url);
    const own = new URL(site.url);
    const hosts = new Set([own.host, `www.${own.host}`]);
    if (!hosts.has(u.host)) return null;
    return `${u.pathname}${u.search}${u.hash}` || '/';
  } catch {
    return null;
  }
}

function Anchor({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith('mailto:')) {
    return (
      <a href={href} className={LINK_CLASS}>
        {children}
      </a>
    );
  }
  const path = href.startsWith('/') ? href : internalPath(href);
  if (path) {
    return (
      <Link href={path} className={LINK_CLASS}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
      {children}
    </a>
  );
}

/** Readable text for a bare URL: no scheme, no www, no trailing slash. */
function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function ChatText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) nodes.push(text.slice(last, at));
    const [, label, mdUrl, bareUrl, email] = m;
    if (mdUrl) {
      nodes.push(
        <Anchor key={key++} href={mdUrl}>
          {label}
        </Anchor>,
      );
    } else if (bareUrl) {
      nodes.push(
        <Anchor key={key++} href={bareUrl}>
          {prettyUrl(bareUrl)}
        </Anchor>,
      );
    } else if (email) {
      nodes.push(
        <Anchor key={key++} href={`mailto:${email}`}>
          {email}
        </Anchor>,
      );
    }
    last = at + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

/** The same reply as plain text — link labels only — for screen-reader announcements. */
export function plainText(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1');
}
