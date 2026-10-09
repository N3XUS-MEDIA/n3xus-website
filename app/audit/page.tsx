import type { Metadata } from 'next';
import { PageHero } from '@/ui/layout/PageHero';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { FaqList } from '@/ui/marketing/FaqList';
import { JsonLd } from '@/ui/seo/JsonLd';
import { AuditForm } from '@/ui/audit/AuditForm';
import { auditAreas, auditDeliverables, auditFaqs, auditHero } from '@/content/audit';
import { breadcrumbLd, faqLd } from '@/content/structuredData';
import { AUDIT_LIVE } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Free website audit & AI visibility check',
  description:
    'A free audit of your website: search, AI visibility, speed, lead capture, tracking and trust. Your score on screen in minutes, and a full report by email.',
  alternates: { canonical: '/audit' },
  // Kept out of search until launch — see AUDIT_LIVE in src/content/copy.ts.
  ...(AUDIT_LIVE ? {} : { robots: { index: false, follow: false } }),
};

export default function AuditPage() {
  return (
    <>
      <JsonLd data={faqLd(auditFaqs)} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Free website audit', path: '/audit' },
        ])}
      />

      <PageHero eyebrow={auditHero.eyebrow} title={auditHero.title} lede={auditHero.lede}>
        <AuditForm id="audit-url-hero" />
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="What we check"
          title="Six areas, one score."
          lede="Each area is scored from the same checklist, so you can see exactly where the points went — and re-run it after you fix something."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {auditAreas.map((area) => (
            <li key={area.title} className="bg-paper p-6 sm:p-8">
              <h3 className="text-lg text-ink">{area.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{area.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="mist" bordered>
        <SectionHeading eyebrow="What you get" title="Your score now. The full picture by email." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {([auditDeliverables.instant, auditDeliverables.full] as { title: string; points: string[]; note?: string }[]).map((d) => (
            <div key={d.title} className="rounded-lg border border-line bg-paper p-6 sm:p-8">
              <h3 className="text-xl text-ink">{d.title}</h3>
              <ul className="mt-5 space-y-3 text-ink-muted">
                {d.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
              {d.note ? <p className="mt-5 text-sm leading-relaxed text-ink-muted">{d.note}</p> : null}
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Questions" title="About the audit" />
        <FaqList items={auditFaqs} />
      </Section>

      <Section tone="carbon">
        <SectionHeading onCarbon eyebrow="Ready when you are" title="Run your free audit." />
        <div className="mt-8">
          <AuditForm tone="carbon" id="audit-url-footer" />
        </div>
      </Section>
    </>
  );
}
