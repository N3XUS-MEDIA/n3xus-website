import { describe, expect, it } from 'vitest';
import {
  ALL_MODULES,
  BUNDLE_PILLAR_IDS,
  PILLARS,
  REQUIRED_MODULE_IDS,
} from '@/content/pricing';
import { buildQuote, formatMonthly, normaliseSelection, renderProposalSummary } from './retainer';

describe('pricing matrix integrity', () => {
  it('has unique module ids', () => {
    const ids = ALL_MODULES.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('prices every module in both currencies', () => {
    for (const m of ALL_MODULES) {
      expect(m.price.USD, `${m.id} USD`).toBeGreaterThan(0);
      expect(m.price.ZAR, `${m.id} ZAR`).toBeGreaterThan(0);
    }
  });

  it('has exactly one mandatory module', () => {
    expect(REQUIRED_MODULE_IDS).toEqual(['base-os']);
  });

  it('counts four pillars toward the bundle discount', () => {
    expect(BUNDLE_PILLAR_IDS).toEqual(['visibility', 'social', 'agents', 'performance']);
  });

  it('keeps the ZAR column near a 20% discount at a plausible rate', () => {
    // Guards against a fat-fingered zero. ZAR is hand-rounded, so this is a
    // sanity band, not an exact conversion.
    for (const m of ALL_MODULES) {
      const impliedRate = m.price.ZAR / (m.price.USD * 0.8);
      expect(impliedRate, `${m.id} implied ZAR/USD rate`).toBeGreaterThan(17);
      expect(impliedRate, `${m.id} implied ZAR/USD rate`).toBeLessThan(19);
    }
  });
});

describe('normaliseSelection', () => {
  it('always includes the mandatory base OS', () => {
    expect(normaliseSelection([])).toEqual(['base-os']);
    expect(normaliseSelection(['geo'])).toEqual(['base-os', 'geo']);
  });

  it('returns modules in matrix order, not click order', () => {
    expect(normaliseSelection(['paid-ads', 'geo', 'web-bot'])).toEqual([
      'base-os',
      'geo',
      'web-bot',
      'paid-ads',
    ]);
  });

  it('does not duplicate the base OS when explicitly selected', () => {
    expect(normaliseSelection(['base-os', 'base-os'])).toEqual(['base-os']);
  });
});

describe('buildQuote', () => {
  it('quotes the base OS alone', () => {
    const q = buildQuote([], 'USD');
    expect(q.subtotal).toBe(450);
    expect(q.bundleQualifies).toBe(false);
    expect(q.total).toBe(450);
  });

  it('ignores unknown module ids rather than throwing', () => {
    const q = buildQuote(['not-a-real-module'], 'USD');
    expect(q.lines).toHaveLength(1);
    expect(q.total).toBe(450);
  });

  /**
   * The worked example printed on page 2 of the configurator PDF
   * (Ref: N3X-2026-8842). Both of its stated figures are wrong; this test
   * pins the correct ones so the error cannot creep back in.
   */
  describe("the configurator PDF's worked example", () => {
    const pdfSelection = ['base-os', 'seo-technical', 'geo', 'social-growth', 'web-bot'];

    it('sums to $1,750, not the $1,500 printed', () => {
      expect(buildQuote(pdfSelection, 'USD').subtotal).toBe(1750);
    });

    it('sums to R25,200, not the R22,200 printed', () => {
      expect(buildQuote(pdfSelection, 'ZAR').subtotal).toBe(25200);
    });

    it('does NOT qualify for the bundle discount — nothing from Performance', () => {
      const q = buildQuote(pdfSelection, 'USD');
      expect(q.bundleQualifies).toBe(false);
      expect(q.missingPillarIds).toEqual(['performance']);
      expect(q.discount).toBe(0);
      expect(q.total).toBe(1750);
    });
  });

  describe('bundle discount', () => {
    // One module from each of the four counting pillars.
    const qualifying = ['geo', 'social-light', 'web-bot', 'paid-ads'];

    it('applies 10% once all four pillars are touched', () => {
      const q = buildQuote(qualifying, 'USD');
      // 450 + 350 + 300 + 200 + 500
      expect(q.subtotal).toBe(1800);
      expect(q.bundleQualifies).toBe(true);
      expect(q.missingPillarIds).toEqual([]);
      expect(q.discount).toBe(180);
      expect(q.total).toBe(1620);
    });

    it('reports exactly which pillars are still missing', () => {
      const q = buildQuote(['geo'], 'USD');
      expect(q.missingPillarIds).toEqual(['social', 'agents', 'performance']);
    });

    it('drops the discount again when a pillar is deselected', () => {
      const withAll = buildQuote(qualifying, 'USD');
      const withoutAds = buildQuote(
        qualifying.filter((id) => id !== 'paid-ads'),
        'USD',
      );
      expect(withAll.discount).toBeGreaterThan(0);
      expect(withoutAds.discount).toBe(0);
    });

    it('never rounds to a fractional currency unit', () => {
      for (const currency of ['USD', 'ZAR'] as const) {
        const q = buildQuote(ALL_MODULES.map((m) => m.id), currency);
        expect(Number.isInteger(q.discount)).toBe(true);
        expect(Number.isInteger(q.total)).toBe(true);
      }
    });

    it('the everything-selected quote is internally consistent', () => {
      const q = buildQuote(ALL_MODULES.map((m) => m.id), 'ZAR');
      expect(q.lines).toHaveLength(ALL_MODULES.length);
      expect(q.subtotal).toBe(ALL_MODULES.reduce((s, m) => s + m.price.ZAR, 0));
      expect(q.total).toBe(q.subtotal - q.discount);
    });
  });
});

describe('formatting', () => {
  it('formats both currencies with thousands separators', () => {
    expect(formatMonthly(1750, 'USD')).toBe('$1,750 / mo');
    expect(formatMonthly(25200, 'ZAR')).toBe('R25,200 / mo');
  });
});

describe('renderProposalSummary', () => {
  const quote = buildQuote(['geo', 'social-light', 'web-bot', 'paid-ads'], 'USD');

  it('marks the base OS as core and lists modules in matrix order', () => {
    const out = renderProposalSummary(quote, 'Acme Ltd');
    expect(out).toContain('CLIENT: Acme Ltd');
    expect(out).toContain('Base Website OS & Admin Backend [$450 / mo] (Core)');
    expect(out.indexOf('Generative Engine')).toBeLessThan(out.indexOf('Paid Ads'));
  });

  it('shows the discount line only when it applies', () => {
    expect(renderProposalSummary(quote)).toContain('BUNDLE DISCOUNT');
    expect(renderProposalSummary(buildQuote([], 'USD'))).not.toContain('BUNDLE DISCOUNT');
  });

  it('falls back to a placeholder when no client name is given', () => {
    expect(renderProposalSummary(quote, '   ')).toContain('[Client Name / Company]');
  });
});

describe('pillar structure', () => {
  it('gives every pillar at least one module', () => {
    for (const p of PILLARS) expect(p.modules.length, p.id).toBeGreaterThan(0);
  });
});
