import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { SiteHeader } from '@/ui/layout/SiteHeader';
import { SiteFooter } from '@/ui/layout/SiteFooter';
import { THEME_INIT_SCRIPT } from '@/lib/theme';
import { Analytics, AnalyticsNoScript } from '@/ui/Analytics';
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'N3XUS Media — Automated growth and AI infrastructure',
    template: '%s | N3XUS Media',
  },
  description:
    'N3XUS Media builds the website, backend and AI systems a business runs on — then the demand and brand that feed it.',
  openGraph: {
    type: 'website',
    siteName: site.name,
    url: site.url,
    images: ['/assets/og-image.png'],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/assets/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon-64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: '/assets/n3xus-icon.png',
  },
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
        <Analytics />
      </body>
    </html>
  );
}
