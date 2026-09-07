/**
 * The blog, rebuilt around buyer search intent.
 *
 * The previous six articles were written for a marketing agency and organised
 * by topic. These are written to answer a question somebody actually typed,
 * grouped into clusters by pillar so the site demonstrates coverage of a
 * subject rather than mentioning it once.
 *
 * Four of the old articles are retired — their positioning no longer matches
 * the business. They are redirected rather than deleted; see next.config.ts.
 * Nothing had meaningful search history (the pre-rebuild site had no per-post
 * URLs at all), but a redirect costs nothing and a 404 costs a visitor.
 */

import type { Article, Pillar } from './types';
import { strategyArticles } from './strategy';
import { intelligenceArticles } from './intelligence';
import { growthArticles } from './growth';

export * from './types';

export const articles: Article[] = [
  ...strategyArticles,
  ...intelligenceArticles,
  ...growthArticles,
];

/** Newest first. */
export const articlesByDate: Article[] = [...articles].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export function findArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function articlesByPillar(pillar: Pillar): Article[] {
  return articlesByDate.filter((a) => a.pillar === pillar);
}

/**
 * Related reading.
 *
 * Explicit links first — an author naming the next piece beats any heuristic.
 * Same-pillar articles fill the remainder, which is what makes this a cluster
 * rather than a list: every article routes to its neighbours, so a reader (and
 * a crawler) arriving on any one of them finds the rest.
 */
export function relatedTo(slug: string, limit = 3): Article[] {
  const current = findArticle(slug);
  if (!current) return [];

  const explicit = (current.related ?? [])
    .map(findArticle)
    .filter((a): a is Article => Boolean(a) && a!.slug !== slug);

  const sameFamily = articlesByDate.filter(
    (a) => a.slug !== slug && a.pillar === current.pillar && !explicit.some((e) => e.slug === a.slug),
  );

  const rest = articlesByDate.filter(
    (a) =>
      a.slug !== slug &&
      !explicit.some((e) => e.slug === a.slug) &&
      !sameFamily.some((s) => s.slug === a.slug),
  );

  return [...explicit, ...sameFamily, ...rest].slice(0, limit);
}

/**
 * Slugs retired in the rebuild, mapped to their closest replacement.
 *
 * Consumed by next.config.ts to emit permanent redirects. Kept here beside the
 * articles so the mapping is maintained where the content is, not in a build
 * file somebody forgets exists.
 */
export const RETIRED_SLUGS: Record<string, string> = {
  // Marketing-agency framing; the closest current subject is the GEO piece.
  'llm-marketing-how-to-get-found-in-ai-assistants': 'get-recommended-by-ai-assistants',
  // Rewritten and absorbed into the after-hours piece, which covers the same
  // buying question without leading with the technology.
  'ai-chatbots-for-business': 'stop-losing-after-hours-enquiries',
  // Off-positioning: N3XUS is no longer selling agency selection.
  'choosing-a-digital-marketing-agency': 'what-a-business-diagnostic-involves',
  // Broadcast is a delivery capability now, not a subject the blog leads on.
  'television-marketing-broadcast-brand-building': 'seo-vs-geo-what-changed',
  'ai-consulting-strategy': 'what-to-fix-first-in-your-business',
  // Core3 is retired framing.
  'core3-framework': 'what-to-fix-first-in-your-business',
};
