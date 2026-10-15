'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { cn } from '@/lib/cn';
import type { PainPoint } from '@/content/services';
import { Icon, type IconName } from './icons';
import { InView } from './InView';

const PILLARS: { id: PainPoint['pillar']; name: string; icon: IconName }[] = [
  { id: 'strategy', name: 'Strategy', icon: 'compass' },
  { id: 'build', name: 'Intelligence', icon: 'layers' },
  { id: 'grow', name: 'Growth', icon: 'megaphone' },
];

const S = (i: number) => ({ '--i': i }) as React.CSSProperties;

/**
 * "Which of these is true for you?" as a router: pick the sentence that sounds
 * like your week, and the diagram lights the pillar it belongs to and where to
 * go next. Replaces seven equal-weight text cards. On a phone it is a plain
 * list of expandable rows — every body is in the HTML either way.
 */
export function ProblemRouter({ points, summary }: { points: PainPoint[]; summary: string }) {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const summaryId = useId();
  const sel = points[active]!;
  const pillarIndex = PILLARS.findIndex((p) => p.id === sel.pillar);

  return (
    <InView as="figure" aria-describedby={summaryId} className="m-0 mt-10">
      <p id={summaryId} className="sr-only">
        {summary}
      </p>

      <div className="hidden gap-8 md:grid md:grid-cols-12">
        <ul className="space-y-2 md:col-span-5">
          {points.map((p, i) => (
            <li key={p.quote} className="x-rise" style={S(i)}>
              <button
                type="button"
                aria-pressed={i === active}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                className={cn(
                  'flex min-h-[44px] w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm font-medium transition-colors',
                  i === active
                    ? 'x-node border-accent-ink bg-paper text-ink'
                    : 'border-line bg-paper/60 text-ink-muted hover:border-accent-ink hover:text-ink',
                )}
              >
                <span
                  aria-hidden
                  className={cn('size-2 shrink-0 rounded-full', i === active ? 'bg-accent-ink' : 'bg-line')}
                />
                “{p.quote}”
              </button>
            </li>
          ))}
        </ul>

        <div
          id={panelId}
          aria-live="polite"
          className="x-rise x-node flex flex-col rounded-lg border border-line bg-paper p-6 md:col-span-7"
          style={S(points.length)}
        >
          <p className="eyebrow">Where that sits</p>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {PILLARS.map((p, i) => (
              <div
                key={p.id}
                className={cn(
                  'flex flex-col items-center gap-2 rounded-md border px-2 py-3 text-center transition-colors duration-300',
                  i === pillarIndex ? 'border-accent-ink bg-accent/10' : 'border-line opacity-60',
                )}
              >
                <Icon name={p.icon} className={cn('size-5', i === pillarIndex ? 'text-accent-ink' : 'text-ink-muted')} />
                <span className="font-heading text-sm font-semibold text-ink">{p.name}</span>
              </div>
            ))}
          </div>
          {/* Pointer under the lit pillar. */}
          <div className="relative mt-1 h-4" aria-hidden>
            <span
              className="absolute top-0 size-0 border-x-8 border-b-8 border-x-transparent border-b-accent-ink transition-[left] duration-300"
              style={{ left: `calc(${(pillarIndex * 100) / 3 + 100 / 6}% - 8px)` }}
            />
          </div>
          <h3 className="mt-2 text-xl text-ink">“{sel.quote}”</h3>
          <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{sel.body}</p>
          <Link
            href={sel.href}
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-medium text-accent-ink underline underline-offset-4 hover:no-underline"
          >
            {sel.linkLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <ul className="space-y-2 md:hidden">
        {points.map((p, i) => (
          <li key={p.quote} className="x-rise" style={S(i)}>
            <details className="group rounded-md border border-line bg-paper">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-3 px-4 py-3 text-sm font-medium text-ink">
                <span className="flex-1">“{p.quote}”</span>
                <span aria-hidden className="text-ink-muted transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-line px-4 pb-4 pt-3">
                <p className="eyebrow">{PILLARS.find((x) => x.id === p.pillar)?.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.body}</p>
                <Link
                  href={p.href}
                  className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-accent-ink underline underline-offset-4"
                >
                  {p.linkLabel}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </InView>
  );
}
