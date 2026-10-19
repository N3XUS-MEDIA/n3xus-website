import Link from 'next/link';
import { Section, SectionHeading } from '@/ui/layout/Section';
import type { ServiceLayer } from '@/content/services';

/**
 * One service layer: label, name, lede, then its capabilities as a hairline
 * grid. Each card ends with the outcome, set apart from the description —
 * that pairing is the point of the page.
 */
export function CapabilityGrid({
  layer,
  tone = 'paper',
  bordered,
}: {
  layer: ServiceLayer;
  tone?: 'paper' | 'mist' | 'carbon';
  bordered?: boolean;
}) {
  const onCarbon = tone === 'carbon';

  return (
    <Section id={layer.id} tone={tone} bordered={bordered}>
      <SectionHeading
        eyebrow={layer.label}
        title={layer.name}
        lede={layer.lede}
        onCarbon={onCarbon}
      />

      <ul className="mt-10 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-2 lg:grid-cols-3">
        {layer.items.map((item) => (
          <li key={item.title} className="flex flex-col bg-paper p-6">
            <h3 className="text-lg text-ink">{item.title}</h3>
            {/* Outcome first, the detail on demand: 32 full cards in a row was
                the most text-heavy stretch of the site. The body stays in the
                HTML (native <details>), so nothing is lost to search. */}
            <p className="mt-3 flex-1 font-medium leading-relaxed text-accent-ink">{item.outcome}</p>
            <details className="group mt-4 border-t border-line pt-3">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between text-sm font-medium text-ink-muted hover:text-ink">
                What it involves
                <span aria-hidden className="transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-1 pt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </details>
          </li>
        ))}
      </ul>

      {layer.links.length ? (
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {layer.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                onCarbon
                  ? 'inline-flex min-h-[44px] items-center gap-2 font-medium text-on-carbon underline underline-offset-4 hover:no-underline'
                  : 'inline-flex min-h-[44px] items-center gap-2 font-medium text-accent-ink underline underline-offset-4 hover:no-underline'
              }
            >
              {link.label}
              <span aria-hidden>→</span>
            </Link>
          ))}
        </div>
      ) : null}
    </Section>
  );
}
