/**
 * Homepage copy, lifted from index.html.
 *
 * Deliberately NOT ported:
 * - The "live dashboard" mock (Leads this month 247, AI responses today 1,840,
 *   SEO ranking #1, and the 38/21/12/0 pipeline strip). Those numbers are
 *   invented and were presented as a real product screenshot — invented
 *   precision, client-facing, which CLAUDE.md non-negotiable #5 forbids
 *   outright. A screenshot of the actual product can replace it.
 * - "Limited strategy call slots available this month" — manufactured scarcity,
 *   unverifiable, and it undercuts the calm register the rest of this rebuild
 *   is going for.
 * - The keyword marquee, typewriter, particle canvas and count-up stats.
 *
 * Claims gated behind CLAIMS in src/content/about.ts; see
 * docs/CLAIMS-REGISTER.md.
 */

export const hero = {
  eyebrow: 'Strategy · Technology · Growth',
  title: 'The three things most businesses buy separately, and then cannot connect.',
  lede: 'Strategy that names what to fix first. Technology that actually runs the work. Growth that feeds it. Bought from three suppliers these cap each other; run as one system they compound.',
  sub: 'Most engagements start with a diagnostic — what the business loses today, and what each fix is worth.',
};

export const problem = {
  eyebrow: 'Sound familiar?',
  title: 'Three suppliers, three invoices, and nobody accountable for the whole.',
  paragraphs: [
    'A consultancy that hands you a deck and leaves. A development shop that builds what the deck said, whether or not it was right. An agency buying traffic for a process that cannot convert it. Each is competent inside its own scope and nobody owns the outcome across all three.',
    'The gaps between them are where the money goes — and they are invisible on every individual report you receive.',
  ],
};

/** The old-way / Core3 comparison. Kept — it does real explanatory work. */
export const comparison = {
  before: {
    label: 'Bought separately',
    rows: [
      ['Strategy', 'a deck, no implementation'],
      ['Technology', 'built to a brief nobody validated'],
      ['Growth', 'traffic into a process that leaks'],
      ['Reporting', 'three versions of the truth'],
      ['Accountability', 'ends at each supplier’s scope'],
    ],
  },
  after: {
    label: 'Run as one',
    rows: [
      ['Recommendations that carry a cost and a return', ''],
      ['Systems built against a validated diagnosis', ''],
      ['Demand pointed at a process that converts', ''],
      ['One set of numbers, live', ''],
      ['One party accountable end to end', ''],
    ],
  },
} as const;

/**
 * The three disciplines the name refers to.
 *
 * Replaces the previous "Core3 — Build / Grow / Amplify" framing. That model
 * described an agency service menu and never explained what the 3 stood for;
 * Amplify in particular (television, activations, sponsorship) is precisely the
 * traditional-agency work the business is moving away from leading with. Those
 * capabilities still exist and their pages are still live — they sit under
 * Growth now rather than being a headline pillar.
 */
export const core3 = {
  eyebrow: 'What the 3 stands for',
  title: 'Strategy, technology and growth.',
  lede: 'Three disciplines, run as one engagement. Each is a legitimate business on its own — which is why most companies end up buying all three separately, and why the gaps between them are where the money goes.',
  layers: [
    {
      n: '01',
      title: 'Strategy — what to fix, and what it is worth',
      body: 'A diagnostic of how the business actually operates: where enquiries wait, what gets re-keyed, which spend is carrying the rest. Every recommendation carries a cost, an expected return and a position in the sequence.',
      href: '/services/strategy',
      linkLabel: 'Strategy & advisory',
    },
    {
      n: '02',
      title: 'Technology — the systems the work runs on',
      body: 'The Website Operating System, custom software, AI and LLM systems, and the automation underneath. Built against a validated diagnosis rather than a brief, so you are not automating a process that should have been removed.',
      href: '/services/website-os',
      linkLabel: 'Technology',
    },
    {
      n: '03',
      title: 'Growth — demand pointed at something that converts',
      body: 'Search and generative visibility, performance media, content, lifecycle, and the brand presence that makes all of it cheaper. Deliberately last: demand poured into a leaking process is the most expensive mistake on this page.',
      href: '/services/digital',
      linkLabel: 'Growth',
    },
  ],
};

