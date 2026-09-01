import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { Button } from '@/ui/primitives/Button';
import { FaqList } from '@/ui/marketing/FaqList';
import { site } from '@/content/copy';
import type { Block } from '@/content/blocks';

const COLUMNS = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const;

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 size-4 shrink-0 text-accent-ink"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * Renders one block. Tone alternation is decided by the caller so a page can
 * break the rhythm deliberately (a carbon band two sections running, say)
 * without every block needing to know where it sits.
 */
export function BlockRenderer({
  block,
  tone,
  bordered,
}: {
  block: Block;
  tone: 'paper' | 'mist' | 'carbon';
  bordered: boolean;
}) {
  const onCarbon = tone === 'carbon';

  switch (block.type) {
    case 'prose':
      return (
        <Section tone={tone} bordered={bordered}>
          <div className={block.points ? 'grid gap-12 lg:grid-cols-12 lg:gap-16' : undefined}>
            <div className={block.points ? 'lg:col-span-7' : undefined}>
              <SectionHeading eyebrow={block.eyebrow} title={block.title} onCarbon={onCarbon} />
              <div className={cn('mt-8', !onCarbon && 'longform')}>
                {block.paragraphs.map((p) => (
                  <p
                    key={p}
                    className={
                      onCarbon ? 'mt-5 text-lg leading-relaxed text-on-carbon/75' : undefined
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {block.points ? (
              <div className="lg:col-span-5">
                <ul className="space-y-4">
                  {block.points.map((point) => (
                    <li
                      key={point}
                      className={cn('flex gap-3', onCarbon ? 'text-on-carbon/75' : 'text-ink-muted')}
                    >
                      <Check />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </Section>
      );

    case 'features':
      return (
        <Section tone={tone} bordered={bordered}>
          <SectionHeading
            eyebrow={block.eyebrow}
            title={block.title}
            lede={block.lede}
            onCarbon={onCarbon}
          />
          <ul
            className={cn(
              'mt-10 grid gap-px overflow-hidden rounded-lg',
              onCarbon ? 'bg-on-carbon/15' : 'bg-line',
              COLUMNS[block.columns ?? 3],
            )}
          >
            {block.items.map((item) => (
              <li
                key={item.title}
                className={cn('flex flex-col p-6', onCarbon ? 'bg-carbon' : 'bg-paper')}
              >
                <h3 className={cn('text-lg', onCarbon ? 'text-on-carbon' : 'text-ink')}>
                  {item.title}
                </h3>
                <p
                  className={cn(
                    'mt-3 flex-1 leading-relaxed',
                    onCarbon ? 'text-on-carbon/70' : 'text-ink-muted',
                  )}
                >
                  {item.body}
                </p>
                {item.outcome ? (
                  <p
                    className={cn(
                      'mt-5 border-t pt-4 text-sm font-medium',
                      onCarbon ? 'border-on-carbon/15 text-accent' : 'border-line text-accent-ink',
                    )}
                  >
                    {item.outcome}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      );

    case 'process':
      return (
        <Section tone={tone} bordered={bordered}>
          <SectionHeading
            eyebrow={block.eyebrow}
            title={block.title}
            lede={block.lede}
            onCarbon={onCarbon}
          />
          <ol
            className={cn(
              'mt-10 grid gap-px overflow-hidden rounded-lg sm:grid-cols-2',
              block.steps.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3',
              onCarbon ? 'bg-on-carbon/15' : 'bg-line',
            )}
          >
            {block.steps.map((step) => (
              <li key={step.n} className={cn('p-6', onCarbon ? 'bg-carbon' : 'bg-paper')}>
                <p className="font-heading text-sm font-bold text-accent-ink">{step.n}</p>
                <h3 className={cn('mt-3 text-lg', onCarbon ? 'text-on-carbon' : 'text-ink')}>
                  {step.title}
                </h3>
                <p
                  className={cn(
                    'mt-3 text-sm leading-relaxed',
                    onCarbon ? 'text-on-carbon/70' : 'text-ink-muted',
                  )}
                >
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      );

    case 'chips':
      return (
        <Section tone={tone} bordered={bordered} size="sm">
          <SectionHeading
            eyebrow={block.eyebrow}
            title={block.title}
            lede={block.lede}
            onCarbon={onCarbon}
          />
          <ul className="mt-8 flex flex-wrap gap-2">
            {block.items.map((item) => (
              <li
                key={item}
                className={cn(
                  'rounded-md border px-4 py-2 text-sm',
                  onCarbon
                    ? 'border-on-carbon/20 text-on-carbon/80'
                    : 'border-line text-ink-muted',
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>
      );

    case 'stats':
      // A figure without a stated source does not ship. See blocks.ts.
      if (!block.source) return null;
      return (
        <Section tone={tone} bordered={bordered} size="sm">
          <SectionHeading
            eyebrow={block.eyebrow}
            title={block.title}
            lede={block.lede}
            onCarbon={onCarbon}
          />
          <dl className="mt-8 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2 lg:grid-cols-4">
            {block.items.map((item) => (
              <div key={item.label} className="bg-paper p-6">
                <dt className="text-sm text-ink-muted">{item.label}</dt>
                <dd className="mt-2 font-heading text-2xl font-bold text-ink">{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-ink-muted">Source: {block.source}</p>
        </Section>
      );

    case 'compare':
      return (
        <Section tone={tone} bordered={bordered}>
          <SectionHeading
            eyebrow={block.eyebrow}
            title={block.title}
            lede={block.lede}
            onCarbon={onCarbon}
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2">
            <div className="bg-paper p-6">
              <p className="eyebrow">{block.before.label}</p>
              <ul className="mt-4 space-y-3">
                {block.before.rows.map((row) => (
                  <li key={row} className="text-ink-muted">
                    {row}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-mist/60 p-6">
              <p className="eyebrow">{block.after.label}</p>
              <ul className="mt-4 space-y-3">
                {block.after.rows.map((row) => (
                  <li key={row} className="flex gap-3 text-ink">
                    <Check />
                    <span>{row}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      );

    case 'timeline':
      return (
        <Section tone={tone} bordered={bordered}>
          <SectionHeading
            eyebrow={block.eyebrow}
            title={block.title}
            lede={block.lede}
            onCarbon={onCarbon}
          />
          <ol className="mt-10 border-l border-line pl-6 sm:pl-8">
            {block.steps.map((step, i) => (
              <li key={i} className={cn('relative', i > 0 && 'mt-10')}>
                {/* Node on the rule. -left is half the dot, plus the border. */}
                <span
                  aria-hidden
                  className="absolute -left-[1.8125rem] top-2 size-2.5 rounded-full bg-accent-ink sm:-left-[2.3125rem]"
                />
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-heading text-sm font-bold tabular-nums text-accent-ink">
                    {step.time}
                  </span>
                  <span className="eyebrow">{step.actor}</span>
                </p>
                <h3 className="mt-2 text-lg text-ink">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          {block.coda ? (
            <p className="mt-10 border-t border-line pt-8 text-lg leading-relaxed text-ink">
              {block.coda}
            </p>
          ) : null}
        </Section>
      );

    case 'faq':
      return (
        <Section tone={tone} bordered={bordered}>
          <SectionHeading eyebrow="FAQ" title={block.title ?? 'Common questions.'} />
          <FaqList items={block.items} />
        </Section>
      );

    case 'pricingPointer':
      return (
        <Section tone={tone} bordered={bordered}>
          <div className="rounded-lg border border-line bg-mist/40 p-8 sm:p-10">
            <SectionHeading
              eyebrow={block.eyebrow ?? 'Pricing'}
              title={block.title}
              lede={block.lede}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/pricing">Build your retainer</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Talk it through
                </a>
              </Button>
            </div>
          </div>
        </Section>
      );

    case 'cta':
      return (
        <Section tone={tone === 'carbon' ? 'paper' : tone} bordered={bordered}>
          <div className="rounded-lg bg-carbon p-8 sm:p-12">
            <SectionHeading
              onCarbon
              eyebrow={block.eyebrow}
              title={block.title}
              lede={block.lede}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book a strategy call
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="border-on-carbon/25 bg-transparent text-on-carbon hover:bg-on-carbon/10"
              >
                {block.secondary ? (
                  <Link href={block.secondary.href}>{block.secondary.label}</Link>
                ) : (
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                )}
              </Button>
            </div>
          </div>
        </Section>
      );
  }
}

/** Renders a page's blocks with alternating tone. */
export function Blocks({ blocks }: { blocks: Block[] }) {
  let shade = false;

  return (
    <>
      {blocks.map((block, i) => {
        // CTA and pricing panels carry their own surface; they don't take part
        // in the alternation, and shouldn't reset it either.
        const standalone = block.type === 'cta' || block.type === 'pricingPointer';
        const tone: 'paper' | 'mist' | 'carbon' = standalone
          ? 'paper'
          : shade
            ? 'mist'
            : 'paper';
        const bordered = !standalone && shade;
        if (!standalone) shade = !shade;

        return <BlockRenderer key={i} block={block} tone={tone} bordered={bordered} />;
      })}
    </>
  );
}
