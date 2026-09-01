/**
 * /services copy, lifted from services/index.html.
 *
 * The distinctive thing about this page is that every capability carries the
 * outcome it produces — "a capability nobody can value is just a line on an
 * invoice". That pairing is kept structural (`outcome` on each item) rather
 * than baked into prose, so the layout can't drift from it.
 */

export const servicesHero = {
  eyebrow: 'Everything we do',
  title: 'Every problem we can solve, and what solving it is worth.',
  lede: 'Most agency sites list services. This one lists outcomes. Start with whatever is actually costing you money right now — customers who can’t find you, leads going cold, work being done by hand, or no idea what’s working — and follow it to the system that fixes it.',
};

export interface PainPoint {
  quote: string;
  body: string;
  href: string;
  linkLabel: string;
}

export const painPoints: PainPoint[] = [
  {
    quote: 'Customers can’t find us.',
    body: 'You’re invisible in search, absent from the AI assistants buyers now ask, or spending on ads that don’t return.',
    href: '/services/digital',
    linkLabel: 'Demand & visibility',
  },
  {
    quote: 'We lose leads we already paid for.',
    body: 'Enquiries land in an inbox, get chased once, and go cold. Nobody can say which ones were lost or why.',
    href: '/services/software',
    linkLabel: 'Systems & development',
  },
  {
    quote: 'Everything is done by hand.',
    body: 'Quotes typed one at a time, bookings by phone, data re-keyed between tools, invoices chased manually.',
    href: '/services/website-os',
    linkLabel: 'Website Operating System',
  },
  {
    quote: 'I can’t see what’s actually working.',
    body: 'Numbers live in six dashboards, reporting arrives a month late, and nobody can attribute revenue to a channel.',
    href: '/intelligence',
    linkLabel: 'Intelligence & reporting',
  },
  {
    quote: 'The software we need doesn’t exist.',
    body: 'Your operation has a process no off-the-shelf product handles, so it runs on spreadsheets and goodwill.',
    href: '/services/ai',
    linkLabel: 'Custom software & AI',
  },
  {
    quote: 'We don’t look like the leader we are.',
    body: 'The brand undersells the business, and bigger competitors win work you could have done better.',
    href: '/services/brand',
    linkLabel: 'Brand & market presence',
  },
];

export interface CapabilityItem {
  title: string;
  body: string;
  /** What the client actually gets. Never omit — see the file header. */
  outcome: string;
}

export interface ServiceLayer {
  id: string;
  label: string;
  name: string;
  lede: string;
  items: CapabilityItem[];
  links: { href: string; label: string }[];
}

