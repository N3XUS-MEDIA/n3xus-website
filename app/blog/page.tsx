import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/ui/layout/PageHero';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { articlesByPillar, INTENT_LABEL, PILLAR_LABEL, type Article } from '@/content/blog';
import { PILLARS } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Practical answers to the questions business owners actually ask — what to fix first, why a website isn’t producing leads, and how to get found by AI assistants.',
  alternates: { canonical: '/blog' },
};

function ArticleRow({ article }: { article: Article }) {
  return (
    <li>
      <Link href={`/blog/${article.slug}`} className="group block py-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="eyebrow">{INTENT_LABEL[article.intent]}</span>
          <span aria-hidden className="text-line">
            ·
          </span>
          <span className="text-sm text-ink-muted">{article.readingMinutes} min read</span>
          {article.market === 'za' ? (
            <>
              <span aria-hidden className="text-line">
                ·
              </span>
              <span className="rounded-sm bg-mist px-1.5 py-0.5 text-xs font-medium text-ink-muted">
                South Africa
              </span>
            </>
          ) : null}
        </div>

        <h3 className="mt-2 text-xl text-ink group-hover:text-accent-ink sm:text-2xl">
          {article.title}
        </h3>
        <p className="mt-2 max-w-3xl leading-relaxed text-ink-muted">{article.standfirst}</p>
      </Link>
    </li>
  );
}

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Straight answers to the questions people actually ask us."
        lede="No thought leadership. These are the questions that come up on first calls — what to fix first, why the website isn’t producing enquiries, whether to build or buy — answered the way we’d answer them on the phone."
      />

      {/* Grouped by discipline rather than date. Somebody arriving with a
          problem is looking for the cluster it belongs to, not the newest
          thing published. */}
      {PILLARS.map((pillar, i) => {
        const posts = articlesByPillar(pillar.id as never);
        if (!posts.length) return null;

        return (
          <Section
            key={pillar.id}
            tone={i % 2 === 1 ? 'mist' : 'paper'}
            bordered={i % 2 === 1}
            id={pillar.id}
          >
            <SectionHeading
              eyebrow={`${pillar.n} · ${PILLAR_LABEL[pillar.id as never]}`}
              title={pillar.summary}
            />
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {posts.map((article) => (
                <ArticleRow key={article.slug} article={article} />
              ))}
            </ul>
          </Section>
        );
      })}
    </>
  );
}
