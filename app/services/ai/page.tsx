import type { Metadata } from 'next';
import { PageHero } from '@/ui/layout/PageHero';
import { Button } from '@/ui/primitives/Button';
import { Blocks } from '@/ui/marketing/Blocks';
import { JsonLd } from '@/ui/seo/JsonLd';
import { aiPage as page } from '@/content/services/ai';
import { breadcrumbLd, faqLd } from '@/content/structuredData';
import { site } from '@/content/copy';

export const metadata: Metadata = {
  title: 'AI & LLM Development',
  description:
    'LLM applications, RAG knowledge bases, autonomous AI agents and custom AI software — production-grade systems built on Claude, GPT-4o, Gemini and open-source models.',
  alternates: { canonical: '/services/ai' },
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
          { name: 'AI & LLM Development', path: '/services/ai' },
        ])}
      />

      <PageHero eyebrow={page.eyebrow} title={page.title} lede={page.lede}>
        <Button asChild size="lg">
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
            Book a strategy call
          </a>
        </Button>
      </PageHero>

      <Blocks blocks={blocks} />
    </>
  );
}
