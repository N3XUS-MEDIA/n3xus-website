import { describe, expect, it } from 'vitest';
import { LEAK_DEFAULTS, calculateLeak, formatMoney } from './leakCalc';

describe('leak calculator', () => {
  it('reproduces the figures the old page showed at its defaults', () => {
    const r = calculateLeak(LEAK_DEFAULTS);
    // 10 hrs × 52 weeks × $25
    expect(r.adminCostPerYear).toBe(13_000);
    // 40/mo × 12 × 30%
    expect(r.coldEnquiriesPerYear).toBe(144);
    // 144 × 20% close rate × $2,500
    expect(r.coldEnquiryValuePerYear).toBe(72_000);
    expect(r.totalPerYear).toBe(85_000);
  });

  it('is pure arithmetic on the inputs — no hidden multiplier', () => {
    const i = {
      enquiriesPerMonth: 10,
      averageJobValue: 1000,
      closeRate: 0.5,
      missedShare: 0.5,
      adminHoursPerWeek: 1,
      hourlyCost: 10,
    };
    const r = calculateLeak(i);
    expect(r.adminCostPerYear).toBe(1 * 52 * 10);
    expect(r.coldEnquiriesPerYear).toBe(10 * 12 * 0.5);
    expect(r.coldEnquiryValuePerYear).toBe(60 * 0.5 * 1000);
    expect(r.totalPerYear).toBe(r.adminCostPerYear + r.coldEnquiryValuePerYear);
  });

  it('values cold enquiries at the visitor’s own close rate, never a better one', () => {
    const low = calculateLeak({ ...LEAK_DEFAULTS, closeRate: 0.1 });
    const high = calculateLeak({ ...LEAK_DEFAULTS, closeRate: 0.4 });
    // Strictly proportional: 4× the close rate, 4× the value.
    expect(high.coldEnquiryValuePerYear).toBe(low.coldEnquiryValuePerYear * 4);
  });

  it('returns zero rather than NaN when a field is cleared', () => {
    const r = calculateLeak({ ...LEAK_DEFAULTS, enquiriesPerMonth: NaN, hourlyCost: NaN });
    expect(Number.isNaN(r.totalPerYear)).toBe(false);
    expect(r.adminCostPerYear).toBe(0);
    expect(r.coldEnquiriesPerYear).toBe(0);
  });

  it('clamps negatives to zero', () => {
    const r = calculateLeak({ ...LEAK_DEFAULTS, adminHoursPerWeek: -40, closeRate: -1 });
    expect(r.adminCostPerYear).toBe(0);
    expect(r.coldEnquiryValuePerYear).toBe(0);
  });

  it('clamps rates above 100%', () => {
    const at100 = calculateLeak({ ...LEAK_DEFAULTS, closeRate: 1 });
    const above = calculateLeak({ ...LEAK_DEFAULTS, closeRate: 5 });
    expect(above.coldEnquiryValuePerYear).toBe(at100.coldEnquiryValuePerYear);
  });

  it('is zero across the board when every input is zero', () => {
    const r = calculateLeak({
      enquiriesPerMonth: 0,
      averageJobValue: 0,
      closeRate: 0,
      missedShare: 0,
      adminHoursPerWeek: 0,
      hourlyCost: 0,
    });
    expect(r.totalPerYear).toBe(0);
  });

  it('formats money with thousands separators', () => {
    expect(formatMoney(85_000)).toBe('$85,000');
    expect(formatMoney(1_234_567)).toBe('$1,234,567');
  });
});
