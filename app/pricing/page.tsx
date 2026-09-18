import type { Metadata } from 'next';
import { PageHero } from '@/ui/layout/PageHero';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { Button } from '@/ui/primitives/Button';
import { RETAINER_AREAS } from '@/content/retainerModules';
import { site } from '@/content/copy';

/**
 * Kept at /pricing, deliberately, even with no prices on it.
 *
 * The URL has been submitted to Search Console and requested for indexing, and
 * "pricing" is what people search for when they are close to buying. Moving it
 * would throw that away. What changed on 2026-09-18 is what it says: the
 * modules and what each one does, and that the figure is quoted per business.
 */
export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'How N3XUS retainers are put together — a Website OS base plus the visibility, social, AI and paid-media modules your business needs. Pricing is quoted per business after a conversation.',
  alternates: { canonical: '/pricing' },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
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
