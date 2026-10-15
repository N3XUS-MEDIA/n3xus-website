import type { IconName } from './icons';
import { Icon } from './icons';
import { InView } from './InView';

/**
 * Hero diagram: Strategy → Intelligence → Growth as one system, with the
 * results feeding back into the next decision. Replaces the plain list of the
 * three pillars beside the hero. The only explainer allowed resting motion
 * (the beads on the connectors) — it is the page's showpiece.
 */
export function CoreSystem({
  layers,
  loopLabel,
  summary,
}: {
  layers: { n: string; name: string; sub: string; icon: IconName }[];
  loopLabel: string;
  summary: string;
}) {
  return (
    <InView as="figure" aria-describedby="core-system-summary" className="m-0" threshold={0.2}>
      <p id="core-system-summary" className="sr-only">
        {summary}
      </p>
      <div className="relative pr-10">
        <ol className="space-y-0">
          {layers.map((layer, i) => (
            <li key={layer.n}>
              {i > 0 ? (
                <svg
                  viewBox="0 0 10 40"
                  preserveAspectRatio="none"
                  className="ml-8 block h-9 w-2.5 text-accent"
                  aria-hidden
                >
                  <line
                    x1="5"
                    y1="0"
                    x2="5"
                    y2="40"
                    pathLength={1}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="x-draw"
                    style={{ '--i': i * 3 - 1 } as React.CSSProperties}
                  />
                  <line
                    x1="5"
                    y1="0"
                    x2="5"
                    y2="40"
                    pathLength={1}
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="x-flow text-accent-ink"
                  />
                </svg>
              ) : null}
              <div
                className="x-rise x-node flex items-start gap-4 rounded-lg border border-line bg-paper p-4"
                style={{ '--i': i * 3 } as React.CSSProperties}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent-ink">
                  <Icon name={layer.icon} className="size-6" />
                </span>
                <span>
                  <span className="flex items-baseline gap-2">
                    <span className="font-heading text-xs font-bold text-accent-ink">{layer.n}</span>
                    <span className="font-heading font-semibold text-ink">{layer.name}</span>
                  </span>
                  <span className="mt-1 block text-sm leading-snug text-ink-muted">{layer.sub.charAt(0).toUpperCase() + layer.sub.slice(1)}</span>
                </span>
              </div>
            </li>
          ))}
        </ol>

        {/* The return path: what happened informs the next decision. */}
        <svg
          viewBox="0 0 40 100"
          preserveAspectRatio="none"
          className="absolute inset-y-8 right-0 h-[calc(100%-4rem)] w-10 text-accent"
          aria-hidden
        >
          <path
            d="M0 100 C 34 100, 34 0, 0 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            vectorEffect="non-scaling-stroke"
            className="x-rise"
            style={{ '--i': 9 } as React.CSSProperties}
          />
        </svg>
      </div>
      <figcaption
        className="x-rise mt-4 flex items-center justify-end gap-2 pr-1 text-xs font-medium text-ink-muted"
        style={{ '--i': 10 } as React.CSSProperties}
      >
        <svg viewBox="0 0 24 24" className="size-4 text-accent-ink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
        </svg>
        {loopLabel}
      </figcaption>
    </InView>
  );
}
