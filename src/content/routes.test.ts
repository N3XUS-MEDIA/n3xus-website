import { describe, expect, it } from 'vitest';
import { allRoutes, blogRoutes, staticRoutes } from './routes';
import { articles, articlesByDate, findArticle, relatedTo } from './blog';

describe('routes', () => {
  it('has no duplicate paths', () => {
    const paths = allRoutes.map((r) => r.path);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('starts every path with a slash and never ends with one', () => {
    for (const r of allRoutes) {
      expect(r.path.startsWith('/'), r.path).toBe(true);
      if (r.path !== '/') expect(r.path.endsWith('/'), r.path).toBe(false);
    }
  });

  it('keeps priorities in range', () => {
    for (const r of allRoutes) {
      expect(r.priority, r.path).toBeGreaterThan(0);
      expect(r.priority, r.path).toBeLessThanOrEqual(1);
    }
  });

  /**
   * The whole reason routes are derived rather than hand-listed: the old
   * sitemap.xml omitted every blog post.
   */
  it('includes one route per article, automatically', () => {
    expect(blogRoutes).toHaveLength(articles.length);
    for (const a of articles) {
      expect(allRoutes.map((r) => r.path)).toContain(`/blog/${a.slug}`);
    }
  });

  it('covers the pages that exist in the app', () => {
    for (const path of [
      '/',
      '/about',
      '/contact',
      '/pricing',
      '/intelligence',
      '/services',
      '/services/strategy',
      '/services/website-os',
      '/services/ai',
      '/services/software',
      '/services/digital',
      '/services/brand',
      '/services/dstv-stream',
      '/blog',
      '/privacy',
      '/terms',
    ]) {
      expect(staticRoutes.map((r) => r.path), path).toContain(path);
    }
  });
});

describe('blog content', () => {
  it('has unique slugs', () => {
    const slugs = articles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('uses url-safe slugs', () => {
    for (const a of articles) expect(a.slug, a.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('gives every article a title, category, standfirst and body', () => {
    for (const a of articles) {
      expect(a.title.length, a.slug).toBeGreaterThan(0);
      expect(a.category.length, a.slug).toBeGreaterThan(0);
      expect(a.standfirst.length, a.slug).toBeGreaterThan(0);
      expect(a.blocks.length, a.slug).toBeGreaterThan(1);
    }
  });

  it('has a parseable ISO published date on every article', () => {
    for (const a of articles) {
      expect(a.published, a.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(new Date(a.published).getTime()), a.slug).toBe(false);
    }
  });

  it('sorts newest first', () => {
    for (let i = 1; i < articlesByDate.length; i++) {
      expect(
        articlesByDate[i - 1].published >= articlesByDate[i].published,
      ).toBe(true);
    }
  });

  it('finds an article by slug and misses cleanly', () => {
    expect(findArticle(articles[0].slug)?.title).toBe(articles[0].title);
    expect(findArticle('not-a-real-post')).toBeUndefined();
  });

  it('never suggests the article you are already reading', () => {
    for (const a of articles) {
      const related = relatedTo(a.slug);
      expect(related.map((r) => r.slug), a.slug).not.toContain(a.slug);
      expect(related.length, a.slug).toBeGreaterThan(0);
    }
  });

  /** Claims register C4 — these figures must not come back via the blog. */
  it('carries no contested chatbot pricing', () => {
    for (const a of articles) {
      const text = a.blocks.map((b) => b.text).join(' ');
      for (const stale of ['$1,160', '$2,370', '$500 once-off']) {
        expect(text, `${a.slug} contains ${stale}`).not.toContain(stale);
      }
    }
  });

  /** The sentence that had its subject stripped in the source HTML. */
  it('does not open an article mid-sentence', () => {
    for (const a of articles) {
      expect(a.standfirst, a.slug).not.toMatch(/^\s*(has|is|are|was|were)\b/);
    }
  });
});
