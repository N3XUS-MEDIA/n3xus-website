'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/cn';
import {
  BUNDLE_RULE_DESCRIPTION,
  CURRENCIES,
  ENGAGEMENT_TERMS,
  PILLARS,
  REQUIRED_MODULE_IDS,
  type CurrencyCode,
  type RetainerModule,
} from '@/content/pricing';
import { buildQuote, formatMonthly, renderProposalSummary } from '@/lib/retainer';
import { Button } from '@/ui/primitives/Button';
import { site } from '@/content/copy';

const BADGE_CLASS =
  'rounded-sm bg-accent/15 px-1.5 py-0.5 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-ink';

export function RetainerBuilder() {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [selected, setSelected] = useState<Set<string>>(new Set(REQUIRED_MODULE_IDS));

  const quote = useMemo(() => buildQuote(selected, currency), [selected, currency]);

  function toggleModule(module: RetainerModule) {
    if (module.required) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(module.id)) next.delete(module.id);
      else next.add(module.id);
      return next;
    });
  }

  const missingNames = quote.missingPillarIds
    .map((id) => PILLARS.find((p) => p.id === id)?.name)
    .filter(Boolean);

  return (
    <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
      {/* ── Module matrix ─────────────────────────────────────────────── */}
      <div className="lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Currency</p>
            <div
              role="radiogroup"
              aria-label="Pricing currency"
              className="mt-2 inline-flex rounded-md border border-line p-1"
            >
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  role="radio"
                  aria-checked={currency === code}
                  onClick={() => setCurrency(code)}
                  className={cn(
                    'min-h-[44px] rounded-sm px-4 text-sm font-medium transition-colors',
                    currency === code
                      ? 'bg-carbon text-on-carbon'
                      : 'text-ink-muted hover:bg-mist/60 hover:text-ink',
                  )}
                >
                  {CURRENCIES[code].symbol} {code}
                  <span className="ml-1.5 hidden text-xs opacity-70 sm:inline">
                    {CURRENCIES[code].label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {CURRENCIES[currency].note ? (
          <p className="mt-3 text-sm text-ink-muted">{CURRENCIES[currency].note}</p>
        ) : null}

        <div className="mt-10 space-y-10">
          {PILLARS.map((pillar) => (
            <fieldset key={pillar.id}>
              <legend className="w-full">
                <span className="eyebrow">
                  {pillar.index}. {pillar.name}
                </span>
              </legend>

              <div className="mt-4 overflow-hidden rounded-lg border border-line">
                {pillar.modules.map((module, i) => {
                  const checked = selected.has(module.id) || Boolean(module.required);

                  return (
                    <label
                      key={module.id}
                      className={cn(
                        'flex cursor-pointer items-start gap-4 p-4 transition-colors sm:p-5',
                        i > 0 && 'border-t border-line',
                        checked ? 'bg-accent/[0.06]' : 'hover:bg-mist/40',
                        module.required && 'cursor-default',
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={module.required}
                        onChange={() => toggleModule(module)}
                        className="mt-1 size-5 shrink-0 accent-accent-ink"
                        aria-describedby={`${module.id}-scope`}
                      />

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-heading font-semibold text-ink">{module.name}</span>
                          {module.badge ? <span className={BADGE_CLASS}>{module.badge}</span> : null}
                          {module.required ? (
                            <span className="rounded-sm bg-mist px-1.5 py-0.5 font-body text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                              Required
                            </span>
                          ) : null}
                        </span>
                        <span
                          id={`${module.id}-scope`}
                          className="mt-1.5 block text-sm leading-relaxed text-ink-muted"
                        >
                          {module.scope}
                        </span>
                      </span>

                      <span className="shrink-0 text-right font-heading font-semibold text-ink">
                        {formatMonthly(module.price[currency], currency)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {/* ── Running total ─────────────────────────────────────────────── */}
      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-24">
          <div className="rounded-lg border border-line bg-mist/40 p-6">
            <p className="eyebrow">Your retainer</p>

            <ul className="mt-5 space-y-3">
              {quote.lines.map((line) => (
                <li key={line.module.id} className="flex justify-between gap-4 text-sm">
                  <span className="text-ink-muted">{line.module.name}</span>
                  <span className="shrink-0 tabular-nums text-ink">
                    {formatMonthly(line.amount, currency)}
                  </span>
                </li>
              ))}
            </ul>

            <hr className="rule my-5" />

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-ink-muted">Subtotal</span>
              <span className="tabular-nums text-ink">
                {formatMonthly(quote.subtotal, currency)}
              </span>
            </div>

            {quote.bundleQualifies ? (
              <div className="mt-2 flex justify-between gap-4 text-sm">
                <span className="text-accent-ink">Bundle discount (10%)</span>
                <span className="tabular-nums text-accent-ink">
                  −{formatMonthly(quote.discount, currency)}
                </span>
              </div>
            ) : null}

            <hr className="rule my-5" />

            <div className="flex items-end justify-between gap-4">
              <span className="text-sm text-ink-muted">Monthly total</span>
              <span className="font-heading text-2xl font-bold tabular-nums text-ink">
                {formatMonthly(quote.total, currency)}
              </span>
            </div>

            {!quote.bundleQualifies ? (
              <p className="mt-5 rounded-md bg-paper p-3 text-sm leading-relaxed text-ink-muted">
                Add {missingNames.length === 1 ? 'a module from' : 'modules from'}{' '}
                <strong className="font-semibold text-ink">
                  {missingNames.join(', ').replace(/, ([^,]*)$/, ' and $1')}
                </strong>{' '}
                to unlock the 10% bundle discount.
              </p>
            ) : null}

            <Button asChild size="lg" className="mt-6 w-full">
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book a call about this build
              </a>
            </Button>

            <p className="mt-3 text-center text-xs text-ink-muted">
              Estimate only — not a binding quote.
            </p>
          </div>

          <details className="mt-6 rounded-lg border border-line p-5">
            <summary className="cursor-pointer font-heading font-semibold text-ink">
              Copy proposal summary
            </summary>
            <pre className="mt-4 overflow-x-auto whitespace-pre-wrap break-words rounded-md bg-mist/50 p-4 font-mono text-xs leading-relaxed text-ink-muted">
              {renderProposalSummary(quote)}
            </pre>
          </details>

          <ul className="mt-6 space-y-2 text-xs leading-relaxed text-ink-muted">
            {ENGAGEMENT_TERMS.map((term) => (
              <li key={term} className="flex gap-2">
                <span aria-hidden>•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>

          <p className="sr-only" aria-live="polite">
            {quote.bundleQualifies
              ? `Bundle discount applied. Monthly total ${formatMonthly(quote.total, currency)}.`
              : `Monthly total ${formatMonthly(quote.total, currency)}. ${BUNDLE_RULE_DESCRIPTION}`}
          </p>
        </div>
      </div>
    </div>
  );
}
