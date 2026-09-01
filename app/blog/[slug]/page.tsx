import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/ui/layout/Container';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { Button } from '@/ui/primitives/Button';
import { JsonLd } from '@/ui/seo/JsonLd';
import { articles, findArticle, relatedTo, type ArticleBlock } from '@/content/blog';
import { breadcrumbLd } from '@/content/structuredData';
import { ctas, site } from '@/content/copy';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.standfirst.slice(0, 155),
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.standfirst.slice(0, 155),
      publishedTime: article.published,
    },
  };
}

/** Consecutive <li> blocks are gathered back into one list. */
type Group = { kind: 'ul'; items: string[] } | { kind: ArticleBlock['kind']; text: string };

function group(blocks: ArticleBlock[]): Group[] {
  const out: Group[] = [];
  for (const b of blocks) {
    if (b.kind === 'li') {
      const last = out[out.length - 1];
      if (last && last.kind === 'ul') last.items.push(b.text);
      else out.push({ kind: 'ul', items: [b.text] });
    } else {
      out.push({ kind: b.kind, text: b.text });
    }
  }
  return out;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const related = relatedTo(slug);
  const [standfirst, ...rest] = article.blocks;

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.standfirst,
          datePublished: article.published,
          articleSection: article.category,
          author: { '@type': 'Organization', name: site.name },
          publisher: { '@type': 'Organization', name: site.name },
          mainEntityOfPage: `${site.url}/blog/${article.slug}`,
        }}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/blog' },
          { name: article.title, path: `/blog/${article.slug}` },
        ])}
      />

      <div className="border-b border-line bg-gradient-to-b from-mist/60 to-paper">
        <Container width="narrow">
          <div className="py-14 sm:py-20">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Link href="/blog" className="eyebrow hover:text-accent-ink">
                Insights
              </Link>
              <span aria-hidden className="text-line">
                ·
              </span>
              <span className="eyebrow">{article.category}</span>
            </div>

            <h1 className="mt-4 text-3xl text-ink sm:text-4xl lg:text-5xl">{article.title}</h1>

            <p className="mt-5 text-sm text-ink-muted">
              <time dateTime={article.published}>{article.displayDate}</time>
              {' · '}
              {article.readingMinutes} min read
            </p>
          </div>
        </Container>
      </div>

      <Section width="narrow">
        <p className="text-xl leading-relaxed text-ink">{standfirst.text}</p>

        <div className="longform mt-10">
          {group(rest).map((g, i) => {
            if (g.kind === 'ul') {
              return (
                <ul key={i}>
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (g.kind === 'h2') return <h2 key={i}>{g.text}</h2>;
            if (g.kind === 'h3') return <h3 key={i}>{g.text}</h3>;
            return <p key={i}>{g.text}</p>;
          })}
        </div>
      </Section>

      <Section tone="mist" bordered width="narrow">
        <div className="rounded-lg bg-carbon p-8 sm:p-10">
          <SectionHeading
            onCarbon
            eyebrow="Next step"
            title="Ready to put this into practice?"
            lede="Book a consultation and we will map where this applies to your business — and you keep the findings either way."
          />
          <div className="mt-8">
            <Button asChild size="lg">
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                {ctas.book}
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {related.length ? (
        <Section width="narrow">
          <SectionHeading title="Read next." />
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="group block py-6">
                  <span className="eyebrow">{r.category}</span>
                  <span className="mt-2 block text-lg text-ink group-hover:text-accent-ink">
                    {r.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
