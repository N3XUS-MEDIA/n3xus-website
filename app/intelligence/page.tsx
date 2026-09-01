import type { Metadata } from 'next';
import { PageHero } from '@/ui/layout/PageHero';
import { Button } from '@/ui/primitives/Button';
import { Blocks } from '@/ui/marketing/Blocks';
import { JsonLd } from '@/ui/seo/JsonLd';
import { intelligencePage as page } from '@/content/intelligence';
import { breadcrumbLd } from '@/content/structuredData';
import { site } from '@/content/copy';

export const metadata: Metadata = {
  title: 'N3XUS Intelligence',
  description:
    'One dashboard connecting broadcast reach, digital conversions, social performance and AI interactions — with attribution that shows which channel actually produced revenue.',
  alternates: { canonical: '/intelligence' },
};

export default function IntelligencePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'N3XUS Intelligence', path: '/intelligence' },
        ])}
      />

      <PageHero eyebrow={page.eyebrow} title={page.title} lede={page.lede}>
        <Button asChild size="lg">
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
            Request a demo
          </a>
        </Button>
      </PageHero>

      <Blocks blocks={page.blocks} />
    </>
  );
}
