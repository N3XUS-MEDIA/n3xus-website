import { describe, expect, it } from 'vitest';
import { ALL_MODULES } from '@/content/retainerModules';
import { buildSystemPrompt } from './systemPrompt';

describe('Aria system prompt', () => {
  const prompt = buildSystemPrompt();
  // Collapse the prompt's own line wrapping so assertions can match phrases
  // that span a newline.
  const flat = prompt.replace(/\s+/g, ' ');

  /**
   * Pricing was withdrawn from the site on 2026-09-18. The assistant is the
   * easiest place for a figure to leak back out, so the prompt must not carry
   * one in any currency.
   */
  it('carries no price in any currency', () => {
    expect(prompt).not.toMatch(/[$£€R]\s?\d/);
    expect(prompt).not.toMatch(/\d+\s?%\s*(off|discount)/i);
  });

  it('names every module', () => {
    for (const m of ALL_MODULES) {
      expect(prompt, m.id).toContain(m.name);
    }
  });

  /**
   * The figures the old client-side prompt carried. They contradicted the
   * pricing page even then; none of them should survive anywhere.
   */
  it('does not carry the retired retainer figures', () => {
    for (const stale of ['$1,025', '$2,025', 'Launch $500', 'Growth $1,000', 'Dominate $2,000']) {
      expect(prompt, stale).not.toContain(stale);
    }
  });

  it('tells the assistant not to state, estimate or hint at prices', () => {
    expect(flat).toMatch(/does not publish prices/i);
    expect(flat).toMatch(/never state, estimate, compare or hint at a price/i);
    expect(flat).toMatch(/even if the person insists/i);
  });

  it('carries the brand-separation rule', () => {
    expect(flat).toMatch(/does not own or operate Syrax, Fortitude or Lava Concepts/i);
  });

  it('forbids inventing statistics and case studies', () => {
    expect(flat).toMatch(/do not invent statistics/i);
  });
});
