import { cn } from '@/lib/cn';
import type { Diagram } from '@/content/blocks';
import { Icon } from './icons';
import { InView } from './InView';

const S = (i: number) => ({ '--i': i }) as React.CSSProperties;

/**
 * The same enquiry on two websites, row by row against the clock. The
 * operating-system track keeps moving; the brochure track stalls at the form.
 * Built from the page's existing timeline — nothing added but the contrast.
 */
export function TwoTrack({
  diagram,
  summary,
  id,
}: {
  diagram: Extract<Diagram, { kind: 'twoTrack' }>;
  summary: string;
  id: string;
}) {
  const { before, after, coda } = diagram;
  return (
    <InView as="figure" aria-describedby={`${id}-summary`} className="m-0 mt-10">
      <p id={`${id}-summary`} className="sr-only">
        {summary}
      </p>
      <div className="hidden gap-4 sm:grid sm:grid-cols-[5.5rem_1fr_1fr]">
        <span />
        <p className="eyebrow">{before.label}</p>
        <p className="eyebrow text-accent-ink">{after.label}</p>
      </div>
      <ol className="mt-4 space-y-3">
        {after.steps.map((step, i) => {
          const b = before.steps[i];
          return (
            <li
              key={i}
              className="x-rise grid gap-3 sm:grid-cols-[5.5rem_1fr_1fr] sm:gap-4"
              style={S(i * 2)}
            >
              <p className="pt-3 font-heading text-sm font-bold tabular-nums text-accent-ink">{step.time}</p>
              <div
                className={cn(
                  'flex items-start gap-3 rounded-md border px-4 py-3 text-sm',
                  b?.idle ? 'border-dashed border-line text-ink-muted/80' : 'border-line bg-paper text-ink',
                )}
              >
                <Icon name={b?.idle ? 'inbox' : 'cross'} className="mt-0.5 size-4 shrink-0 text-ink-muted" />
                <span>
                  <span className="eyebrow mb-1 block sm:hidden">{before.label}</span>
                  {b?.text ?? ''}
                </span>
              </div>
              <details className="x-node group rounded-md border border-accent/40 bg-paper">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-start gap-3 px-4 py-3 text-sm">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent-ink" />
                  <span className="flex-1">
                    <span className="eyebrow mb-1 block sm:hidden">{after.label}</span>
                    <span className="eyebrow mr-2">{step.actor}</span>
                    <span className="font-medium text-ink">{step.title}</span>
                  </span>
                  <span aria-hidden className="text-ink-muted transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="border-t border-line px-4 pb-4 pt-3 text-sm leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </details>
            </li>
          );
        })}
      </ol>
      {coda ? (
        <p className="x-rise mt-10 border-t border-line pt-8 text-lg leading-relaxed text-ink" style={S(12)}>
          {coda}
        </p>
      ) : null}
    </InView>
  );
}