export const websiteOs = {
  eyebrow: 'The technology pillar, in practice',
  title: 'The Website Operating System.',
  paragraphs: [
    'Most business websites are brochures — they describe the company and do none of its work. Your team still books by phone, types quotes by hand, keeps customers in spreadsheets and chases payments over email.',
    'We turn the website into the system that runs those processes: bookings, quotes, payments, CRM, inventory, client portals, AI agents and live dashboards, connected behind one front door. Usually layered onto your existing site — no rebuild required.',
  ],
  points: [
    'Customers book, pay and self-serve without staff time',
    'Every enquiry auto-qualified and tracked in your CRM',
    'Manual admin replaced by workflows that run unattended',
    // Original read "Monthly retainer from $950" — superseded by the retainer
    // builder, which starts at the $450 Base OS. See docs/CLAIMS-REGISTER.md C3.
    'Built once, improved every month — priced from the modules you pick',
  ],
};

export interface ServiceCard {
  title: string;
  body: string;
  outcome: string;
  href: string;
  /** Gate on a CLAIMS flag when the outcome line makes an unverified claim. */
  claim?: 'zeroMarkup' | 'freeAudit' | 'campaignCount' | 'marketPosition';
}

export const whatWeDo: { eyebrow: string; title: string; lede: string; cards: ServiceCard[] } = {
  eyebrow: 'Capabilities',
  title: 'What the three disciplines actually deliver.',
  lede: 'Not a menu bought line by line. These are the capabilities the diagnostic draws on once it has established which of them you actually need — and in what order.',
  cards: [
    {
      title: 'Website Operating System',
      body: 'Bookings, quotes, payments, CRM and portals running behind your site instead of a contact form that lands in an inbox.',
      outcome: 'Your website starts earning instead of just existing',
      href: '/services/website-os',
    },
    {
      title: 'AI agents & automation',
      body: 'An assistant that qualifies and books while the office is closed, plus workflows that take over the follow-ups, reminders and handovers staff do by hand.',
      outcome: 'Enquiries that land after hours are answered, not queued',
      href: '/services/ai',
    },
    {
      title: 'Custom software & internal tools',
      body: 'Web apps, APIs, SaaS products and the internal tooling for processes no off-the-shelf product handles properly. Fixed-price, scoped up front.',
      outcome: 'The spreadsheet holding your business together retires',
      href: '/services/software',
    },
    {
      title: 'AI discoverability & GEO',
      body: 'Structured data and semantic architecture so ChatGPT, Claude, Gemini and Perplexity can read, trust and cite you when buyers ask who to use.',
      outcome: 'You become the answer, not the tenth blue link',
      href: '/services/digital',
    },
    {
      title: 'SEO, ads & performance',
      body: 'Technical SEO plus Google, Meta, LinkedIn and TikTok campaigns, with landing pages engineered to convert the traffic they buy.',
      // Original: "No media markup — every dollar is accounted for".
      outcome: 'Spend you can trace, channel by channel',
      href: '/services/digital',
    },
    {
      title: 'Content, social & lifecycle',
      body: 'Planning, production and scheduled publishing across six platforms, plus the email sequences that run off real behaviour in your CRM.',
      outcome: 'A consistent presence without a full-time hire',
      href: '/services/digital',
    },
    {
      title: 'Brand, TV & activations',
      body: 'Positioning and identity, broadcast and streaming campaigns, video production, sponsorship and experiential events.',
      outcome: 'You stop losing deals to competitors who only look bigger',
      href: '/services/brand',
    },
    {
      title: 'Intelligence & reporting',
      body: 'Leads, bookings, revenue, spend and pipeline on one live screen, with attribution that shows which channel actually produced the money.',
      outcome: 'Decisions stop waiting on a monthly spreadsheet',
      href: '/intelligence',
    },
  ],
};

export const intelligence = {
  eyebrow: 'Proprietary platform',
  title: 'N3XUS Intelligence.',
  lede: 'Unified visibility across every channel — TV reach, digital conversions, social performance and AI metrics — in one live dashboard.',
  points: [
    'Every channel reporting into one screen, live',
    'Budget moves to what works without waiting for review day',
    'The report arrives without anyone losing a day to it',
    'You hear about a competitor’s move before it costs you position',
    'You know which channel produced each sale, and what it cost',
    'The content calendar stops being the bottleneck',
  ],
};

