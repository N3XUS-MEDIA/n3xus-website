/**
 * Retainer quote maths. Pure functions, no React — the arithmetic that decides
 * what a client is quoted should be testable without rendering anything.
 */

import {
  BUNDLE_DISCOUNT_RATE,
  BUNDLE_PILLAR_IDS,
  CURRENCIES,
  PILLARS,
  REQUIRED_MODULE_IDS,
  findModule,
  pillarOf,
  type CurrencyCode,
  type RetainerModule,
} from '@/content/pricing';

export interface QuoteLine {
  module: RetainerModule;
  pillarName: string;
  amount: number;
}

export interface Quote {
  currency: CurrencyCode;
  lines: QuoteLine[];
  subtotal: number;
  /** True when every bundle-eligible pillar has at least one selection. */
  bundleQualifies: boolean;
  /** Pillar ids still needed to qualify. Empty once `bundleQualifies`. */
  missingPillarIds: string[];
  discount: number;
  total: number;
}

/**
 * Always includes the mandatory Base OS, whether or not the caller passed it —
 * a quote without it is not a quote we offer.
 */
export function normaliseSelection(selectedIds: Iterable<string>): string[] {
  const set = new Set(selectedIds);
  for (const id of REQUIRED_MODULE_IDS) set.add(id);

  // Return in matrix order rather than click order, so the summary reads the
  // same way as the page the client just filled in.
  return PILLARS.flatMap((p) => p.modules.filter((m) => set.has(m.id)).map((m) => m.id));
}

export function buildQuote(selectedIds: Iterable<string>, currency: CurrencyCode): Quote {
  const ids = normaliseSelection(selectedIds);

  const lines: QuoteLine[] = ids.flatMap((id) => {
    const module = findModule(id);
    if (!module) return []; // unknown id (stale link, hand-edited URL) — ignore
    return [
      {
        module,
        pillarName: pillarOf(id)?.name ?? '',
        amount: module.price[currency],
      },
    ];
  });

  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);

  const touchedPillars = new Set(lines.map((l) => pillarOf(l.module.id)?.id));
  const missingPillarIds = BUNDLE_PILLAR_IDS.filter((id) => !touchedPillars.has(id));
  const bundleQualifies = missingPillarIds.length === 0;

  // Round to whole currency units — these are round numbers by design and a
  // quote showing R19,979.99 would look like a bug.
  const discount = bundleQualifies ? Math.round(subtotal * BUNDLE_DISCOUNT_RATE) : 0;

  return {
    currency,
    lines,
    subtotal,
    bundleQualifies,
    missingPillarIds,
    discount,
    total: subtotal - discount,
  };
}

export function formatPrice(amount: number, currency: CurrencyCode): string {
  const { symbol } = CURRENCIES[currency];
  return `${symbol}${amount.toLocaleString('en-ZA').replace(/ /g, ',')}`;
}

export function formatMonthly(amount: number, currency: CurrencyCode): string {
  return `${formatPrice(amount, currency)} / mo`;
}

/**
 * The plain-text proposal summary, matching the format in the brief.
 * Used for the on-page summary, the emailed payload, and eventually the CRM.
 */
export function renderProposalSummary(quote: Quote, client?: string): string {
  const { currency } = quote;
  const currencyLabel = `${CURRENCIES[currency].symbol} ${currency}`;

  const lines = [
    'N3XUS MEDIA — CUSTOM GROWTH RETAINER',
    `CLIENT: ${client?.trim() || '[Client Name / Company]'}`,
    `CURRENCY: ${currencyLabel}`,
    '',
    'ACTIVE MODULES:',
    ...quote.lines.map(
      (l) =>
        `  • ${l.module.name} [${formatMonthly(l.amount, currency)}]${l.module.required ? ' (Core)' : ''}`,
    ),
    '',
    `SUBTOTAL: ${formatMonthly(quote.subtotal, currency)}`,
  ];

  if (quote.bundleQualifies) {
    lines.push(`BUNDLE DISCOUNT (4 pillars active, 10%): -${formatMonthly(quote.discount, currency)}`);
  }

  lines.push(`TOTAL ESTIMATED MONTHLY RETAINER: ${formatMonthly(quote.total, currency)}`);

  return lines.join('\n');
}
