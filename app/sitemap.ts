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

    return {
      url: `${site.url}${route.path}`,
      lastModified: article ? new Date(article.published) : now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
  });
}
