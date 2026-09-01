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
  title: 'We’re who you call when the business has outgrown how it’s run.',
  lede: 'Most business owners we meet aren’t short of ideas or effort. They’re short of a straight answer about what to do next — because the advice comes from one place, the building from another, and the marketing from a third, and none of them can see the whole thing. We do all three, so someone can.',
};

export const mission = {
  eyebrow: 'Our mission',
  title: 'One team who can see the whole picture.',
  paragraphs: [
    'Advice is easy to give and expensive to act on badly. A consultancy hands you a deck and leaves. A developer builds exactly what the deck said, whether or not it was right. An agency sends traffic to a business that can’t handle it. Everyone did their job. Nothing got better.',
    // B1's "one of the few agencies in the world … at enterprise level" is cut
    // from this paragraph until confirmed; the sentence stands without it.
    'We work across all three — strategy, intelligence and growth, which is what the 3 in N3XUS stands for. Same team, same numbers, one person you can call.',
    'It also means we can tell you not to spend money. If the honest answer is that your website is fine and the real problem is how quotes get sent, that’s what we’ll say — which is harder to do when you only sell websites.'
  ],
};

/** Structural statements about how N3XUS works — not performance metrics. */
export const missionFacts = [
  { value: 'Yours', label: 'Your data and accounts stay in your name' },
  { value: 'Three', label: 'Strategy, intelligence, growth — one team' },
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
    body: 'The people who work out what’s wrong are the same people who fix it. Nothing gets lost in a handover, and there’s nobody to point at when something doesn’t work.',
    // Original opened "Only truly integrated full-service agency" (B3).
    // Rewritten to describe what is done, which needs no superlative.
  },
  {
    n: '02',
    title: 'One screen instead of five logins',
    body: 'Everything we run for you reports into one place, so you can answer “how did last month go?” without asking three people and rebuilding a spreadsheet.',
  },
  {
    n: '03',
    title: 'We get you found in AI, not just Google',
    body: 'Your customers are starting to ask ChatGPT and Gemini who to use. We make sure those tools can read your business, and put your name in the answer.',
    // Original claimed "among the first agencies globally" (B2).
  },
  {
    n: '04',
    title: 'You get numbers, not opinions',
    body: 'Everything we suggest comes with what it costs and what it should bring back, worked out from your numbers. So you’re making a decision, not taking our word for it.'
  },
  {
    n: '05',
    title: 'We know this market',
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
  title: 'Tell us what’s bothering you.',
  /** Unconditional version. The "45 minutes, no pitch" framing is A4. */
  lede: 'One conversation, no deck, no pressure. We’ll tell you what we’d look at first and roughly what it would take — and you keep that whether or not you work with us.',
  ledeWithAudit:
    '45 minutes, no pitch. We’ll tell you what we’d look at first and roughly what it would take — and you keep that whether or not you work with us.',
};
