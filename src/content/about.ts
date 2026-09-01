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
  title: 'Built to own the joins.',
  lede: 'N3XUS was founded on a single observation: strategy, technology and growth are sold as three separate professions, and almost every expensive business problem lives in the gaps between them. We built a firm that works across all three, and is accountable for the whole.',
};

export const mission = {
  eyebrow: 'Our mission',
  title: 'One firm, accountable end to end.',
  paragraphs: [
    'Ambitious businesses deserve advice that survives contact with implementation. Not a consultancy that leaves after the deck, a development shop that builds whatever the deck said, and an agency buying traffic for a process that cannot convert it. N3XUS was built to be one partner across all three.',
    // B1's "one of the few agencies in the world … at enterprise level" is cut
    // from this paragraph until confirmed; the sentence stands without it.
    'We work across strategy, technology and growth — the three disciplines the name refers to — and run them as one engagement rather than three workstreams that report separately.',
    'Each discipline makes the next one worth more. The diagnostic decides what gets built. What gets built decides what demand can convert. What converts tells the next diagnostic where to look. Run separately, each one caps the other two.',
  ],
};

/** Structural statements about how N3XUS works — not performance metrics. */
export const missionFacts = [
  { value: 'Yours', label: 'Data and ad accounts, in your name' },
  { value: 'Three', label: 'Disciplines, run as one engagement' },
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
    title: 'Advice and implementation from one firm',
    body: 'The people who diagnose the problem are accountable for what gets built to fix it. No handover between a strategy supplier and a delivery supplier, which is where most of the cost and all of the blame usually lives.',
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
    title: 'Recommendations that carry a number',
    body: 'Every finding is costed and sequenced against your own figures. A recommendation you cannot cost is an opinion, and opinions are why improvement lists never get actioned.',
  },
  {
    n: '05',
    title: 'Deep market knowledge',
    body: 'Founded in South Africa, working internationally. We understand WhatsApp as a primary business channel, how local buyers actually transact, and where assumptions imported from US playbooks break.',
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
  title: 'Start with a conversation.',
  /** Unconditional version. The "45 minutes, no pitch" framing is A4. */
  lede: 'We map how the business runs today and what the first piece of work should be — and you keep the findings whether or not you continue with us.',
  ledeWithAudit:
    '45 minutes. No pitch. We map how the business runs today and what the first piece of work should be — and you keep the findings whether or not you continue with us.',
};
