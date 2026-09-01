import type { Metadata } from 'next';
import { PageHero } from '@/ui/layout/PageHero';
import { Button } from '@/ui/primitives/Button';
import { Blocks } from '@/ui/marketing/Blocks';
import { JsonLd } from '@/ui/seo/JsonLd';
import { strategyPage as page } from '@/content/services/strategy';
import { breadcrumbLd, faqLd } from '@/content/structuredData';
import { site } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Strategy & advisory',
  description:
    'A diagnostic that maps how your business actually operates, quantifies where it leaks revenue, and sequences the fixes — with every recommendation costed.',
  alternates: { canonical: '/services/strategy' },
};

export default function StrategyPage() {
  const blocks = page.blocks.map((b) =>
    b.type === 'faq' ? { ...b, items: page.faqs ?? [] } : b,
  );

  return (
    <>
      {page.faqs?.length ? <JsonLd data={faqLd(page.faqs)} /> : null}
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'What we do', path: '/services' },
          { name: 'Strategy', path: '/services/strategy' },
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
