import type { ServicePageContent } from '../blocks';

/**
 * /services/strategy — the first pillar, and the new front door.
 *
 * This page is written rather than ported: the old site had no strategy page,
 * because it was positioned as a marketing agency where strategy was a free
 * pre-sales step ("book a free audit") rather than the work itself.
 *
 * Deliberately grounded in what already happens. The diagnostic described here
 * is the same engagement the old site called "the audit" — mapping how the
 * business operates, finding where revenue leaks, and sequencing the fixes.
 * That was always consultancy work; it was being given away to sell retainers.
 * Nothing here claims a capability the business does not already exercise.
 */
export const strategyPage: ServicePageContent = {
  eyebrow: 'Strategy',
  title: 'Work out what to fix first, and what it is worth.',
  lede: 'Most businesses do not have a strategy problem in the abstract. They have three suppliers, six tools, no single view of what is working, and a list of improvements nobody has costed. We map how the business actually operates, quantify where it leaks, and sequence the fixes so the first one pays for the next.',

  blocks: [
    {
      type: 'prose',
      eyebrow: 'The problem with most advice',
      title: 'A recommendation you cannot cost is an opinion.',
      paragraphs: [
        'Plenty of people will tell you to “invest in AI” or “fix your funnel”. Very few will tell you what it costs you today, what it would return, and which of the four things on the list to do first. Without that, every option looks equally plausible and the default is to do none of them.',
        'Our diagnostic produces numbers, not adjectives. Where the revenue leaks, how much each leak is worth annually, what fixing it costs, and the order that makes each subsequent fix cheaper. If the honest answer is that you should spend the money elsewhere — or not at all this quarter — that is what the document says.',
      ],
      points: [
        'Findings written down, and yours to keep either way',
        'Every recommendation carries a cost and an expected return',
        'A sequence, not a wish list',
        'Explicit about what we would not do, and why',
      ],
    },

    {
      type: 'features',
      eyebrow: 'What we advise on',
      title: 'The three questions that decide the next two years.',
      columns: 3,
      items: [
        {
          title: 'Operating model',
          body: 'How work actually moves through the business — who touches an enquiry, where it waits, what gets re-keyed, and which steps exist only because a tool cannot talk to another tool. Usually the cheapest capacity you own.',
          outcome: 'Capacity found before anyone is hired',
        },
        {
          title: 'Technology direction',
          body: 'What to build, what to buy, what to connect and what to retire. Which systems are load-bearing, which are habit, and where an AI capability genuinely changes the economics rather than adding a subscription.',
          outcome: 'Spend directed at the constraint, not the trend',
        },
        {
          title: 'Growth economics',
          body: 'What a customer actually costs to acquire, which channels are carrying the others, and whether the constraint is demand at all — because frequently the pipeline is fine and the conversion of it is not.',
          outcome: 'You stop buying traffic a broken process wastes',
        },
      ],
    },

    {
      type: 'process',
      eyebrow: 'How an engagement runs',
      title: 'What exists at the end of each stage.',
      lede: 'Short, scoped and documented. You should be able to act on the output whether or not we do the implementation.',
      steps: [
        {
          n: '01',
          title: 'Diagnostic',
          body: 'We map the operating model as it really is — interviews, systems, the actual path an enquiry takes — and quantify where revenue and hours are lost. You end up with a written map and a number against each leak.',
        },
        {
          n: '02',
          title: 'Options & sequence',
          body: 'Each fix costed, with an expected return and a dependency order. You end up able to say what happens first, what it should produce, and how you will know if it did not.',
        },
        {
          n: '03',
          title: 'Decision support',
          body: 'We take the plan through the conversation with whoever has to approve it — board, partners, a bank — and answer the hard version of the questions rather than the flattering one.',
        },
        {
          n: '04',
          title: 'Implementation or handover',
          body: 'We build it, your team builds it, or a third party does. The plan is written to survive either way, because a strategy that only works if we deliver it is a sales document.',
        },
      ],
    },

    {
      type: 'prose',
      eyebrow: 'Why it sits first',
      title: 'The other two pillars are downstream of this one.',
      paragraphs: [
        'Technology built without a diagnostic automates whatever the business already does, including the parts it should stop doing. Growth spend without one buys traffic for a process that cannot convert it. Both are expensive ways to discover what an inexpensive piece of work would have told you.',
        'That is the argument for doing this first — and it is also why we will say plainly when the answer is that you do not need us for the next part.',
      ],
    },

    { type: 'faq', items: [] },

    {
      type: 'cta',
      eyebrow: 'Next step',
      title: 'Start with the diagnostic.',
      lede: 'A conversation about how the business actually runs, and what the first piece of work should be. You keep whatever we find.',
      secondary: { href: '/services', label: 'See all three pillars' },
    },
  ],

  faqs: [
    {
      q: 'Is this just a sales process for the implementation work?',
      a: 'It would be if the findings only made sense with us delivering them. They are written to be actionable by your own team or another supplier, and you keep them either way. We would rather lose the build and be right than win it and be wrong.',
    },
    {
      q: 'How long does a diagnostic take?',
      a: 'Weeks rather than months, and scoped up front. A diagnostic that takes a quarter has usually become the project rather than the thing that decides the project.',
    },
    {
      q: 'What do you need from us?',
      a: 'Access to the people who actually do the work, and honest numbers. Not a data room. Most of what matters comes out of watching how an enquiry, a quote or an invoice really moves — which is rarely how the process document says it moves.',
    },
    {
      q: 'What if the answer is that we should do nothing?',
      a: 'Then that is the finding, and you have it in writing with the reasoning. That is a legitimate outcome and it happens. Spending is not the same as progress.',
    },
  ],
};
