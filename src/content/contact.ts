import type { Faq } from './home';

export const contactHero = {
  eyebrow: 'Contact',
  title: 'Get in touch.',
  lede: 'Book a strategy call, send a message, or just say hello. We respond within one business day.',
};

export const contactDetails = [
  { label: 'Email', value: 'info@n3xus.media', href: 'mailto:info@n3xus.media' },
  { label: 'Availability', value: 'Worldwide, remote-first' },
  { label: 'Response time', value: 'Within one business day' },
] as const;

/**
 * Grouped exactly as the old <select> was — the groupings are how a visitor
 * finds their thing, and re-sorting them would be a change nobody asked for.
 */
export const serviceOptions: { group: string; options: string[] }[] = [
  {
    group: 'Website Operating System',
    options: [
      'Turn my website into a business system',
      'Website audit',
      'Online bookings & scheduling',
      'Payments, quoting & invoicing',
      'CRM & lead pipeline integration',
      'Workflow automation',
      'Client / staff portal',
      'New website or rebuild',
    ],
  },
  {
    group: 'Growth & Demand',
    options: [
      'SEO & LLM Marketing / GEO',
      'Google Ads / Meta Ads',
      'Social media management',
    ],
  },
  {
    group: 'AI & Software Development',
    options: [
      'AI agents & assistants',
      'AI chatbot (web / WhatsApp / voice)',
      'Custom AI application / LLM integration',
      'Custom software development',
      'Predictive analytics & ML',
      'API development & system integration',
    ],
  },
  {
    group: 'Brand & Traditional',
    options: ['Brand & market presence', 'TV & broadcast marketing'],
  },
  {
    group: 'Other',
    options: ['Retainer / full-service plan', 'Other / not sure yet'],
  },
];

export const contactFaqs: Faq[] = [
  {
    q: 'How quickly do you respond?',
    a: 'Within one business day. For anything urgent, email info@n3xus.media directly.',
  },
  {
    q: 'What happens on a strategy call?',
    a: 'A conversation about your business, your market and your growth goals. No pitch deck. We map your Core3 opportunity and give you a clear plan — whether you work with us or not.',
    // "45-minute" framing is claims-register A4.
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. Most work is delivered remotely with regular video calls, for clients across the US, UK, Europe, Asia and elsewhere. We travel for TV productions and major brand activations.',
  },
  {
    q: 'What is your minimum engagement?',
    // The old answer read "Retainer plans start at $500/mo with a 3-month
    // minimum". Both halves conflict with the current terms: the retainer now
    // starts at the $450 / R6,500 Base OS, and the configurator's engagement
    // terms specify 30 days written notice with no stated minimum term.
    // Logged in docs/CLAIMS-REGISTER.md. This answer follows the current terms.
    a: 'Project work has no minimum. Monthly retainers start with the Website OS base at $450 / R6,500 per month, and modules can be changed or swapped with 30 days written notice before the next billing cycle.',
  },
];
