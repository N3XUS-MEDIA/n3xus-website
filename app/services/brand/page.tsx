import type { Metadata } from 'next';
import { PageHero } from '@/ui/layout/PageHero';
import { Button } from '@/ui/primitives/Button';
import { Blocks } from '@/ui/marketing/Blocks';
import { JsonLd } from '@/ui/seo/JsonLd';
import { brandPage as page } from '@/content/services/brand';
import { breadcrumbLd, faqLd } from '@/content/structuredData';
import { site } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Brand & Market Presence',
  description:
    'Brand identity, television and streaming campaigns, video production, activations and sponsorship — planned to connect to your digital acquisition, not run beside it.',
  alternates: { canonical: '/services/brand' },
};

export default function Page() {
  // The FAQ block is declared empty in the content file so the questions live
  // in one place and also feed the JSON-LD.
  const blocks = page.blocks.map((b) =>
    b.type === 'faq' ? { ...b, items: page.faqs ?? [] } : b,
  );

  return (
    <>
      {page.faqs?.length ? <JsonLd data={faqLd(page.faqs)} /> : null}
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: 'Brand & Market Presence', path: '/services/brand' },
        ])}
      />

      <PageHero eyebrow={page.eyebrow} title={page.title} lede={page.lede}>
        <Button asChild size="lg">
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
            Book a consultation
          </a>
        </Button>
      </PageHero>

      <Blocks blocks={blocks} />
    </>
  );
}
