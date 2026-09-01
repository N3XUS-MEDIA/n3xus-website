import type { Metadata } from 'next';
import { PageHero } from '@/ui/layout/PageHero';
import { Section, SectionHeading } from '@/ui/layout/Section';
import { Button } from '@/ui/primitives/Button';
import { ContactForm } from '@/ui/marketing/ContactForm';
import { FaqList } from '@/ui/marketing/FaqList';
import { JsonLd } from '@/ui/seo/JsonLd';
import { contactDetails, contactFaqs, contactHero } from '@/content/contact';
import { site } from '@/content/copy';
import { faqLd } from '@/content/structuredData';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book a strategy call or send N3XUS Media a message. We respond within one business day.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqLd(contactFaqs)} />

      <PageHero eyebrow={contactHero.eyebrow} title={contactHero.title} lede={contactHero.lede} />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="py-5">
                  <dt className="eyebrow">{detail.label}</dt>
                  <dd className="mt-2 text-ink">
                    {'href' in detail && detail.href ? (
                      <a
                        href={detail.href}
                        className="text-accent-ink underline underline-offset-4 hover:no-underline"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-lg bg-mist/50 p-6">
              <h2 className="text-lg text-ink">Prefer to book directly?</h2>
              <p className="mt-3 leading-relaxed text-ink-muted">
                A strategy call, no pitch — just a clear map of your growth opportunity.
              </p>
              <Button asChild className="mt-5">
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                  Book a strategy call
                </a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Section>

      <Section tone="mist" bordered>
        <SectionHeading eyebrow="FAQ" title="Common questions." />
        <FaqList items={contactFaqs} />
      </Section>
    </>
  );
}
