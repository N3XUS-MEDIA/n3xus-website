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
  eyebrow: 'Strategy · Intelligence · Growth',
  title: 'You know something isn’t working. You’re just not sure what to fix first.',
  lede: 'Most business owners we meet can feel where the money is going — quotes sent too late, enquiries nobody chased, a system everyone works around. They just can’t prove which one is costing the most. That’s where we start.',
  sub: 'You don’t need to know what to ask for. Working that out is the job.',
};

/**
 * Two doors, high on the page.
 *
 * People decide whether a firm is "for them" in a few seconds, and the fastest
 * way to lose someone is to make them translate your positioning into their own
 * situation. So we describe two situations plainly and let them point at theirs.
 * Both lead to the same first step, which keeps the choice low-stakes.
 */
export const audiences = {
  eyebrow: 'Where are you right now?',
  title: 'Two ways people usually find us.',
  doors: [
    {
      label: 'I’m starting something',
      body: 'You want it set up properly the first time — the name, the site, a way to take bookings and get paid, and something that looks like you meant it. Without spending money you don’t have yet on things you don’t need yet.',
      cta: 'What a good start looks like',
      href: '/services/strategy',
    },
    {
      label: 'We’ve outgrown how we work',
      body: 'It worked fine at five people. At twenty it’s held together by one person who knows where everything is. Quotes go out late, leads go cold, and every system needs a different login.',
      cta: 'How we untangle it',
      href: '/services/website-os',
    },
  ],
};

export const problem = {
  eyebrow: 'Sound familiar?',
  title: 'Everyone’s doing their bit. Nobody can tell you why it isn’t adding up.',
  paragraphs: [
    'One agency runs your ads. Someone else built the website and has since gone quiet. A consultant sent a deck that made sense at the time. Each of them is doing what you asked, and none of them can answer the only question that matters: what should we do next, and what will it be worth?',
    'You end up being the one holding it together — chasing updates, joining the dots, and making calls on numbers you’re not confident in. That is an exhausting way to run a business, and it is the normal way.',
  ],
};