export const layers: ServiceLayer[] = [
  {
    id: 'build',
    label: 'Layer 01',
    name: 'Build — systems & development',
    lede: 'The engine. Everything that turns interest into booked, paid, delivered work without a person doing it by hand.',
    links: [
      { href: '/services/website-os', label: 'Explore Website OS' },
      { href: '/services/software', label: 'Software & AI' },
    ],
    items: [
      {
        title: 'Website Operating System',
        body: 'Your site converted from a brochure into the system the business runs on — bookings, quotes, payments, CRM, portals and reporting behind one front door.',
        outcome: 'Your website starts earning instead of just existing',
      },
      {
        title: 'Bookings & scheduling',
        body: 'Customers book real slots from your live calendar, pay deposits, and get reminded automatically. Calendars sync across the team.',
        outcome: 'Jobs booked at midnight, and far fewer no-shows',
      },
      {
        title: 'Quoting, payments & invoicing',
        body: 'Quotes generated from your own pricing rules, deposits and subscriptions taken on-site, invoices reconciled automatically.',
        outcome: 'Days of quote turnaround become minutes',
      },
      {
        title: 'CRM & sales pipeline',
        body: 'Every enquiry becomes a tracked, scored record routed to the right person, with the full history attached and nothing sitting forgotten.',
        outcome: 'You stop paying for leads you never follow up',
      },
      {
        title: 'AI agents & assistants',
        body: 'An assistant that knows your business, answers real questions, qualifies and books, and hands to a human at the right moment — on site and on WhatsApp.',
        outcome: 'Enquiries that land after hours are answered, not queued',
      },
      {
        title: 'Workflow automation',
        body: 'The follow-up, the reminder, the handover, the escalation, the report. Every repetitive step your staff does by hand becomes a workflow that runs without them.',
        outcome: 'Staff hours back, and steps that never get skipped',
      },
      {
        title: 'Custom software',
        body: 'Web applications, APIs, SaaS products and internal tooling for the processes no off-the-shelf product handles properly. Fixed-price, scoped up front.',
        outcome: 'The spreadsheet holding your business together retires',
      },
      {
        title: 'AI & LLM applications',
        body: 'Production AI built on current frontier models — RAG knowledge bases, autonomous agents and AI features inside your own product.',
        outcome: 'Work that needed a specialist now runs on demand',
      },
      {
        title: 'Client & staff portals',
        body: 'Secure logins where customers track jobs, download documents and pay, and where your team works — without another per-seat subscription.',
        outcome: 'Fewer “where is my job?” calls, every week',
      },
      {
        title: 'Inventory & operations',
        body: 'Stock, orders, job progress and fulfilment connected to the same system your customers and staff already use, with no double-capturing.',
        outcome: 'One version of the truth, so decisions stop waiting',
      },
    ],
  },
  {
    id: 'grow',
    label: 'Layer 02',
    name: 'Grow — demand & visibility',
    lede: 'Getting found, and getting chosen. Rankings are now the floor — buyers increasingly ask an AI assistant who to use, and the answer is decided by how your site is built.',
    links: [{ href: '/services/digital', label: 'Explore growth services' }],
    items: [
      {
        title: 'GEO & AI discoverability',
        body: 'Structured data, semantic architecture and llms.txt so ChatGPT, Claude, Gemini and Perplexity can read, trust and cite you when buyers ask for a recommendation.',
        outcome: 'You become the answer, not the tenth blue link',
      },
      {
        title: 'SEO & technical search',
        body: 'Technical, on-page and off-page SEO built around commercial intent, plus the Core Web Vitals and site health work that protects the rankings you earn.',
        outcome: 'Traffic that arrives already wanting to buy',
      },
      {
        title: 'Google & Meta ads',
        body: 'Performance advertising with budget pacing, audience building and landing pages engineered to convert. Media spend goes to the platform at cost.',
        // Original outcome line was "No media markup — every dollar is
        // accounted for" (claims register A2). Restated as what the client
        // sees, which needs no unverified absolute.
        outcome: 'Spend you can trace, channel by channel',
      },
      {
        title: 'LinkedIn, TikTok & X ads',
        body: 'Channel-native paid campaigns where your buyers actually spend attention, managed from the same panel as everything else.',
        outcome: 'Reach beyond search, without another agency',
      },
      {
        title: 'Lead intelligence & outreach',
        body: 'Prospect discovery, automatic qualification and scoring, enrichment and outreach sequences — so pipeline gets built rather than waited for.',
        outcome: 'Pipeline stops depending on who happens to call',
      },
      {
        title: 'Content & social',
        body: 'Planning, production, approvals and scheduled publishing across Instagram, Facebook, LinkedIn, X, TikTok and YouTube, plus the blog and article engine.',
        outcome: 'A consistent presence without a full-time hire',
      },
      {
        title: 'Email & lifecycle',
        body: 'Onboarding, nurture, reactivation and post-purchase sequences that run off real behaviour in your CRM rather than a generic monthly newsletter.',
        outcome: 'Revenue from customers you already paid to win',
      },
      {
        title: 'Conversion optimisation',
        body: 'Landing page testing, funnel repair and friction removal on the paths that already carry your traffic.',
        outcome: 'More sales from the traffic you already have',
      },
    ],
  },
  {
    id: 'amplify',
    label: 'Layer 03',
    name: 'Amplify — brand & market presence',
    lede: 'For businesses ready to scale reach and be taken seriously at a larger size. Broadcast and physical presence still carry an authority signal digital alone can’t replicate.',
    links: [
      { href: '/services/brand', label: 'Explore brand services' },
      { href: '/services/dstv-stream', label: 'Streaming advertising' },
    ],
    items: [
      {
        title: 'Brand identity & positioning',
        body: 'Positioning, messaging hierarchy, identity systems and the visual language that makes a business look the size it actually is.',
        outcome: 'You stop losing deals to competitors who only look bigger',
      },
      {
        title: 'Television & streaming',
        body: 'National and international broadcast campaigns and streaming placement, from commercial production through to delivery.',
        outcome: 'Credibility at a scale performance ads can’t buy',
      },
      {
        title: 'Video & creative production',
        body: 'Commercials, brand films, social-native video and the ad creative that feeds every paid channel.',
        outcome: 'Creative that stops the scroll instead of blending in',
      },
      {
        title: 'Brand activations & sponsorship',
        body: 'Experiential events, sponsorship strategy and out-of-home that put the brand in front of people in the physical world.',
        outcome: 'Word-of-mouth that outlives the campaign',
      },
    ],
  },
];

