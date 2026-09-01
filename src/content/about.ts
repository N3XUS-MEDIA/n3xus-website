/**
 * /about copy, lifted from about.html.
 *
 * Claims that need founder sign-off are gated behind UNCONFIRMED_CLAIMS below
 * rather than edited into vaguer versions of themselves. See
 * docs/CLAIMS-REGISTER.md — "hundreds of campaigns" is not a safe rendering of
 * "528 campaigns", it is the same claim with the evidence removed.
 */

/**
 * Flip to true only when the corresponding rows in docs/CLAIMS-REGISTER.md are
 * marked CONFIRM. Each is one constant in one place so a decision is a
 * one-line change, not a hunt through JSX.
 */
export const CLAIMS = {
  /** A1 — needs a verifiable campaign count. */
  campaignCount: false,
  /** A2 — billing policy; confirmable from contracts. */
  zeroMarkup: false,
  /** A4 — the free 45-minute audit offer. */
  freeAudit: false,
  /** B1–B3 — "only", "among the first", "one of the few". */
  marketPosition: false,
} as const;

export const aboutHero = {
  eyebrow: 'Who we are',
  title: 'Built to connect what other agencies separate.',
  lede: 'N3XUS Media was founded on a single observation: the most impactful marketing happens when traditional, digital and AI work as one system. Most agencies do one. We built the infrastructure to do all three — genuinely integrated.',
};

export const mission = {
  eyebrow: 'Our mission',
  title: 'Growth without fragmentation.',
  paragraphs: [
    'Ambitious businesses deserve marketing that actually works as a system. Not a TV agency here, a digital agency there, and an AI consultant bolted on separately. N3XUS Media was built to be the single partner that connects all three.',
    // B1's "one of the few agencies in the world … at enterprise level" is cut
    // from this paragraph until confirmed; the sentence stands without it.
    'We operate across traditional marketing, digital marketing and AI solutions, and connect them through the Core3 framework into a compounding growth engine.',
    'Every service we deliver is designed to amplify the others. Your TV campaign feeds your digital retargeting. Your digital performance data informs your AI chatbot. Your AI systems capture the leads your brand campaigns create. That is the Core3 difference.',
  ],
};

/** Structural statements about how N3XUS works — not performance metrics. */
export const missionFacts = [
  { value: 'Yours', label: 'Data and ad accounts, in your name' },
  { value: 'Three', label: 'Pillars, run as one system' },
] as const;

/** Gated on CLAIMS.campaignCount / CLAIMS.zeroMarkup. */
export const missionFactsPendingConfirmation = [
  { value: '528', label: 'Campaigns delivered', claim: 'campaignCount' },
  { value: '0%', label: 'Markup on media spend', claim: 'zeroMarkup' },
] as const;

export interface Differentiator {
  n: string;
  title: string;
  body: string;
  /** When set, this item only renders if the named claim is confirmed. */
  claim?: keyof typeof CLAIMS;
}

export const differentiators: Differentiator[] = [
  {
    n: '01',
    title: 'Traditional, digital and AI under one roof',
    body: 'TV marketing, digital marketing and AI solutions, delivered by one team and connected rather than handed between agencies.',
    // Original opened "Only truly integrated full-service agency" (B3).
    // Rewritten to describe what is done, which needs no superlative.
  },
  {
    n: '02',
    title: 'A proprietary platform, not a spreadsheet',
    body: 'N3XUS Intelligence gives clients unified visibility across every channel, plus AI-driven recommendations. No spreadsheets, no switching dashboards.',
  },
  {
    n: '03',
    title: 'Generative Engine Optimisation',
    body: 'We work on how brands are found and recommended inside ChatGPT, Claude, Gemini and Perplexity — not just in search results.',
    // Original claimed "among the first agencies globally" (B2).
  },
  {
    n: '04',
    title: 'TV and digital, measured together',
    body: 'We can run a national TV campaign and the digital acquisition strategy simultaneously, and measure the halo effect between them.',
  },
  {
    n: '05',
    title: 'Deep market knowledge',
    body: 'Founded in South Africa with global reach. We understand TV broadcast, WhatsApp as a primary engagement channel, and what actually drives conversion in both local and international markets.',
  },
  {
    n: '06',
    title: 'No markup on media spend',
    body: 'We charge management fees rather than inflated media spend. Clients see exactly where every rand and dollar goes.',
    claim: 'zeroMarkup',
  },
];

export const industries = [
  'Real Estate',
  'Financial Services',
  'Insurance',
  'Retail & E-commerce',
  'Professional Services',
  'Technology',
  'Hospitality',
  'Education',
  'Sports & Lifestyle',
  'Healthcare',
] as const;

export const closing = {
  eyebrow: 'Work with us',
  title: 'Book a strategy call.',
  /** Unconditional version. The "45 minutes, no pitch" framing is A4. */
  lede: 'We map your Core3 growth opportunity and give you a clear plan — whether you work with us or not.',
  ledeWithAudit:
    '45 minutes. No pitch. We map your Core3 growth opportunity and give you a clear plan — whether you work with us or not.',
};
