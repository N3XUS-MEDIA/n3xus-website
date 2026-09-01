import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/ui/layout/Container';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { Button } from '@/ui/primitives/Button';
import { FaqList } from '@/ui/marketing/FaqList';
import { JsonLd } from '@/ui/seo/JsonLd';
import { ctas, site } from '@/content/copy';
import { CLAIMS } from '@/content/about';
import {
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
import { faqLd, organisationLd, visibleFaqs, websiteLd } from '@/content/structuredData';

export const metadata: Metadata = {
  title: 'N3XUS — Strategy, technology and growth',
  description:
    'A consultancy working across strategy, technology and growth — the three disciplines most businesses buy separately and then struggle to connect.',
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
                  <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                    {ctas.book}
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/services">See how it works</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-8">
              <dl className="divide-y divide-line border-y border-line">
                {core3.layers.map((layer) => (
                  <div key={layer.n} className="py-5">
                    <dt className="flex items-baseline gap-3">
                      <span className="font-heading text-sm font-bold text-accent-ink">
                        {layer.n}
                      </span>
                      <span className="font-heading font-semibold text-ink">
                        {layer.title.split(' — ')[0]}
                      </span>
                    </dt>
                    <dd className="mt-1.5 pl-8 text-sm text-ink-muted">
                      {layer.title.split(' — ')[1]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </div>

      {/* The one place the page raises its voice. */}
      <Section tone="carbon">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow-on-carbon">{problem.eyebrow}</p>
          <h2 className="mt-4 text-3xl text-on-carbon sm:text-4xl">{problem.title}</h2>
          {problem.paragraphs.map((p) => (
            <p key={p} className="mt-5 text-lg leading-relaxed text-on-carbon/75">
              {p}
            </p>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-px overflow-hidden rounded-lg bg-on-carbon/15 sm:grid-cols-2">
          <div className="bg-carbon p-6">
            <p className="eyebrow-on-carbon">{comparison.before.label}</p>
            <ul className="mt-4 space-y-3">
              {comparison.before.rows.map(([label, note]) => (
                <li key={label} className="text-on-carbon/70">
                  <span className="text-on-carbon">{label}</span>
                  {note ? <span className="text-on-carbon/65"> — {note}</span> : null}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-carbon-light p-6">
            <p className="eyebrow-on-carbon">{comparison.after.label}</p>
            <ul className="mt-4 space-y-3">
              {comparison.after.rows.map(([label]) => (
                <li key={label} className="text-on-carbon">
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
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
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={websiteOs.eyebrow} title={websiteOs.title} />
            <div className="longform mt-8">
              {websiteOs.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/services/website-os">Explore Website OS</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/pricing">{ctas.buildRetainer}</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ul className="space-y-4">
              {websiteOs.points.map((point) => (
                <li key={point} className="flex gap-3 text-ink-muted">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 size-4 shrink-0 text-accent-ink"
                    aria-hidden
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
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
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step) => (
            <li key={step.n} className="bg-paper p-6">
              <p className="font-heading text-sm font-bold text-accent-ink">{step.n}</p>
              <h3 className="mt-3 text-lg text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="mist" bordered width="default">
        <SectionHeading eyebrow="FAQ" title="Common questions." />
        <FaqList items={faqs} />
      </Section>

      <Section>
        <div className="rounded-lg bg-carbon p-8 sm:p-12">
          <SectionHeading
            onCarbon
            eyebrow={closing.eyebrow}
            title={closing.title}
            lede={closing.lede}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                {ctas.book}
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
