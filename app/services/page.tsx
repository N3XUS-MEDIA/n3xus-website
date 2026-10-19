import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/ui/layout/PageHero';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { Button } from '@/ui/primitives/Button';
import { CapabilityGrid } from '@/ui/marketing/CapabilityGrid';
import { PillarMap } from '@/ui/explainers/PillarMap';
import { ProblemRouter } from '@/ui/explainers/ProblemRouter';
import { CLAIMS } from '@/content/about';
import { ctas, site } from '@/content/copy';
import {
  compounding,
  intelligenceLayer,
  layers,
  painPoints,
  principles,
  servicesClosing,
  servicesHero,
} from '@/content/services';

export const metadata: Metadata = {
  title: 'What we do',
  description:
    'Everything we do across strategy, intelligence and growth — and what each part is actually for.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  const visiblePrinciples = principles.filter((p) => !p.claim || CLAIMS[p.claim]);

  return (
    <>
      <PageHero
        eyebrow={servicesHero.eyebrow}
        title={servicesHero.title}
        lede={servicesHero.lede}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={site.bookingUrl} {...site.bookingLinkProps}>
              Book a consultation
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="#strategy">See all three pillars</Link>
          </Button>
        </div>
      </PageHero>

      <Section tone="mist" bordered>
        <SectionHeading
          eyebrow="Start where it hurts"
          title="Which of these is true for you right now?"
          lede="You don’t need to know what to call the solution. You only need to know what’s broken."
        />

        <ProblemRouter
          points={painPoints}
          summary="A list of seven common problems. Choosing one shows which of the three pillars — strategy, intelligence or growth — it belongs to, what it usually looks like, and the page to read next."
        />
      </Section>

      <Section size="sm">
        <SectionHeading
          eyebrow="The full catalogue"
          title="Everything across the three disciplines."
          lede="Strategy decides what to fix. Technology builds it. Growth feeds it. Every item below carries the outcome it produces, because a capability nobody can value is just a line on an invoice."
        />
        <PillarMap pillars={layers.slice(0, 3)} base={intelligenceLayer} />
      </Section>

      {layers.map((layer, i) => (
        <CapabilityGrid
          key={layer.id}
          layer={layer}
          tone={i % 2 === 0 ? 'paper' : 'mist'}
          bordered={i % 2 === 1}
        />
      ))}

      <CapabilityGrid layer={intelligenceLayer} tone="mist" bordered />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={compounding.eyebrow} title={compounding.title} />
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">{compounding.body}</p>
          </div>

          <div className="lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              {visiblePrinciples.map((p) => (
                <div key={p.title} className="py-5">
                  <dt className="font-heading font-semibold text-ink">{p.title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="mist" bordered>
        <div className="rounded-lg bg-carbon p-8 sm:p-12">
          <SectionHeading
            onCarbon
            eyebrow={servicesClosing.eyebrow}
            title={servicesClosing.title}
            lede={servicesClosing.lede}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={site.bookingUrl} {...site.bookingLinkProps}>
                {ctas.book}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="border-on-carbon/25 bg-transparent text-on-carbon hover:bg-on-carbon/10"
            >
              <Link href="/contact">Send us the problem</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