export const intelligenceLayer: ServiceLayer = {
  id: 'intelligence',
  label: 'The layer underneath',
  name: 'Intelligence — see all of it, live',
  lede: 'Every layer above reports into one platform. Without this, you are running three programmes and guessing which one produced the revenue.',
  links: [{ href: '/intelligence', label: 'Explore N3XUS Intelligence' }],
  items: [
    {
      title: 'Live dashboards',
      body: 'Leads, bookings, revenue, spend, pipeline and campaign performance on one screen, updating as it happens.',
      outcome: 'Decisions stop waiting on a monthly spreadsheet',
    },
    {
      title: 'Attribution & reporting',
      body: 'Multi-touch attribution across every channel, plus scheduled reports delivered without anyone assembling them.',
      outcome: 'You finally know which channel actually paid',
    },
    {
      title: 'Forecasting & pipeline analytics',
      body: 'Revenue forecasting and pipeline health built on your live data rather than last quarter’s export.',
      outcome: 'You can plan hiring and spend with confidence',
    },
    {
      title: 'Ownership & governance',
      body: 'Team roles and permissions, audit trails, full data export, and your own accounts with every tool we connect.',
      outcome: 'You own the system — there is no box to be locked in',
    },
  ],
};

export const compounding = {
  eyebrow: 'Why it’s one system',
  title: 'Each layer makes the next one worth more.',
  body: 'Demand poured into a brochure leaks. A brilliant system nobody can find sits idle. A strong brand driving traffic to a site that can’t book or quote gives most of its value away. Run separately, each one caps the others — which is why most businesses end up paying three suppliers to underperform in parallel. Built together, the same spend produces compounding returns instead of three isolated line items. You don’t have to buy all of it, and most clients start with one layer. But they get built to connect.',
};

/**
 * `claim` marks a principle that needs sign-off before it ships —
 * see docs/CLAIMS-REGISTER.md and src/content/about.ts CLAIMS.
 */
export const principles = [
  {
    title: 'You own everything',
    body: 'Your site, data, records and accounts. Built on your infrastructure.',
  },
  {
    title: 'Start with one layer',
    body: 'Nobody needs all of it on day one. The audit sets the order.',
  },
  {
    title: 'No media markup',
    body: 'Ad spend goes to the platform at cost, and you see the receipts.',
    claim: 'zeroMarkup' as const,
  },
  {
    title: 'Audit before commitment',
    body: 'You keep the findings and the opportunity map either way.',
    claim: 'freeAudit' as const,
  },
];

export const servicesClosing = {
  eyebrow: 'Not sure which of these you need?',
  title: 'That’s what the audit is for.',
  lede: 'We map how your business actually operates today, show you where revenue is leaking and what each fix is worth, and give you the findings whether or not you work with us.',
};
