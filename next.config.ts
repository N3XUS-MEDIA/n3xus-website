import type { NextConfig } from 'next';
import { RETIRED_SLUGS } from './src/content/blog';

/**
 * Headers live here rather than in vercel.json.
 *
 * vercel.json's `headers` are applied by Vercel's edge, which means they are
 * absent under `next start` — so nothing about them could be verified locally.
 * Moving them into the app makes them testable with curl before deploy.
 *
 * The `rewrites` block from vercel.json is gone entirely: all eleven clean-URL
 * mappings (/about → /about.html and friends) are now real App Router routes.
 */

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Was not in vercel.json. Denies APIs the site never uses.
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // NOTE: X-XSS-Protection was in vercel.json and is deliberately dropped.
  // The header is retired — modern browsers ignore it, and its legacy
  // auditor introduced vulnerabilities of its own. Not a regression.
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return [
      /**
       * www → apex.
       *
       * Both hostnames were serving the site with a 200. The canonical tag on
       * every page already pointed at the apex, so Google would most likely
       * have consolidated them — but "most likely" is doing real work in that
       * sentence. A redirect is deterministic: it stops the same page existing
       * at two addresses, keeps links to the www form passing their value to
       * the apex, and halves what a crawler has to fetch to see one site.
       *
       * `has: host` is matched by Vercel's edge before the app runs, so this
       * costs nothing on normal apex traffic.
       */
      {
        source: '/:path*',
        has: [{ type: 'host' as const, value: 'www.n3xus.media' }],
        destination: 'https://n3xus.media/:path*',
        permanent: true,
      },

      /**
       * Slugs retired when the blog was rebuilt around buyer intent. Permanent
       * redirects rather than 404s — the mapping lives beside the articles in
       * src/content/blog/index.ts so it is maintained with the content.
       */
      ...Object.entries(RETIRED_SLUGS).map(([from, to]) => ({
        source: `/blog/${from}`,
        destination: `/blog/${to}`,
        permanent: true,
      })),
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Fingerprinted by filename; safe to pin for a year.
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      {
        // security.txt and ai-plugin.json are meant to be fetched cross-origin.
        source: '/.well-known/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;
