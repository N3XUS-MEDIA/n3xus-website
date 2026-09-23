import type { Metadata } from 'next';
import { PageHero } from '@/ui/layout/PageHero';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { Button } from '@/ui/primitives/Button';
import { RETAINER_AREAS } from '@/content/retainerModules';
import { site } from '@/content/copy';

/**
 * Moved from /pricing to /retainers on 2026-09-23.
 *
 * The page stopped being about prices on 2026-09-18 and an address reading
 * /pricing on a page with no prices misleads people before they arrive.
 * "Services" was not available: /services is the What we do hub, whose
 * capability catalogue already covers the same ground from the other
 * direction — what we can do, rather than what a monthly retainer is built
 * from. Those are different enough to stay two pages.
 *
 * /pricing 308-redirects here (next.config.ts) so the indexing it earned
 * carries over rather than being thrown away, and the word "pricing" stays in
 * the description because that is still what people type when they are close
 * to buying.
 */
export const metadata: Metadata = {
  title: 'Retainers',
  description:
    'How N3XUS retainers are put together — a Website OS base plus the visibility, social, AI and paid-media modules your business needs. Pricing is quoted per business after a conversation.',
  alternates: { canonical: '/retainers' },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Retainers"
        title="Build the retainer your business actually needs."
        lede="Every build starts on the same Website OS base — the engine that routes leads, holds your data and keeps the lights on. Everything above it is modular: you take only what you need. We quote it once we understand what that is."
      />

      {RETAINER_AREAS.map((area, i) => (
        <Section key={area.id} size="sm" tone={i % 2 ? 'mist' : 'paper'} bordered>
          <SectionHeading title={area.name} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {area.modules.map((m) => (
              <li key={m.id} className="rounded-lg border border-line bg-paper p-6">
                <h3 className="text-lg text-ink">{m.name}</h3>
                {m.required ? (
                  <p className="mt-1 text-sm font-medium text-accent-ink">Included in every retainer</p>
                ) : null}
                <p className="mt-3 leading-relaxed text-ink-muted">{m.scope}</p>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section tone="carbon">
        <SectionHeading
          onCarbon
          title="Get a price for your business."
          lede="Tell us what you need and we will come back with a monthly figure for exactly that — no packages to squeeze into."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={site.bookingUrl} {...site.bookingLinkProps}>
              Ask for a quote
            </a>
          </Button>
        </div>
      </Section>
    </>
  );
}
