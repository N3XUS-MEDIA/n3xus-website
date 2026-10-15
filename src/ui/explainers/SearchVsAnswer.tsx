import type { Diagram } from '@/content/blocks';
import { Icon } from './icons';
import { InView } from './InView';

const S = (i: number) => ({ '--i': i }) as React.CSSProperties;

/**
 * GEO in one picture: a search engine hands back a page of links; an AI
 * assistant hands back an answer that names a few businesses. Deliberately a
 * schematic — grey bars, no invented brands, results or rankings.
 */
export function SearchVsAnswer({
  diagram,
  summary,
  id,
}: {
  diagram: Extract<Diagram, { kind: 'searchVsAnswer' }>;
  summary: string;
  id: string;
}) {
  const { search, answer } = diagram;
  return (
    <InView as="figure" aria-describedby={`${id}-summary`} className="m-0 mt-10 grid gap-6 md:grid-cols-2">
      <p id={`${id}-summary`} className="sr-only">
        {summary}
      </p>

      <div className="rounded-lg border border-line bg-paper p-5">
        <p className="eyebrow">{search.label}</p>
        <div aria-hidden className="mt-4 rounded-md border border-line px-3 py-2.5">
          <div className="h-2 w-2/3 rounded-sm bg-line" />
        </div>
        <ul aria-hidden className="mt-4 space-y-3.5">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i} className="x-rise space-y-1.5" style={S(i)}>
              <div className="h-1.5 w-1/3 rounded-sm bg-line" />
              <div className="h-2.5 w-3/4 rounded-sm bg-ink-muted/25" />
              <div className="h-1.5 w-5/6 rounded-sm bg-line" />
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-line pt-4 text-sm text-ink-muted">{search.caption}</p>
      </div>

      <div className="x-node rounded-lg border border-accent/40 bg-paper p-5">
        <p className="eyebrow text-accent-ink">{answer.label}</p>
        <div
          className="x-rise ml-auto mt-4 w-fit max-w-[85%] rounded-lg rounded-br-sm bg-mist px-4 py-2.5 text-sm text-ink"
          style={S(1)}
        >
          {answer.question}
        </div>
        <div className="x-rise mt-3 flex gap-3" style={S(3)}>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent-ink">
            <Icon name="chat" className="size-4" />
          </span>
          <div className="flex-1 space-y-2 pt-1">
            <div aria-hidden className="h-2 w-5/6 rounded-sm bg-line" />
            <div aria-hidden className="h-2 w-2/3 rounded-sm bg-line" />
            <ol className="mt-3 space-y-2">
              <li aria-hidden className="x-rise h-8 rounded-md border border-line bg-mist/50" style={S(5)} />
              <li
                className="x-rise flex h-9 items-center gap-2 rounded-md border border-accent-ink bg-accent/10 px-3 text-sm font-semibold text-ink"
                style={S(7)}
              >
                <Icon name="check" className="size-4 text-accent-ink" />
                {answer.you}
              </li>
              <li aria-hidden className="x-rise h-8 rounded-md border border-line bg-mist/50" style={S(9)} />
            </ol>
          </div>
        </div>
        <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-ink">{answer.caption}</p>
      </div>
    </InView>
  );
}
