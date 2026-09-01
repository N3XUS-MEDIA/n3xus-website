'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/ui/primitives/Button';
import { LEAK_DEFAULTS, calculateLeak, formatMoney, type LeakInputs } from '@/lib/leakCalc';
import { site } from '@/content/copy';

interface FieldDef {
  key: keyof LeakInputs;
  label: string;
  hint?: string;
  min: number;
  max: number;
  step: number;
  /** Rendered as a percentage; stored as 0–1. */
  percent?: boolean;
  prefix?: string;
  suffix?: string;
}

const FIELDS: FieldDef[] = [
  { key: 'enquiriesPerMonth', label: 'Enquiries you receive a month', min: 0, max: 500, step: 1 },
  {
    key: 'averageJobValue',
    label: 'Average value of a job you win',
    min: 0,
    max: 50_000,
    step: 100,
    prefix: '$',
  },
  {
    key: 'closeRate',
    label: 'Of those enquiries, how many you win',
    hint: 'Your current close rate — we use this exact figure rather than assuming you’d do better.',
    min: 0,
    max: 1,
    step: 0.01,
    percent: true,
  },
  {
    key: 'missedShare',
    label: 'Enquiries that never get a proper follow-up',
    hint: 'The ones that arrive after hours, sit in an inbox, or get chased once and forgotten.',
    min: 0,
    max: 1,
    step: 0.01,
    percent: true,
  },
  {
    key: 'adminHoursPerWeek',
    label: 'Hours a week your team spends on manual admin',
    hint: 'Capturing details, typing quotes, chasing payment, booking, re-keying between tools.',
    min: 0,
    max: 100,
    step: 1,
    suffix: ' hrs',
  },
  {
    key: 'hourlyCost',
    label: 'Loaded hourly cost of the people doing it',
    min: 0,
    max: 500,
    step: 1,
    prefix: '$',
    suffix: '/hr',
  },
];

export function LeakCalculator() {
  const [inputs, setInputs] = useState<LeakInputs>(LEAK_DEFAULTS);
  const result = useMemo(() => calculateLeak(inputs), [inputs]);

  const display = (f: FieldDef) => {
    const v = inputs[f.key];
    if (f.percent) return `${Math.round(v * 100)}%`;
    return `${f.prefix ?? ''}${v.toLocaleString('en-US')}${f.suffix ?? ''}`;
  };

  return (
    <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
      <div className="lg:col-span-3">
        <div className="space-y-7">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <label htmlFor={f.key} className="font-medium text-ink">
                  {f.label}
                </label>
                <output htmlFor={f.key} className="font-heading font-bold tabular-nums text-ink">
                  {display(f)}
                </output>
              </div>

              <input
                id={f.key}
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={inputs[f.key]}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, [f.key]: Number(e.target.value) }))
                }
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-accent-ink"
              />

              {f.hint ? <p className="mt-2 text-sm text-ink-muted">{f.hint}</p> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="rounded-lg border border-line bg-mist/40 p-6 lg:sticky lg:top-24">
          <p className="eyebrow">Every year, at your numbers</p>

          <dl className="mt-5 space-y-4">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-sm text-ink-muted">Manual admin, costed at staff time</dt>
              <dd className="shrink-0 font-heading font-bold tabular-nums text-ink">
                {formatMoney(result.adminCostPerYear)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-sm text-ink-muted">
                Enquiries that go cold
                <span className="block text-xs">
                  {result.coldEnquiriesPerYear.toLocaleString('en-US')} a year
                </span>
              </dt>
              <dd className="shrink-0 font-heading font-bold tabular-nums text-ink">
                {formatMoney(result.coldEnquiryValuePerYear)}
              </dd>
            </div>
          </dl>

          <hr className="rule my-5" />

          <p className="text-sm text-ink-muted">What the manual version costs you</p>
          {/* Polite live region: announces the headline as the sliders move,
              without re-reading the whole panel on every input event. */}
          <p
            aria-live="polite"
            className="mt-1 font-heading text-3xl font-bold tabular-nums text-ink"
          >
            {formatMoney(result.totalPerYear)}
          </p>

          <p className="mt-5 text-xs leading-relaxed text-ink-muted">
            Calculated only from the figures you entered, and shown so you can check the
            arithmetic: admin is hours × 52 weeks × hourly cost. Cold enquiries are valued at your
            own close rate — we assume no improvement on how well you already sell. Nothing here is
            an industry average or a promise of results.
          </p>

          <Button asChild size="lg" className="mt-6 w-full">
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
              Get these numbers checked
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
