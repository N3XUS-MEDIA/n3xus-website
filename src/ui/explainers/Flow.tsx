import { cn } from '@/lib/cn';
import type { Diagram } from '@/content/blocks';
import { Icon } from './icons';
import { InView } from './InView';

const S = (i: number) => ({ '--i': i }) as React.CSSProperties;

function Arrow({ i, top }: { i: number; top?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex shrink-0 items-center justify-center text-accent lg:w-8',
        // With notes, cards sit at the top of taller columns: pin the arrow to the card's middle.
        top && 'lg:mt-[1.375rem] lg:self-start',
      )}
    >
      <svg viewBox="0 0 32 16" className="h-4 w-8 rotate-90 lg:rotate-0" fill="none">
        <path d="M1 8h27" pathLength={1} stroke="currentColor" strokeWidth="1.5" className="x-draw" style={S(i)} />
        <path
          d="M23 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="x-rise"
          style={S(i + 1)}
        />
      </svg>
    </span>
  );
}

function LoopIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 shrink-0 text-accent-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
    </svg>
  );
}

/**
 * A pipeline or chain: how something moves through stages. Used for the
 * Intelligence data flow, the RAG pipeline on /services/ai, the "why this
 * order" chain on /services/strategy and the brand measurement loop.
 */
export function Flow({
  diagram,
  summary,
  id,
}: {
  diagram: Extract<Diagram, { kind: 'flow' }>;
  summary: string;
  id: string;
}) {
  const { stages, loop } = diagram;
  return (
    <InView as="figure" aria-describedby={`${id}-summary`} className="m-0 mt-10">
      <p id={`${id}-summary`} className="sr-only">
        {summary}
      </p>
      <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:gap-0">
        {stages.map((stage, i) => (
          <li key={stage.label} className="contents">
            {i > 0 ? <Arrow i={i * 3 - 1} top={stages.some((s) => s.note)} /> : null}
            <div
              className={cn(
                'x-rise flex flex-1 flex-col',
                // Notes make columns uneven; centring would then stagger the cards.
                !stages.some((s) => s.note) && 'lg:justify-center',
              )}
              style={S(i * 3)}
            >
              <div
                className={cn(
                  'x-node flex flex-col rounded-lg border bg-paper p-4',
                  stage.items ? 'flex-1 border-line' : 'border-accent/40',
                )}
              >
                {/* Five or more stages leave each card narrow on desktop: stack
                    the icon above the label so the words get the full width. */}
                <div
                  className={cn(
                    'flex items-center gap-3',
                    stages.length >= 5 && 'lg:flex-col lg:items-start lg:gap-2.5',
                  )}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent-ink">
                    <Icon name={stage.icon} className="size-5" />
                  </span>
                  <span className="font-heading text-sm font-semibold leading-snug text-ink">{stage.label}</span>
                </div>
                {stage.items ? (
                  <ul className="mt-3 space-y-1.5">
                    {stage.items.map((item) => (
                      <li key={item} className="rounded-sm bg-mist px-2.5 py-1.5 text-xs font-medium text-ink-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              {stage.note ? (
                <p className="mt-2 flex items-start gap-1.5 px-1 text-xs leading-snug text-ink-muted">
                  <Icon name="cross" className="mt-px size-3.5 shrink-0" />
                  {stage.note}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
      {loop ? (
        <div className="x-rise mt-4" style={S(stages.length * 3)}>
          <div aria-hidden className="mx-[8%] hidden h-5 rounded-b-lg border-x border-b border-dashed border-accent-ink/60 lg:block" />
          <p className="mt-2 flex items-center gap-2 text-xs font-medium text-ink-muted lg:justify-center">
            <LoopIcon />
            {loop}
          </p>
        </div>
      ) : null}
    </InView>
  );
}
