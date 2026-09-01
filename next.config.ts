import type { NextConfig } from 'next';

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
