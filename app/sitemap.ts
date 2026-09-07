import type { MetadataRoute } from 'next';
import { allRoutes } from '@/content/routes';
import { findArticle } from '@/content/blog';
import { site } from '@/content/copy';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return allRoutes.map((route) => {
    // Articles carry their own publication date; everything else uses build
    // time, which is at least honest about when the content last shipped.
    const slug = route.path.startsWith('/blog/') ? route.path.slice('/blog/'.length) : null;
    const article = slug ? findArticle(slug) : undefined;

    /**
     * The root is emitted without a trailing slash so it matches the canonical
     * Next generates from `alternates.canonical`. The two are equivalent for a
     * bare domain, but a sitemap URL that disagrees with the page's own
     * canonical is a Search Console warning, and warnings train people to stop
     * reading the report.
     */
    const url = route.path === '/' ? site.url : `${site.url}${route.path}`;

    return {
      url,
      lastModified: article ? new Date(article.published) : now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
  });
}
