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
            <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{item.body}</p>
            <p className="mt-5 border-t border-line pt-4 text-sm font-medium text-accent-ink">
              {item.outcome}
            </p>
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
