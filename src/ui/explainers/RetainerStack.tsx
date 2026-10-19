import type { RetainerArea } from '@/content/retainerModules';
import { Icon, type IconName } from './icons';
import { InView } from './InView';

const S = (i: number) => ({ '--i': i }) as React.CSSProperties;
const ICONS: Record<string, IconName> = {
  visibility: 'compass',
  social: 'megaphone',
  agents: 'chat',
  performance: 'chart',
};

/**
 * How a retainer is built, drawn: the Website OS base every retainer sits on,
 * and the optional module groups stacked on top of it. The base settles first,
 * then the modules land on it. No prices — they are quoted per business.
 */
export function RetainerStack({ areas }: { areas: RetainerArea[] }) {
  const base = areas.flatMap((a) => a.modules).find((m) => m.required);
  const optional = areas
    .map((a) => ({ ...a, modules: a.modules.filter((m) => !m.required) }))
    .filter((a) => a.modules.length);

  return (
    <InView as="figure" aria-describedby="retainer-stack-summary" className="m-0">
      <p id="retainer-stack-summary" className="sr-only">
        Every retainer starts on the same base: {base?.name}. On top of it you add only the module groups you need:{' '}
        {optional.map((a) => a.name).join(', ')}.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {optional.map((area, i) => (
          <div key={area.id} className="flex flex-col justify-end gap-2">
            <p className="x-rise eyebrow flex items-center gap-2" style={S(4 + i * 4)}>
              <Icon name={ICONS[area.id] ?? 'layers'} className="size-4 text-accent-ink" />
              {area.name}
            </p>
            {[...area.modules].reverse().map((m, j) => (
              <a
                key={m.id}
                href={`#${area.id}`}
                className="x-rise x-node rounded-md border border-dashed border-accent-ink/50 bg-paper px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:border-solid hover:border-accent-ink"
                style={S(4 + i * 4 + (area.modules.length - j))}
              >
                {m.name}
              </a>
            ))}
          </div>
        ))}
      </div>
      {base ? (
        <a
          href="#core"
          className="x-rise x-node mt-3 flex flex-col items-center justify-center gap-1 rounded-lg border border-accent-ink bg-accent/15 px-4 py-5 text-center sm:flex-row sm:gap-3"
          style={S(0)}
        >
          <Icon name="layers" className="size-6 text-accent-ink" />
          <span className="font-heading text-lg font-semibold text-ink">{base.name}</span>
          <span className="text-sm font-medium text-accent-ink">Included in every retainer</span>
        </a>
      ) : null}
      <p className="x-rise mt-4 text-center text-sm text-ink-muted" style={S(24)}>
        Solid: always included. Dashed: add only what you need.
      </p>
    </InView>
  );
}
