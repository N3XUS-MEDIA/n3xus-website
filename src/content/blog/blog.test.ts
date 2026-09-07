import { describe, expect, it } from 'vitest';
import {
  RETIRED_SLUGS,
  articles,
  articlesByDate,
  articlesByPillar,
  findArticle,
  relatedTo,
} from './index';
import type { Pillar } from './types';

const PILLARS: Pillar[] = ['strategy', 'intelligence', 'growth'];

describe('article integrity', () => {
  it('has unique, url-safe slugs', () => {
    const slugs = articles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s, s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('gives every article the fields the page and schema need', () => {
    for (const a of articles) {
      expect(a.title.length, a.slug).toBeGreaterThan(10);
      expect(a.standfirst.length, a.slug).toBeGreaterThan(60);
      expect(a.blocks.length, a.slug).toBeGreaterThan(5);
      expect(a.published, a.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.readingMinutes, a.slug).toBeGreaterThan(0);
    }
  });

  /**
   * The editorial discipline this rebuild exists for: if you cannot name the
   * question an article answers, it does not have a job.
   */
  it('states the question every article is written to answer', () => {
    for (const a of articles) {
      expect(a.keyphrase.trim().length, `${a.slug} has no keyphrase`).toBeGreaterThan(8);
    }
  });

  it('sorts newest first', () => {
    for (let i = 1; i < articlesByDate.length; i++) {
      expect(articlesByDate[i - 1].published >= articlesByDate[i].published).toBe(true);
    }
  });
});

describe('clusters', () => {
  it('covers all three pillars', () => {
    for (const pillar of PILLARS) {
      expect(articlesByPillar(pillar).length, `no articles for ${pillar}`).toBeGreaterThan(0);
    }
  });

  /**
   * A cluster is only a cluster if the articles route to each other — that is
   * what distinguishes it from a list, for a reader and for a crawler.
   */
  it('links every article to others', () => {
    for (const a of articles) {
      const related = relatedTo(a.slug);
      expect(related.length, a.slug).toBeGreaterThan(0);
      expect(related.map((r) => r.slug), a.slug).not.toContain(a.slug);
    }
  });

  it('resolves every explicit related slug', () => {
    for (const a of articles) {
      for (const slug of a.related ?? []) {
        expect(findArticle(slug), `${a.slug} points at missing "${slug}"`).toBeDefined();
      }
    }
  });

  it('covers more than one buyer stage', () => {
    expect(new Set(articles.map((a) => a.intent)).size).toBeGreaterThan(1);
  });
});

describe('retired slugs', () => {
  it('redirects every retired slug to an article that exists', () => {
    for (const [from, to] of Object.entries(RETIRED_SLUGS)) {
      expect(findArticle(to), `"${from}" redirects to missing "${to}"`).toBeDefined();
    }
  });

  it('does not redirect a slug that is still live', () => {
    for (const from of Object.keys(RETIRED_SLUGS)) {
      expect(findArticle(from), `"${from}" is both live and redirected`).toBeUndefined();
    }
  });
});

describe('claims discipline still applies', () => {
  const corpus = articles
    .flatMap((a) => [a.title, a.standfirst, ...a.blocks.map((b) => b.text), ...(a.faqs ?? []).flatMap((f) => [f.q, f.a])])
    .join(' ');

  it('carries no retired pricing', () => {
    for (const stale of ['$950', '$2,400', '$5,500', '$1,160', '$2,370', '$135/mo']) {
      expect(corpus, `blog contains ${stale}`).not.toContain(stale);
    }
  });

  it('carries no unconfirmed claims', () => {
    for (const claim of ['528', 'zero media markup', '45-minute']) {
      expect(corpus.toLowerCase(), `blog contains "${claim}"`).not.toContain(claim.toLowerCase());
    }
  });

  /**
   * The old blog invented statistics to sound authoritative. Any percentage or
   * "studies show" phrasing needs a source, and rather than police that by
   * review, the corpus simply does not contain unsourced ones.
   */
  it('makes no unsourced statistical claims', () => {
    for (const pattern of [/\b\d{1,3}%\s+of\s+(businesses|companies|buyers|customers)/i, /studies show/i, /research shows/i]) {
      expect(corpus, `unsourced claim matching ${pattern}`).not.toMatch(pattern);
    }
  });

  /**
   * Only FIRST-PERSON promises. An earlier version of this test flagged
   * "anyone offering guaranteed placement is selling something they cannot
   * control" — copy that warns readers off guarantees, which is the honesty
   * the test exists to protect rather than a violation of it. Matching the
   * word "guarantee" anywhere punished the site for saying the right thing.
   */
  it('makes no first-person guarantees about rankings or AI placement', () => {
    for (const pattern of [
      /\bwe\s+(can\s+)?guarantee\b/i,
      /\bwe(’|')ll\s+guarantee\b/i,
      /\bguaranteed\s+(top|first|#1|page one)\b/i,
      /\bwe\s+(can\s+)?promise\s+(you\s+)?(a\s+)?(top|first|#1|ranking)/i,
    ]) {
      expect(corpus, `first-person guarantee matching ${pattern}`).not.toMatch(pattern);
    }
  });

  /** And the copy should actively warn against them, since the field invites it. */
  it('warns readers that AI placement cannot be guaranteed', () => {
    expect(corpus.toLowerCase()).toContain('cannot control');
  });
});

describe('search intent coverage', () => {
  /**
   * The questions this rebuild was commissioned to answer. Each should have an
   * article whose keyphrase is recognisably about it — a check that the set
   * still covers the brief after future edits.
   */
  const briefs = [
    ['what to fix first', /fix first/i],
    ['outgrown systems', /outgrown/i],
    ['diagnostic cost and scope', /diagnostic/i],
    ['website not generating leads', /not generating leads|website not/i],
    ['after-hours enquiries', /after hours/i],
    ['build vs buy', /custom software vs off the shelf/i],
    ['AI assistant recommendation', /recommended by chatgpt/i],
    ['SEO vs GEO', /seo vs geo/i],
    ['WhatsApp automation', /whatsapp/i],
  ] as const;

  for (const [label, pattern] of briefs) {
    it(`covers: ${label}`, () => {
      expect(articles.some((a) => pattern.test(a.keyphrase)), `no article targets ${label}`).toBe(
        true,
      );
    });
  }

  it('includes at least one South-Africa-specific piece', () => {
    expect(articles.some((a) => a.market === 'za')).toBe(true);
  });
});

describe('assistant-answer readiness', () => {
  /**
   * Question-and-answer pairs that are both visible and structured are the
   * shape assistants lift from. For a firm selling GEO, its own blog carrying
   * them is not optional.
   */
  it('gives most articles FAQ pairs', () => {
    const withFaqs = articles.filter((a) => (a.faqs?.length ?? 0) > 0).length;
    expect(withFaqs / articles.length).toBeGreaterThanOrEqual(0.75);
  });

  it('writes FAQ answers long enough to be useful and short enough to be lifted', () => {
    for (const a of articles) {
      for (const f of a.faqs ?? []) {
        expect(f.q.trim().endsWith('?'), `${a.slug}: "${f.q}"`).toBe(true);
        expect(f.a.length, `${a.slug}: answer to "${f.q}"`).toBeGreaterThan(60);
        expect(f.a.length, `${a.slug}: answer to "${f.q}" is too long to lift`).toBeLessThan(600);
      }
    }
  });
});
