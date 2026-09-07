/**
 * The blog's content model.
 *
 * ── Why this is shaped the way it is ────────────────────────────────────────
 * The previous six articles were written for a marketing agency and organised
 * by topic. Neither is useful now: the positioning changed, and topic
 * organisation does nothing for search. What ranks is answering a question
 * somebody actually typed, and what converts is answering it at the stage they
 * are at.
 *
 * So every article declares three things beyond its content:
 *
 *   pillar   Which discipline it belongs to, so articles cluster. Search
 *            engines reward a site that demonstrably covers a subject rather
 *            than one that mentions it once.
 *   intent   Where the reader is. Somebody who does not yet know they have a
 *            problem needs a different piece from somebody comparing quotes,
 *            and writing one article for both serves neither.
 *   market   Where it applies. Most pieces are market-neutral; a few are
 *            genuinely South-Africa-specific and say so rather than pretending
 *            to be universal.
 *
 * `keyphrase` is the query the piece is written to answer. It exists for
 * editorial discipline — if you cannot name the question, the article does not
 * have a job — not to be repeated into the copy.
 */

export type Pillar = 'strategy' | 'intelligence' | 'growth';

/**
 * Buyer stage.
 *
 * problem  — does not yet know what to call it. "Why are we always behind?"
 * solution — knows the shape of the fix, comparing approaches.
 * decision — choosing a supplier, wants scope, price and risk.
 */
export type Intent = 'problem' | 'solution' | 'decision';

export type Market = 'both' | 'za' | 'us';

export interface ArticleBlock {
  kind: 'p' | 'h2' | 'h3' | 'li';
  text: string;
}

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface Article {
  slug: string;
  title: string;
  /** Human-facing label. Distinct from `pillar`, which is structural. */
  category: string;
  pillar: Pillar;
  intent: Intent;
  market: Market;
  /** The question this piece is written to answer. Editorial, not for copy. */
  keyphrase: string;
  /** ISO date. */
  published: string;
  displayDate: string;
  readingMinutes: number;
  /** Opening paragraph — reused as excerpt and meta description. */
  standfirst: string;
  blocks: ArticleBlock[];
  /**
   * Article-level FAQs, rendered on the page and emitted as FAQPage schema.
   *
   * This is the highest-leverage part for an assistant-answer strategy: a
   * question-and-answer pair that is both visible and structured is the shape
   * ChatGPT, Gemini and Google's own summaries lift from. Worth writing even
   * when the body already covers the ground.
   */
  faqs?: ArticleFaq[];
  /** Explicit cluster links. Empty means "same pillar, most recent". */
  related?: string[];
}

export const PILLAR_LABEL: Record<Pillar, string> = {
  strategy: 'Strategy',
  intelligence: 'Intelligence',
  growth: 'Growth',
};

export const INTENT_LABEL: Record<Intent, string> = {
  problem: 'Working out what’s wrong',
  solution: 'Comparing approaches',
  decision: 'Choosing a partner',
};
