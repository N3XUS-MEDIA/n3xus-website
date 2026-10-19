'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/cn';
import type { HubItem } from '@/content/blocks';
import { Icon } from './icons';
import { InView } from './InView';

/**
 * "One front door": the website in the middle, everything the business runs on
 * around it. Static on the homepage; on /services/website-os each spoke is a
 * button that opens its detail, which is how that page's eight feature cards
 * became one diagram.
 *
 * Geometry is percentages on an ellipse, so the SVG connectors (drawn in a
 * 0–100 box with non-scaling strokes) and the HTML nodes always line up.
 * Below `md` it becomes a list on a rail: a ring of eight labels on a phone is
 * a puzzle, not an explainer.
 */
export function WebsiteOsHub({
  centre,
  items,
  summary,
  interactive = false,
}: {
  centre: string;
  items: HubItem[];
  summary: string;
  interactive?: boolean;
}) {
  const [active, setActive] = useState(0);
  const summaryId = useId();
  const panelId = useId();
  const selected = items[active];

  const points = items.map((_, i) => {
    const a = ((-90 + (i * 360) / items.length) * Math.PI) / 180;
    return { x: 50 + 38 * Math.cos(a), y: 50 + 36 * Math.sin(a) };
  });

  const ring = (
    <div className="relative hidden aspect-[16/11] md:block">
      {/* Same 16:11 proportions as the box, so the drawing scales uniformly —
          a stretched (preserveAspectRatio="none") SVG breaks the pathLength
          dash trick the draw-in animation relies on. */}
      <svg viewBox="0 0 160 110" className="absolute inset-0 size-full text-accent" aria-hidden>
        {points.map((p, i) => (
          <line
            key={i}
            x1="80"
            y1="55"
            x2={p.x * 1.6}
            y2={p.y * 1.1}
            pathLength={1}
            stroke="currentColor"
            strokeWidth="0.45"
            className={cn('x-draw', interactive && i !== active && 'opacity-40')}
            style={{ '--i': i + 2 } as React.CSSProperties}
          />
        ))}
      </svg>

      <div
        className="x-rise x-node absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-lg border border-accent/40 bg-paper px-5 py-4 text-center"
        style={{ '--i': 0 } as React.CSSProperties}
      >
        <span className="flex size-10 items-center justify-center rounded-md bg-accent/15 text-accent-ink">
          <Icon name="globe" className="size-6" />
        </span>
        <span className="font-heading text-base font-semibold text-ink">{centre}</span>
      </div>

      {items.map((item, i) => {
        const p = points[i]!;
        const body = (
          <>
            <Icon name={item.icon} className="size-5 shrink-0 text-accent-ink" />
            <span className="text-sm font-medium leading-snug text-ink">{item.label}</span>
          </>
        );
        const cls =
          'x-rise x-node absolute flex w-36 -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-md border bg-paper px-3 py-2.5 text-left lg:w-40';
        const style = { left: `${p.x}%`, top: `${p.y}%`, '--i': i + 3 } as React.CSSProperties;
        return interactive ? (
          <button
            key={item.label}
            type="button"
            aria-pressed={i === active}
            aria-controls={panelId}
            onClick={() => setActive(i)}
            className={cn(
              cls,
              'transition-colors hover:border-accent-ink',
              i === active ? 'border-accent-ink bg-mist' : 'border-line',
            )}
            style={style}
          >
            {body}
          </button>
        ) : (
          <div key={item.label} className={cn(cls, 'border-line')} style={style}>
            {body}
          </div>
        );
      })}
    </div>
  );

  const list = (
    <ol className="relative space-y-3 pl-8 md:hidden">
      <span
        aria-hidden
        className="x-grow-y absolute bottom-4 left-3 top-4 w-px bg-accent"
        style={{ '--i': 1 } as React.CSSProperties}
      />
      <li className="x-rise relative" style={{ '--i': 0 } as React.CSSProperties}>
        <span aria-hidden className="absolute -left-[1.4rem] top-4 size-2.5 rounded-full bg-accent-ink" />
        <div className="x-node flex items-center gap-3 rounded-lg border border-accent/40 bg-paper px-4 py-3">
          <Icon name="globe" className="size-5 text-accent-ink" />
          <span className="font-heading font-semibold text-ink">{centre}</span>
        </div>
      </li>
      {items.map((item, i) => (
        <li
          key={item.label}
          className="x-rise relative"
          style={{ '--i': i + 2 } as React.CSSProperties}
        >
          <span aria-hidden className="absolute -left-[1.4rem] top-4 size-2 rounded-full bg-accent" />
          {interactive && item.body ? (
            <details className="x-node group rounded-md border border-line bg-paper">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-3 px-4 py-2.5">
                <Icon name={item.icon} className="size-5 shrink-0 text-accent-ink" />
                <span className="flex-1 text-sm font-medium text-ink">{item.label}</span>
                <span aria-hidden className="text-ink-muted transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="border-t border-line px-4 pb-4 pt-3">
                <p className="text-sm leading-relaxed text-ink-muted">{item.body}</p>
                {item.outcome ? (
                  <p className="mt-3 text-sm font-medium text-accent-ink">{item.outcome}</p>
                ) : null}
              </div>
            </details>
          ) : (
            <div className="x-node flex items-center gap-3 rounded-md border border-line bg-paper px-4 py-2.5">
              <Icon name={item.icon} className="size-5 shrink-0 text-accent-ink" />
              <span className="text-sm font-medium text-ink">{item.label}</span>
            </div>
          )}
        </li>
      ))}
    </ol>
  );

  return (
    <InView as="figure" aria-describedby={summaryId} className="m-0">
      <p id={summaryId} className="sr-only">
        {summary}
      </p>
      {interactive && selected?.body ? (
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            {ring}
            {list}
          </div>
          <div
            id={panelId}
            aria-live="polite"
            className="x-rise x-node hidden rounded-lg border border-line bg-paper p-6 md:block lg:col-span-4"
            style={{ '--i': items.length + 3 } as React.CSSProperties}
          >
            <p className="eyebrow">{selected.label}</p>
            <h3 className="mt-3 text-lg text-ink">{selected.title ?? selected.label}</h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{selected.body}</p>
            {selected.outcome ? (
              <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-accent-ink">
                {selected.outcome}
              </p>
            ) : null}
            <p className="mt-5 text-xs text-ink-muted">Select any part of the diagram to see what it does.</p>
          </div>
        </div>
      ) : (
        <>
          {ring}
          {list}
        </>
      )}
    </InView>
  );
}
