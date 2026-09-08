/**
 * One tracked event: a lead reaching us.
 *
 * GA4 was reporting **Key events: 0** on 2026-09-08 — the property collected
 * pageviews and nothing else, so a contact-form submission looked identical to
 * someone bouncing off the homepage. On a site whose entire job is lead
 * capture, that is the one number worth having, and it was the one missing.
 *
 * `generate_lead` is GA4's own recommended event name rather than a custom
 * one, so it can be marked as a key event in the GA4 UI without extra
 * configuration, and Google Ads can import it as a conversion later.
 *
 * Deliberately small:
 *   - No personal data. Not the name, email, phone or message — those belong
 *     in the inbox and in HQ, not in an analytics property, and sending them
 *     would be a POPIA/GDPR problem for no analytical gain.
 *   - Never throws. An analytics failure must not break a form that has
 *     already delivered the enquiry; the lead is safe before this is called.
 *   - Silent when gtag is absent — ad blockers, development, the tag not yet
 *     loaded. A missing measurement is not an error worth showing anyone.
 */
type Gtag = (command: 'event', name: string, params?: Record<string, unknown>) => void;

export function trackLead(service?: string): void {
  try {
    // globalThis rather than window: identical in a browser, but defined
    // everywhere, so this cannot throw a ReferenceError if it is ever reached
    // during server rendering or in a non-DOM test environment.
    const gtag = (globalThis as unknown as { gtag?: Gtag }).gtag;
    if (typeof gtag !== 'function') return;

    gtag('event', 'generate_lead', {
      // Which service the enquiry chose, so the report can show what people
      // actually come for. A free-text field is never passed through here.
      lead_source: 'contact_form',
      ...(service ? { service } : {}),
    });
  } catch {
    // Measurement is never worth an exception on the success path.
  }
}
