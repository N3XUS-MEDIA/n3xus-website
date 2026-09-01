import type { Metadata } from 'next';
import { PageHero } from '@/ui/layout/PageHero';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { Button } from '@/ui/primitives/Button';
import { site } from '@/content/copy';
import {
  CLAIMS,
  aboutHero,
  closing,
  differentiators,
  industries,
  mission,
  missionFacts,
  missionFactsPendingConfirmation,
} from '@/content/about';

export const metadata: Metadata = {
  title: 'About',
  description:
    'N3XUS Media connects traditional marketing, digital marketing and AI into one system through the Core3 framework.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const facts = [
    ...missionFacts,
    ...missionFactsPendingConfirmation.filter((f) => CLAIMS[f.claim]),
  ];

  const visibleDifferentiators = differentiators.filter((d) => !d.claim || CLAIMS[d.claim]);

  return (
    <>
      <PageHero eyebrow={aboutHero.eyebrow} title={aboutHero.title} lede={aboutHero.lede} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={mission.eyebrow} title={mission.title} />
            <div className="longform mt-8">
              {mission.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              {facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-6 py-5">
                  <dt className="text-sm text-ink-muted">{fact.label}</dt>
                  <dd className="font-heading text-2xl font-bold text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="mist" bordered>
        <SectionHeading eyebrow="Why N3XUS" title="What makes us different." />

        {/* gap-px on a line-coloured ground draws the hairline grid without
            doubling borders where cells meet. */}
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2 lg:grid-cols-3">
          {visibleDifferentiators.map((item) => (
            <li key={item.n} className="bg-paper p-6 sm:p-8">
              <p className="font-heading text-sm font-bold text-accent-ink">{item.n}</p>
              <h3 className="mt-3 text-lg text-ink">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Who we serve"
          title="Clients across industries, worldwide."
          lede="N3XUS Media serves businesses from startups to enterprise, locally and internationally."
        />
        <ul className="mt-8 flex flex-wrap gap-2">
          {industries.map((industry) => (
            <li
              key={industry}
              className="rounded-md border border-line px-4 py-2 text-sm text-ink-muted"
            >
              {industry}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" bordered>
        <div className="rounded-lg bg-carbon p-8 sm:p-12">
          <SectionHeading
            onCarbon
            eyebrow={closing.eyebrow}
            title={closing.title}
            lede={CLAIMS.freeAudit ? closing.ledeWithAudit : closing.lede}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book a strategy call
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="border-on-carbon/25 bg-transparent text-on-carbon hover:bg-on-carbon/10"
            >
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