export const process = {
  eyebrow: 'Our process',
  title: 'What you have at the end of each stage.',
  steps: [
    {
      n: '01',
      title: 'Discover',
      body: 'You end up with a map of where revenue is leaking today and what each fix is worth — and you keep it whether or not you continue with us.',
    },
    {
      n: '02',
      title: 'Strategise',
      body: 'You end up with a sequenced plan: what gets built first, what it should return, and how you will know. No open-ended scope.',
    },
    {
      n: '03',
      title: 'Execute',
      body: 'You end up with the highest-value workflow live early — so something is measurably working before the full build finishes.',
    },
    {
      n: '04',
      title: 'Optimise',
      body: 'You end up owning a system that is worth more each month than the last, instead of one ageing towards the next rebuild.',
    },
  ],
};

export interface Faq {
  q: string;
  a: string;
  claim?: 'zeroMarkup' | 'freeAudit' | 'campaignCount' | 'marketPosition';
}

export const faqs: Faq[] = [
  {
    q: 'What kind of firm is N3XUS?',
    // Original opened "N3XUS is the only agency that genuinely operates
    // across..." — see docs/CLAIMS-REGISTER.md B3. Restated as what is done.
    a: 'A business consultancy working across three disciplines: strategy, technology and growth. We diagnose how a business actually operates, build the systems it runs on, and drive the demand into them. Most firms do one of the three; the value is in owning the joins, because that is where the losses usually are.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'Timelines depend on the work. AI assistants and automation workflows typically go live within about two weeks and change day-to-day operations immediately — enquiries answered outside office hours, bookings taken without a phone call, records written without anyone re-typing them. Search and paid campaigns compound more slowly; brand and broadcast work slower still. The audit sets the expected timeline for each workstream before you commit to anything.',
  },
  {
    q: 'What is LLM marketing / Generative Engine Optimisation (GEO)?',
    a: 'GEO is the work that decides whether your brand is the one recommended when a buyer asks ChatGPT, Claude, Gemini or Perplexity for a supplier in your category. Most businesses are effectively invisible to those systems, because the structured data and semantic architecture the models rely on simply isn’t there. We build it.',
  },
  {
    q: 'Do you manage TV advertising campaigns?',
    a: 'Yes — national broadcast campaigns, including commercial production (concept, script, shoot, post), media buying, broadcast delivery and post-campaign brand recall measurement. TV work is integrated with your digital and AI strategy so the halo effect is measurable rather than assumed.',
  },
  {
    q: 'How small a business do you work with?',
    // Original quoted the retired Launch $500/mo retainer.
    a: 'Yes. The retainer starts with the Website OS base and everything above it is modular, so a two-person business and a fifty-person business are not being sold the same package. Build the stack on the pricing page to see what your version actually costs.',
  },
  {
    q: 'How much does it cost?',
    // Original quoted Launch/Growth/Dominate $500/$1,000/$2,000 and
    // "individual services from $135/mo", both of which contradicted the
    // pricing page. Now points at the single source.
    a: 'Monthly retainers are built from modules: a required Website OS base at $450 / R6,500 per month, plus whichever visibility, social, AI agent and paid-media modules you need. Selecting at least one module from all four of those areas takes 10% off the monthly total. Build yours on the pricing page to see the exact figure. Project work — a custom build, an AI application — is quoted separately.',
  },
  {
    q: 'What is N3XUS Intelligence?',
    a: 'Our reporting platform. Every client gets a dashboard showing TV reach, digital conversions, social performance and AI metrics in one live view, with AI-driven campaign recommendations, scheduled reports, competitor monitoring and lead intelligence. No spreadsheets, no switching between platforms.',
  },
  {
    q: 'Where are you based, and who do you serve?',
    a: 'Founded in South Africa, working with clients internationally. Digital and AI services are delivered remotely to any market; TV and broadcast campaigns are executed wherever a client needs reach. The 20% local rate on retainers applies to entities registered and operating in South Africa.',
  },
];

export const closing = {
  eyebrow: 'Ready to grow?',
  title: 'Start with a conversation.',
  lede: 'We map your Core3 growth opportunity and show you exactly what to do — whether you work with us or not. A clear, prioritised growth plan, and you keep it either way.',
};
