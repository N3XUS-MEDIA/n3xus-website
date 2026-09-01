import { articles } from './blog';

/**
 * Every indexable route, in one place.
 *
 * The old sitemap.xml was hand-kept, listed nine URLs with an identical
 * lastmod of 2026-05-12, and omitted the blog entirely — which is the failure
 * mode a hand-maintained list always eventually reaches. Deriving it means the
 * six new article permalinks cannot be forgotten.
 */

export interface RouteDef {
  path: string;
  /** Relative to other pages on this site, not an absolute quality score. */
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export const staticRoutes: RouteDef[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/strategy', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/website-os', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services/ai', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/software', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/digital', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/brand', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/services/dstv-stream', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/intelligence', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
];

export const blogRoutes: RouteDef[] = articles.map((a) => ({
  path: `/blog/${a.slug}`,
  priority: 0.6,
  changeFrequency: 'yearly' as const,
}));

export const allRoutes: RouteDef[] = [...staticRoutes, ...blogRoutes];
