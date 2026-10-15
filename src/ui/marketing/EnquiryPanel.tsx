import { SectionHeading } from '@/ui/layout/Section';
import { ContactForm } from '@/ui/marketing/ContactForm';

/**
 * The closing call to action, with the form right there.
 *
 * Every page used to end on a carbon panel whose buttons sent people to
 * /contact, where the form sat below the fold. A visitor ready to act had to
 * click, land, scroll and find it. Now the form is part of the ending: say
 * what you need, and we come back to you. Submissions go through
 * /api/contact, the same route as the contact page and the chat.
 */
export function EnquiryPanel({
  eyebrow,
  title,
  lede,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  /** Optional link under the copy, e.g. to the retainer modules. */
  secondary?: React.ReactNode;
}) {
  return (
    <div className="grid overflow-hidden rounded-lg border border-line lg:grid-cols-12">
      <div className="bg-carbon p-8 sm:p-10 lg:col-span-5">
        <SectionHeading onCarbon eyebrow={eyebrow} title={title} lede={lede} />
        <p className="mt-6 text-sm leading-relaxed text-on-carbon/70">
          Fill in the form and we’ll get back to you within one business day.
        </p>
        {secondary ? <div className="mt-6">{secondary}</div> : null}
      </div>
      <div className="bg-paper p-4 sm:p-6 lg:col-span-7">
        <ContactForm />
      </div>
    </div>
  );
}
