import type { ServiceLayer } from '@/content/services';
import { Icon, type IconName } from './icons';
import { InView } from './InView';

const S = (i: number) => ({ '--i': i }) as React.CSSProperties;
const ICONS: Record<string, IconName> = {
  strategy: 'compass',
  build: 'layers',
  grow: 'megaphone',
  amplify: 'megaphone',
  intelligence: 'chart',
};

/**
 * The shape of the catalogue before the catalogue: three pillars in order,
 * with Intelligence as the layer they all report into. Each node jumps to its
 * section, so the map doubles as the page's table of contents.
 */
export function PillarMap({ pillars, base }: { pillars: ServiceLayer[]; base: ServiceLayer }) {
  return (
    <InView as="figure" aria-describedby="pillar-map-summary" className="m-0 mt-10">
      <p id="pillar-map-summary" className="sr-only">
        The catalogue is organised as {pillars.map((p) => p.name.split(' — ')[0]).join(', then ')}, with{' '}
        {base.name.split(' — ')[0]} underneath all of them. Each part links to its section below.
      </p>
      <ol className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {pillars.map((p, i) => (
          <li key={p.id} className="contents">
            {i > 0 ? (
              <span aria-hidden className="hidden items-center justify-center text-accent lg:flex">
                <svg viewBox="0 0 32 16" className="h-4 w-8" fill="none">
                  <path d="M1 8h27" pathLength={1} stroke="currentColor" strokeWidth="1.5" className="x-draw" style={S(i * 2)} />
                  <path d="M23 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ) : null}
            <a
              href={`#${p.id}`}
              className="x-rise x-node group flex items-center gap-3 rounded-lg border border-line bg-paper p-4 transition-colors hover:border-accent-ink"
              style={S(i * 2)}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-accent/15 text-accent-ink">
                <Icon name={ICONS[p.id] ?? 'layers'} className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="eyebrow block">{p.label}</span>
                <span className="mt-1 block font-heading font-semibold text-ink">{p.name.split(' — ')[0]}</span>
                <span className="block text-xs text-ink-muted">{p.items.length} capabilities</span>
              </span>
            </a>
          </li>
        ))}
      </ol>
      <div aria-hidden className="mx-[16%] hidden h-4 border-x border-dashed border-accent-ink/50 lg:block" />
      <a
        href={`#${base.id}`}
        className="x-rise mt-3 flex items-center justify-center gap-3 rounded-lg border border-accent/40 bg-accent/10 px-4 py-3 transition-colors hover:border-accent-ink lg:mt-0"
        style={S(7)}
      >
        <Icon name={ICONS[base.id] ?? 'chart'} className="size-5 text-accent-ink" />
        <span className="eyebrow">{base.label}</span>
        <span className="font-heading font-semibold text-ink">{base.name.split(' — ')[0]}</span>
      </a>
    </InView>
  );
}
