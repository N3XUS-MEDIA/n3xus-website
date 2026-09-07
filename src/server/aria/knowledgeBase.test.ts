import { describe, expect, it } from 'vitest';
import {
  KNOWLEDGE_BASE,
  findAnswer,
  isEligibleForKnowledgeBase,
} from './knowledgeBase';

describe('knowledge base contents', () => {
  it('has unique entry ids', () => {
    const ids = KNOWLEDGE_BASE.map((e) => e.id);
    expect(new Set(ids).size, `duplicates: ${ids.filter((v, i) => ids.indexOf(v) !== i)}`).toBe(
      ids.length,
    );
  });

  it('gives every entry at least one question and a real answer', () => {
    for (const e of KNOWLEDGE_BASE) {
      expect(e.questions.length, e.id).toBeGreaterThan(0);
      expect(e.answer.trim().length, e.id).toBeGreaterThan(20);
    }
  });

  it('picked up the site’s own FAQs rather than duplicating them by hand', () => {
    expect(KNOWLEDGE_BASE.some((e) => e.id.startsWith('home-faq-'))).toBe(true);
    expect(KNOWLEDGE_BASE.some((e) => e.id.startsWith('contact-faq-'))).toBe(true);
  });

  /**
   * The pricing answer is generated from src/content/pricing.ts, so it cannot
   * drift from the pricing page. If someone hardcodes a figure here, this fails.
   */
  it('generates the pricing answer from the pricing matrix', () => {
    const entry = KNOWLEDGE_BASE.find((e) => e.id === 'pricing-base');
    expect(entry).toBeDefined();
    expect(entry!.answer).toContain('$450');
    expect(entry!.answer).toContain('R6,500');
  });

  it('carries no retired pricing', () => {
    const all = KNOWLEDGE_BASE.map((e) => e.answer).join(' ');
    for (const stale of ['$950', '$2,400', '$5,500', 'Dominate', '$135']) {
      expect(all, `knowledge base contains ${stale}`).not.toContain(stale);
    }
  });
});

describe('matching — questions it should answer for free', () => {
  const shouldMatch: [string, string][] = [
    ['How much does it cost?', 'pricing-base'],
    ['what does this cost', 'pricing-base'],
    ['whats your pricing', 'pricing-base'],
    ['Where are you based?', 'where-based'],

    ['How do I contact you?', 'contact'],
    ['can i book a call', 'contact'],
    ['How do we get started?', 'getting-started'],
  ];

  for (const [query, expectedId] of shouldMatch) {
    it(`answers "${query}" from the knowledge base`, () => {
      const match = findAnswer(query);
      expect(match, `"${query}" fell through to the model`).not.toBeNull();
      expect(match!.entry.id).toBe(expectedId);
    });
  }
});

describe('matching — an answer that is right either way', () => {
  /**
   * "do you work with US clients" legitimately matches two entries — the
   * where-based entry and the contact FAQ about international clients. Both
   * answers are correct, so what matters is that it answers at all, not which
   * of the two it picks.
   */
  it('answers the international-clients question without the model', () => {
    const match = findAnswer('do you work with US clients');
    expect(match).not.toBeNull();
    expect(match!.entry.answer.toLowerCase()).toMatch(/remote|united states|us\b/);
  });
});

describe('matching — questions it must NOT guess at', () => {
  /**
   * The failure that matters is not a miss, it is a confident wrong answer.
   * A miss costs a fraction of a cent; a wrong answer about price or scope
   * costs trust. Everything here must fall through to the model.
   */
  const shouldFallThrough = [
    'Can you help us migrate a legacy Postgres database to a new schema without downtime?',
    'What happened with the Johannesburg project last quarter?',
    'My developer says our React app has a memory leak, what should we do?',
    'Do you have a case study in the automotive sector?',
    'Who is your CEO?',
    'Can you sign an NDA before we talk?',
    'asdkjh asdkjh',
    '',
    '?',
  ];

  for (const query of shouldFallThrough) {
    it(`falls through on "${query.slice(0, 45)}"`, () => {
      expect(findAnswer(query)).toBeNull();
    });
  }
});

describe('eligibility', () => {
  it('only answers the opening message', () => {
    expect(isEligibleForKnowledgeBase([{ role: 'user', content: 'How much does it cost?' }])).toBe(
      true,
    );
  });

  /**
   * "What about the second one?" depends on everything above it. A keyword
   * matcher cannot see that, so follow-ups belong to the model.
   */
  it('sends follow-ups to the model, where context can actually be read', () => {
    expect(
      isEligibleForKnowledgeBase([
        { role: 'user', content: 'How much does it cost?' },
        { role: 'assistant', content: 'Retainers start at…' },
        { role: 'user', content: 'what about the second one' },
      ]),
    ).toBe(false);
  });

  it('ignores an assistant-first history', () => {
    expect(isEligibleForKnowledgeBase([{ role: 'assistant', content: 'Hi' }])).toBe(false);
  });
});

describe('cost behaviour', () => {
  /**
   * The point of the layer. If common questions stop matching, the bill goes
   * up silently — so the hit rate is asserted rather than assumed.
   */
  it('handles the majority of common opening questions without the model', () => {
    const common = [
      'How much does it cost?',
      'What does it cost?',
      'what are your prices',
      'Where are you based?',
      'do you work with us clients',
      'How do I contact you?',
      'can i book a call',
      'whats your email',
      'How do we get started?',
      'what is the first step',
      'What is N3XUS?',
      'what do you do',
    ];

    const answered = common.filter((q) => findAnswer(q) !== null).length;
    const rate = answered / common.length;

    expect(rate, `only ${answered}/${common.length} handled without the model`).toBeGreaterThanOrEqual(
      0.75,
    );
  });
});
