import Link from 'next/link';
import { Container } from '@/ui/layout/Container';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { Button } from '@/ui/primitives/Button';
import { ctas, site } from '@/content/copy';

/**
 * PLACEHOLDER — the real homepage is step 4 of the migration order and is
 * ported from the 731-line index.html. This exists so the app has a root
 * route while the design system is being verified.
 */
export default function HomePage() {
  return (
    <>
      <div className="bg-gradient-to-b from-mist/60 via-paper to-paper">
        <Container width="wide">
          <div className="grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">Automated growth &amp; AI infrastructure</p>
              <h1 className="mt-4 text-4xl text-ink sm:text-5xl lg:text-6xl">
                Stop letting scattered systems limit your growth.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-muted sm:text-xl">
                Enquiries sit unanswered, quotes go out late, and nobody can prove what is working.
                We connect the tools your business runs on into one system, then build the demand
                and the brand that feed it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                    {ctas.book}
                  </a>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/pricing">{ctas.buildRetainer}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Section tone="mist" bordered>
        <SectionHeading
          eyebrow="Placeholder"
          title="The rest of this page is still being ported."
          lede="The design system, header, footer, theme toggle and the pricing builder are live. The full homepage follows once the look is signed off."
        />
        <div className="mt-8">
          <Button asChild variant="secondary">
            <Link href="/pricing">See the retainer builder</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
