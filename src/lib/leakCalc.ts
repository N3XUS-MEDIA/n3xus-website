/**
 * The "cost of doing nothing" calculator on /services/website-os.
 *
 * Every figure is derived from numbers the visitor entered. There are no
 * industry benchmarks, no uplift multipliers and no assumption that N3XUS
 * would improve the close rate — cold enquiries are valued at the visitor's
 * OWN close rate, deliberately, so the output cannot be read as a promise of
 * results. That constraint is why this passes CLAUDE.md non-negotiable #5, and
 * it is the reason the arithmetic is stated on the page.
 *
 * Keep it that way: any multiplier added here turns an honest arithmetic
 * exercise into an unverifiable claim.
 */

export interface LeakInputs {
  /** Enquiries received per month. */
  enquiriesPerMonth: number;
  /** Average value of a job won. */
  averageJobValue: number;
  /** Close rate, 0–1. */
  closeRate: number;
  /** Share of enquiries that never get a proper follow-up, 0–1. */
  missedShare: number;
  /** Hours per week the team spends on manual admin. */
  adminHoursPerWeek: number;
  /** Loaded hourly cost of the people doing that admin. */
  hourlyCost: number;
}

export const LEAK_DEFAULTS: LeakInputs = {
  enquiriesPerMonth: 40,
  averageJobValue: 2500,
  closeRate: 0.2,
  missedShare: 0.3,
  adminHoursPerWeek: 10,
  hourlyCost: 25,
};

export interface LeakResult {
  /** Admin hours × 52 weeks × hourly cost. */
  adminCostPerYear: number;
  /** Enquiries per year that never get a proper follow-up. */
  coldEnquiriesPerYear: number;
  /** Those enquiries valued at the visitor's own close rate. */
  coldEnquiryValuePerYear: number;
  /** The two added together. */
  totalPerYear: number;
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function calculateLeak(input: LeakInputs): LeakResult {
  // Guard against NaN from an emptied number input, and against negatives.
  const safe = (n: number, max = Number.MAX_SAFE_INTEGER) =>
    Number.isFinite(n) ? clamp(n, 0, max) : 0;

  const enquiriesPerMonth = safe(input.enquiriesPerMonth, 100_000);
  const averageJobValue = safe(input.averageJobValue, 100_000_000);
  const closeRate = safe(input.closeRate, 1);
  const missedShare = safe(input.missedShare, 1);
  const adminHoursPerWeek = safe(input.adminHoursPerWeek, 168);
  const hourlyCost = safe(input.hourlyCost, 100_000);

  const adminCostPerYear = Math.round(adminHoursPerWeek * 52 * hourlyCost);

  const coldEnquiriesPerYear = Math.round(enquiriesPerMonth * 12 * missedShare);

  // Valued at the visitor's own close rate — no assumed improvement.
  const coldEnquiryValuePerYear = Math.round(
    coldEnquiriesPerYear * closeRate * averageJobValue,
  );

  return {
    adminCostPerYear,
    coldEnquiriesPerYear,
    coldEnquiryValuePerYear,
    totalPerYear: adminCostPerYear + coldEnquiryValuePerYear,
  };
}

export function formatMoney(amount: number): string {
  return `$${Math.round(amount).toLocaleString('en-US')}`;
}
