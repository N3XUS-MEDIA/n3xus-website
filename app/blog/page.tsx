import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/ui/layout/PageHero';
import { Section } from '@/ui/layout/Section';
import { articlesByDate } from '@/content/blog';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Writing on AI marketing, generative engine optimisation, AI systems, broadcast and the Core3 framework.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Growth intelligence."
        lede="What we have worked out about AI visibility, automation and integrated growth — written for the person who has to decide, not for a keyword."
      />

      <Section>
        <ul className="divide-y divide-line border-y border-line">
          {articlesByDate.map((article) => (
            <li key={article.slug}>
              <Link href={`/blog/${article.slug}`} className="group block py-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="eyebrow">{article.category}</span>
                  <span aria-hidden className="text-line">
                    ·
                  </span>
                  <span className="text-sm text-ink-muted">{article.displayDate}</span>
                  <span aria-hidden className="text-line">
                    ·
                  </span>
                  <span className="text-sm text-ink-muted">
                    {article.readingMinutes} min read
                  </span>
                </div>

                <h2 className="mt-3 text-2xl text-ink group-hover:text-accent-ink sm:text-3xl">
                  {article.title}
                </h2>

                <p className="mt-3 max-w-3xl leading-relaxed text-ink-muted">
                  {article.standfirst}
                </p>

                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-ink">
                  Read
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
