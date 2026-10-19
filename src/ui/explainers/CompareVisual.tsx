import type { Diagram } from '@/content/blocks';
import { Icon } from './icons';
import { InView } from './InView';

const S = (i: number) => ({ '--i': i }) as React.CSSProperties;

/**
 * Before/after as paired rows: each brochure-site behaviour sits directly
 * opposite what replaces it. Icons and alignment do the work the two separate
 * lists used to leave to the reader. No chart and no figures, deliberately.
 */
export function CompareVisual({
  diagram,
  summary,
  id,
}: {
  diagram: Extract<Diagram, { kind: 'compareVisual' }>;
  summary: string;
  id: string;
}) {
  const { before, after } = diagram;
  return (
    <InView as="figure" aria-describedby={`${id}-summary`} className="m-0 mt-10">
      <p id={`${id}-summary`} className="sr-only">
        {summary}
      </p>
      <div className="hidden grid-cols-[1fr_2rem_1fr] gap-4 px-1 sm:grid">
        <p className="eyebrow">{before.label}</p>
        <span />
        <p className="eyebrow text-accent-ink">{after.label}</p>
      </div>
      <ol className="mt-4 space-y-3">
        {after.rows.map((row, i) => (
          <li key={row} className="x-rise grid items-stretch gap-2 sm:grid-cols-[1fr_2rem_1fr] sm:gap-4" style={S(i)}>
            <p className="flex items-center gap-3 rounded-md border border-line px-4 py-3 text-sm text-ink-muted">
              <Icon name="cross" className="size-4 shrink-0" />
              {before.rows[i]}
            </p>
            <span aria-hidden className="hidden items-center justify-center text-accent-ink sm:flex">
              →
            </span>
            <p className="x-node flex items-center gap-3 rounded-md border border-accent/40 bg-paper px-4 py-3 text-sm font-medium text-ink">
              <Icon name="check" className="size-4 shrink-0 text-accent-ink" />
              {row}
            </p>
          </li>
        ))}
      </ol>
    </InView>
  );
}
