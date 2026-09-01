import { describe, expect, it } from 'vitest';
import { ALL_MODULES } from '@/content/pricing';
import { formatPrice } from '@/lib/retainer';
import { buildSystemPrompt } from './systemPrompt';

describe('Aria system prompt', () => {
  const prompt = buildSystemPrompt();
  // Collapse the prompt's own line wrapping so assertions can match phrases
  // that span a newline.
  const flat = prompt.replace(/\s+/g, ' ');

  it('quotes every module at the price in the matrix, in both currencies', () => {
    // Use the same formatter the prompt uses, rather than reimplementing it —
    // en-ZA's default group separator is a space, the formatter emits commas.
    for (const m of ALL_MODULES) {
      expect(prompt, `${m.id} USD`).toContain(formatPrice(m.price.USD, 'USD'));
      expect(prompt, `${m.id} ZAR`).toContain(formatPrice(m.price.ZAR, 'ZAR'));
    }
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

  it('forbids inventing prices and totals', () => {
    expect(flat).toMatch(/never estimate, discount, round, or invent a price/i);
    expect(flat).toMatch(/never state a total you have calculated yourself/i);
  });

  it('carries the brand-separation rule', () => {
    expect(flat).toMatch(/does not own or operate Syrax, Fortitude or Lava Concepts/i);
  });

  it('forbids inventing statistics and case studies', () => {
    expect(flat).toMatch(/do not invent statistics/i);
  });
});
