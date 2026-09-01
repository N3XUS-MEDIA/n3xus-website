import type { Metadata } from 'next';
import { PageHero } from '@/ui/layout/PageHero';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { Button } from '@/ui/primitives/Button';
import { Blocks } from '@/ui/marketing/Blocks';
import { LeakCalculator } from '@/ui/marketing/LeakCalculator';
import { JsonLd } from '@/ui/seo/JsonLd';
import { websiteOsPage as page } from '@/content/services/website-os';
import { breadcrumbLd, faqLd } from '@/content/structuredData';
import { site } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Website Operating System',
  description:
    'Turn your website into the system your business runs on: bookings, quotes, payments, CRM, portals, AI agents and live reporting behind one front door.',
  alternates: { canonical: '/services/website-os' },
};

export default function WebsiteOsPage() {
  // The FAQ block is a placeholder in the content file; fill it here so the
  // questions live in one place and also feed the JSON-LD.
  const blocks = page.blocks.map((b) =>
    b.type === 'faq' ? { ...b, items: page.faqs ?? [] } : b,
  );

  return (
    <>
      <JsonLd data={faqLd(page.faqs ?? [])} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Website Operating System', path: '/services/website-os' },
        ])}
      />

      <PageHero eyebrow={page.eyebrow} title={page.title} lede={page.lede}>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book a website audit
            </a>
          </Button>
        </div>
      </PageHero>

      {/* The calculator sits early, right after the problem is named — it is
          the section that makes the cost concrete before any feature list. */}
      <Section tone="mist" bordered>
        <SectionHeading
          eyebrow="The cost of leaving it"
          title="Doing nothing is not the free option."
          lede="The manual version of your business already has a price — it’s just paid in staff hours and enquiries that go cold, so it never appears on an invoice. Put your own numbers in and see it."
        />
        <div className="mt-10">
          <LeakCalculator />
        </div>
      </Section>

      <Blocks blocks={blocks} />
    </>
  );
}
