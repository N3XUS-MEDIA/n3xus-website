import { InView } from './InView';

const S = (i: number) => ({ '--i': i }) as React.CSSProperties;

/**
 * Homepage process as a rail that draws left to right (top to bottom on a
 * phone). Each step leads with what the client holds at the end of it — a
 * deliverable, never a number — with the detail underneath.
 */
const COLS = { 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' } as const;

export function ProcessRail({
  steps,
  summary,
  id = 'process',
}: {
  steps: { n: string; title: string; holds?: string; body: string }[];
  summary: string;
  id?: string;
}) {
  const cols = COLS[Math.min(5, Math.max(3, steps.length)) as 3 | 4 | 5];
  return (
    <InView as="figure" aria-describedby={`${id}-summary`} className="relative m-0 mt-12">
      <p id={`${id}-summary`} className="sr-only">
        {summary}
      </p>
      {/* Rail: horizontal on lg, vertical below. */}
      <span aria-hidden className="x-grow absolute left-0 right-0 top-[1.375rem] hidden h-px bg-accent lg:block" style={S(0)} />
      <span aria-hidden className="x-grow-y absolute bottom-0 left-[1.375rem] top-0 w-px bg-accent lg:hidden" style={S(0)} />
      <ol className={`grid gap-8 lg:gap-6 ${cols}`}>
        {steps.map((step, i) => (
          <li key={step.n} className="x-rise relative pl-16 lg:pl-0" style={S(i * 3 + 1)}>
            <span className="absolute left-0 top-0 flex size-11 items-center justify-center rounded-full border border-accent-ink bg-paper font-heading text-sm font-bold text-accent-ink lg:relative">
              {step.n}
            </span>
            <h3 className="text-lg text-ink lg:mt-5">{step.title}</h3>
            {step.holds ? (
              <p className="mt-2 rounded-md border border-line bg-mist/60 px-3 py-2 text-sm font-medium text-ink">
                <span className="eyebrow mr-1.5 text-[0.65rem]">You get</span>
                {step.holds}
              </p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </InView>
  );
}
