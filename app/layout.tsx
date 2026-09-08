import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { SiteHeader } from '@/ui/layout/SiteHeader';
import { SiteFooter } from '@/ui/layout/SiteFooter';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
import { Analytics, AnalyticsNoScript } from '@/ui/Analytics';
import { Aria } from '@/ui/aria/Aria';
import { site } from '@/content/copy';
import './globals.css';

/**
 * Self-hosted at build time by next/font. The old site pulled three families
 * (Syne, DM Sans, DM Mono) from the Google Fonts CDN, which meant a
 * render-blocking third-party request on every page load.
 *
 * Weights are pinned to what's actually used — an unset weight leaves the
 * browser synthesising a fake face from the nearest one it has.
 */
const heading = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

/**
 * Google Search Console, property https://n3xus.media/ owned by
 * deacon@n3xus.media. Issued 2026-09-08 by the HTML-tag method.
 */
const GOOGLE_VERIFICATION_TOKEN = 'KDzoMfakoGBct6ClPBBU1XZkMmJ6N9vE3TZpb50jozA';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'N3XUS — Business Management Consultancy | Strategy, Intelligence, Growth',
    template: '%s | N3XUS',
  },
  description: site.descriptor,
  openGraph: {
    type: 'website',
    siteName: site.name,
    url: site.url,
    images: ['/assets/og-image.png'],
  },
  twitter: { card: 'summary_large_image' },

  /**
   * Search Console / Webmaster Tools ownership.
   *
   * Driven by environment variables so proving ownership is a Vercel setting
   * plus a redeploy, never a code change — the person who has the Google
   * account is rarely the person who can ship a commit, and that gap is where
   * verification stalls for weeks.
   *
   * A DNS TXT record in Cloudflare is the better method where it is available:
   * it covers every subdomain and survives any redeploy. This is the fallback
   * for when DNS access is the thing that is missing.
   *
   * Bing is included because Copilot and several assistants draw on its index,
   * which matters more than usual for a firm selling AI visibility.
   */
  verification: {
    /**
     * Committed rather than left to an environment variable, deliberately.
     *
     * The comment above assumed whoever holds the Google account can also set
     * a Vercel variable. On 2026-09-08 that turned out to be false: the Vercel
     * project sits on another person's account, DNS sits at GoDaddy, and the
     * Search Console property that already existed belongs to a different
     * Google account — Workspace admin does not inherit it. The only lever
     * available to the person doing the work was a commit.
     *
     * So the token is the default and the variable overrides it. This is a
     * public token: it appears in the page source of every site that uses this
     * method, and it proves nothing except that whoever set it could change
     * the site. It is not a credential and does not belong in a secret store.
     *
     * Do not delete it after verification succeeds — Google re-checks, and a
     * property that silently unverifies stops reporting without an error.
     */
    google: process.env.GOOGLE_SITE_VERIFICATION ?? GOOGLE_VERIFICATION_TOKEN,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  // The favicon comes from app/icon.svg — same geometry as HexMark, drawn
  // rather than the 11KB of rasters it replaces. Next wires it up on its own.
  icons: { apple: '/assets/n3xus-icon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Must run before first paint — see src/lib/theme.ts. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <AnalyticsNoScript />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Aria />
        <Analytics />
      </body>
    </html>
  );
}
