import type { Metadata } from 'next';
import { PageHero } from '@/ui/layout/PageHero';
import { Button } from '@/ui/primitives/Button';
import { Blocks } from '@/ui/marketing/Blocks';
import { JsonLd } from '@/ui/seo/JsonLd';
import { dstvStreamPage as page } from '@/content/services/dstv-stream';
import { breadcrumbLd, faqLd } from '@/content/structuredData';
import { site } from '@/content/copy';

export const metadata: Metadata = {
  title: 'DStv Stream Advertising',
  description:
    'Reach South Africa’s connected-TV audience across live sport, local drama and catch-up, with formats matched to viewing intent and every view tracked back to your funnel.',
  alternates: { canonical: '/services/dstv-stream' },
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
          { name: 'DStv Stream Advertising', path: '/services/dstv-stream' },
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
