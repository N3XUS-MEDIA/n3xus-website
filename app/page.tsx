import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/ui/layout/Container';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { Button } from '@/ui/primitives/Button';
import { FaqList } from '@/ui/marketing/FaqList';
import { EnquiryPanel } from '@/ui/marketing/EnquiryPanel';
import { JsonLd } from '@/ui/seo/JsonLd';
import { AUDIT_LIVE, ctas, site } from '@/content/copy';
import { auditHomeBand } from '@/content/audit';
import { AuditForm } from '@/ui/audit/AuditForm';
import { CLAIMS } from '@/content/about';
import {
  audiences,
  closing,
  comparison,
  core3,
  hero,
  intelligence,
  problem,
  process,
  websiteOs,
  whatWeDo,
} from '@/content/home';
import { CoreSystem } from '@/ui/explainers/CoreSystem';
import { ProcessRail } from '@/ui/explainers/ProcessRail';
import { ScatteredVsConnected } from '@/ui/explainers/ScatteredVsConnected';
import { WebsiteOsHub } from '@/ui/explainers/WebsiteOsHub';
import { faqLd, organisationLd, serviceLd, visibleFaqs, websiteLd } from '@/content/structuredData';

export const metadata: Metadata = {
  title: 'N3XUS — Full-Service Marketing Agency | Social, TV, Web Systems',
  description:
    'N3XUS is a full-service marketing agency working across strategy, intelligence and growth. We work out what’s holding your business back, build the systems to fix it, and bring you the customers.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const faqs = visibleFaqs();
  const cards = whatWeDo.cards.filter((c) => !c.claim || CLAIMS[c.claim]);

  return (
    <>
      <JsonLd data={organisationLd()} />
      <JsonLd data={websiteLd()} />
      <JsonLd data={faqLd(faqs)} />
      {/* One Service entity per discipline, each carrying areaServed — this is
          what a geographic service query actually matches against. */}
      {serviceLd().map((svc) => (
        <JsonLd key={String(svc['@id'])} data={svc} />
      ))}

      {/* Hero — hand-rolled rather than <Section>, for the gradient and the
          asymmetric grid. Everything below it uses the shared primitives. */}
      <div className="border-b border-line bg-gradient-to-b from-mist/60 via-paper to-paper">
        <Container width="wide">
          <div className="grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1 className="mt-4 text-4xl text-ink sm:text-5xl lg:text-6xl">{hero.title}</h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted sm:text-xl">{hero.lede}</p>
              <p className="mt-4 leading-relaxed text-ink-muted">{hero.sub}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={site.bookingUrl} {...site.bookingLinkProps}>
                    {ctas.book}
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/services">See how it works</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-8">
              <CoreSystem
                layers={core3.layers.map((layer, i) => ({
                  n: layer.n,
                  name: layer.title.split(' — ')[0] ?? layer.title,
                  sub: layer.title.split(' — ')[1] ?? '',
                  icon: (['compass', 'layers', 'megaphone'] as const)[i] ?? 'compass',
                }))}
                loopLabel={hero.system.loopLabel}
                summary={hero.system.summary}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Two doors.
          People decide in seconds whether a firm is "for them", and the fastest
          way to lose someone is to make them translate your positioning into
          their own situation. So: two situations, plainly described, and they
          point at theirs. Both lead to the same first step. */}
      <Section tone="mist" bordered size="sm">
        <SectionHeading eyebrow={audiences.eyebrow} title={audiences.title} />
        <ul className="mt-8 grid gap-px overflow-hidden rounded-lg bg-line md:grid-cols-2">
          {audiences.doors.map((door) => (
            <li key={door.label} className="flex flex-col bg-paper p-6 sm:p-8">
              <h3 className="text-xl text-ink">“{door.label}”</h3>
              <p className="mt-4 flex-1 leading-relaxed text-ink-muted">{door.body}</p>
              <Link
                href={door.href}
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-medium text-accent-ink underline underline-offset-4 hover:no-underline"
              >
                {door.cta}
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* The free audit — the lowest-commitment door on the page, for someone
          not ready to talk yet. Off until launch; see AUDIT_LIVE. */}
      {AUDIT_LIVE ? (
        <Section size="sm">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow={auditHomeBand.eyebrow} title={auditHomeBand.title} lede={auditHomeBand.lede} />
            </div>
            <div className="lg:col-span-7">
              <AuditForm id="audit-url-home" />
            </div>
          </div>
        </Section>
      ) : null}

      {/* The one place the page raises its voice. */}
      <Section tone="carbon">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-on-carbon">{problem.eyebrow}</p>
          <h2 className="mt-4 text-3xl text-on-carbon sm:text-4xl">{problem.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-on-carbon/75">{problem.lede}</p>
        </div>

        <ScatteredVsConnected
          {...problem.diagram}
          before={comparison.before}
          after={comparison.after}
        />
      </Section>

      <Section>
        <SectionHeading eyebrow={core3.eyebrow} title={core3.title} lede={core3.lede} />
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg bg-line lg:grid-cols-3">
          {core3.layers.map((layer) => (
            <li key={layer.n} className="flex flex-col bg-paper p-6 sm:p-8">
              <p className="font-heading text-sm font-bold text-accent-ink">{layer.n}</p>
              <h3 className="mt-3 text-lg text-ink">{layer.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{layer.body}</p>
              <Link
                href={layer.href}
                className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-accent-ink underline underline-offset-4 hover:no-underline"
              >
                {layer.linkLabel}
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="mist" bordered>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={websiteOs.eyebrow} title={websiteOs.title} lede={websiteOs.lede} />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/services/website-os">Explore Website OS</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/retainers">{ctas.buildRetainer}</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <WebsiteOsHub
              centre={websiteOs.centre}
              items={websiteOs.items}
              summary={websiteOs.summary}
            />
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={whatWeDo.eyebrow} title={whatWeDo.title} lede={whatWeDo.lede} />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <li key={card.title} className="flex flex-col bg-paper p-6">
              <h3 className="text-base text-ink">{card.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{card.body}</p>
              <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-accent-ink">
                {card.outcome}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button asChild variant="secondary">
            <Link href="/services">See every solution and what it’s worth</Link>
          </Button>
        </div>
      </Section>

      <Section tone="mist" bordered>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow={intelligence.eyebrow}
              title={intelligence.title}
              lede={intelligence.lede}
            />
            <div className="mt-8">
              <Button asChild variant="secondary">
                <Link href="/intelligence">Explore N3XUS Intelligence</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <ul className="divide-y divide-line border-y border-line">
              {intelligence.points.map((point) => (
                <li key={point} className="py-4 leading-relaxed text-ink-muted">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={process.eyebrow} title={process.title} />
        <ProcessRail steps={process.steps} summary={process.summary} />
      </Section>

      <Section tone="mist" bordered width="default">
        <SectionHeading eyebrow="FAQ" title="Common questions." />
        <FaqList items={faqs} />
      </Section>

      <Section>
        <EnquiryPanel eyebrow={closing.eyebrow} title={closing.title} lede={closing.lede} />
      </Section>
    </>
  );
}