/** The old-way / Core3 comparison. Kept — it does real explanatory work. */
export const comparison = {
  before: {
    label: 'How it usually goes',
    rows: [
      ['The advice', 'a deck, then they’re gone'],
      ['The build', 'exactly what the deck said, right or not'],
      ['The marketing', 'traffic sent to a page that can’t sell'],
      ['The reporting', 'three sets of numbers, none agreeing'],
      ['The chasing', 'you'],
    ],
  },
  after: {
    label: 'How we do it',
    rows: [
      ['You’re told what it costs and what it should bring back', ''],
      ['We only build what the numbers said to build', ''],
      ['Customers arrive somewhere ready to sell to them', ''],
      ['One set of numbers, updated as it happens', ''],
      ['One team you can call, who already know your business', ''],
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
/**
 * The three disciplines the name refers to: Strategy, Intelligence, Growth.
 *
 * Written in the second person and in plain words. An earlier version of this
 * section explained the model to the reader ("each layer makes the next one
 * worth more"), which is a sentence about us. What a visitor needs is to
 * recognise which part they need, so each one opens with their situation.
 */
export const core3 = {
  eyebrow: 'What the 3 stands for',
  title: 'Strategy. Intelligence. Growth.',
  lede: 'Three parts of the same job. Most firms sell you one and hope the other two sort themselves out. We do all three, so nothing falls between them — and you only pay for the parts you actually need.',
  layers: [
    {
      n: '01',
      title: 'Strategy — what to fix first',
      body: 'We map how the business really runs today, put a number on what each problem is costing you, and tell you what to do first. You get that in writing, and it’s yours whether you carry on with us or not.',
      href: '/services/strategy',
      linkLabel: 'Where to start',
    },
    {
      n: '02',
      title: 'Intelligence — systems that do the work, and show you what happened',
      body: 'Your website, bookings, quotes, invoices, customer records and AI assistants, joined up so they stop needing a person in the middle. Then one screen that tells you what’s actually happening, instead of five logins and a spreadsheet.',
      href: '/intelligence',
      linkLabel: 'See how that works',
    },
    {
      n: '03',
      title: 'Growth — getting found, and getting chosen',
      body: 'Search, AI assistants, ads, content and brand. Deliberately last: sending more people to a business that can’t handle the ones it already has is the most expensive mistake on this page.',
      href: '/services/digital',
      linkLabel: 'How we bring customers',
    },
  ],
};

export const websiteOs = {
  eyebrow: 'Where most people start',
  title: 'Your website should be doing more of the work.',
  paragraphs: [
    'Right now it probably just describes you. Someone still answers the phone to take a booking, types the quote by hand, copies the details into a spreadsheet, and emails twice to chase the payment. All of that is work your website could be doing — including at nine on a Friday night, when you’re closed and your customer is deciding.',
    'We turn it into the thing your business runs on: bookings, quotes, payments, customer records, portals and an assistant that answers properly. Usually built onto the site you already have, so there’s nothing to rebuild and nothing to relaunch.',
  ],
  points: [
    'Customers book and pay themselves, without anyone picking up the phone',
    'Every enquiry lands somewhere, with a name against it',
    'The repetitive admin runs on its own',
    'You add the parts you need, and only pay for those',
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
  eyebrow: 'What we actually do',
  title: 'The things we build and run for people.',
  lede: 'You don’t have to pick from this list — that’s what the first conversation is for. It’s here so you can see the range, and recognise the bits that sound like your problem.',
  cards: [
    {
      title: 'Website Operating System',
      body: 'Bookings, quotes, payments, CRM and portals running behind your site instead of a contact form that lands in an inbox.',
      outcome: 'The website starts doing actual work',
      href: '/services/website-os',
    },
    {
      title: 'AI agents & automation',
      body: 'An assistant that qualifies and books while the office is closed, plus workflows that take over the follow-ups, reminders and handovers staff do by hand.',
      outcome: 'Someone answers at 9pm, even though nobody is there',
      href: '/services/ai',
    },
    {
      title: 'Custom software & internal tools',
      body: 'Web apps, APIs, SaaS products and the internal tooling for processes no off-the-shelf product handles properly. Fixed-price, scoped up front.',
      outcome: 'The spreadsheet everyone is scared to touch goes away',
      href: '/services/software',
    },
    {
      title: 'AI discoverability & GEO',
      body: 'Structured data and semantic architecture so ChatGPT, Claude, Gemini and Perplexity can read, trust and cite you when buyers ask who to use.',
      outcome: 'When someone asks ChatGPT who to use, your name comes up',
      href: '/services/digital',
    },
    {
      title: 'SEO, ads & performance',
      body: 'Technical SEO plus Google, Meta, LinkedIn and TikTok campaigns, with landing pages engineered to convert the traffic they buy.',
      // Original: "No media markup — every dollar is accounted for".
      outcome: 'You can see exactly where the money went',
      href: '/services/digital',
    },
    {
      title: 'Content, social & lifecycle',
      body: 'Planning, production and scheduled publishing across six platforms, plus the email sequences that run off real behaviour in your CRM.',
      outcome: 'You stay visible without hiring someone to post',
      href: '/services/digital',
    },
    {
      title: 'Brand, TV & activations',
      body: 'Positioning and identity, broadcast and streaming campaigns, video production, sponsorship and experiential events.',
      outcome: 'You stop losing work to people who just look bigger',
      href: '/services/brand',
    },
    {
      title: 'Intelligence & reporting',
      body: 'Leads, bookings, revenue, spend and pipeline on one live screen, with attribution that shows which channel actually produced the money.',
      outcome: 'You stop waiting until month-end to find out',
      href: '/intelligence',
    },
  ],
};

export const intelligence = {
  eyebrow: 'Our platform',
  title: 'One screen, instead of five logins and a spreadsheet.',
  lede: 'Everything we run for you reports into one place — enquiries, bookings, revenue, ad spend, where each customer came from. So when someone asks how last month went, you can answer.',
  points: [
    'Everything in one place, updating as it happens',
    'You can see which spend is working, while you can still do something about it',
    'The monthly report writes itself',
    'You find out when a competitor moves, not months later',
    'You know what each customer cost to win',
    'Your accounts and your data stay in your name',
  ],
};

export const process = {
  eyebrow: 'How working with us goes',
  title: 'What you have at the end of each step.',
  steps: [
    {
      n: '01',
      title: 'Discover',
      body: 'A clear picture of where the money is going, with a number against each problem. It’s yours to keep, even if you decide not to carry on with us.',
    },
    {
      n: '02',
      title: 'Strategise',
      body: 'A plan in order: what we do first, what it should be worth, and how we’ll both know if it worked. Fixed scope, fixed price.',
    },
    {
      n: '03',
      title: 'Execute',
      body: 'The most valuable bit goes live early, so something is already paying off while the rest is still being built.',
    },
    {
      n: '04',
      title: 'Optimise',
      body: 'Every month it does a bit more, instead of slowly ageing towards the next expensive rebuild.',
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
    a: 'A consultancy — but one that does the work as well as the thinking. We work out what’s holding the business back (strategy), build and run the systems that fix it (intelligence), and bring you the customers (growth). Most firms do one of those three and leave you to manage the other two.',
  },
  {
    q: 'How quickly will I see results?',
    a: 'It depends what we do first. An assistant answering enquiries or an automation taking bookings can be live in a couple of weeks, and you feel that immediately. Search and ads take months, not days — anyone promising otherwise is guessing. We’ll tell you the honest timeline for each piece before you commit to any of it.',
  },
  {
    q: 'What is LLM marketing / Generative Engine Optimisation (GEO)?',
    a: 'Your customers have started asking ChatGPT and Gemini who they should use, instead of scrolling Google. Those tools only recommend businesses whose websites they can actually read and trust. Most can’t be read at all. We fix that, so your name is in the answer.',
  },
  {
    q: 'Do you manage TV advertising campaigns?',
    a: 'Yes — national broadcast campaigns, including commercial production (concept, script, shoot, post), media buying, broadcast delivery and post-campaign brand recall measurement. TV work is integrated with your digital and AI strategy so the halo effect is measurable rather than assumed.',
  },
  {
    q: 'Are we too small for you?',
    // Original quoted the retired Launch $500/mo retainer.
    a: 'Almost certainly not. You add the parts you need and nothing else, so a two-person business and a fifty-person one aren’t handed the same package. If you’re at the point where the admin is eating your evenings, you’re the right size. And if we genuinely aren’t the right fit, we’ll say so on the first call rather than sell you something.'
  },
  {
    q: 'What does it cost?',
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
  eyebrow: 'The first step is small',
  title: 'Have a conversation with us.',
  lede: 'Tell us what’s bothering you about the business. We’ll tell you what we’d look at first, and roughly what it would take. No deck, no pressure, and you keep whatever we work out — even if you never speak to us again.',
};
