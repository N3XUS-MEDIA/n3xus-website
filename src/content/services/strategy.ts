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
  title: 'Work out what to fix first — before you spend anything.',
  lede: 'Most people we meet already have a list of things they know they should sort out. What they don’t have is a way to tell which one is actually costing them the most, or what fixing it would be worth. We work that out with you, put real numbers against it, and tell you what to do first.',

  blocks: [
    {
      type: 'prose',
      eyebrow: 'Why this comes first',
      title: 'Advice is cheap. Knowing what it’s worth isn’t.',
      paragraphs: [
        'Plenty of people will tell you to invest in AI, or fix your funnel, or rebuild your website. Almost none of them will tell you what your current setup is costing you, what the fix would bring back, and which of the four things on the list to do first. So every option sounds equally sensible, and the easiest decision is to do none of them for another quarter.',
        'We give you numbers instead. Where the money is going, roughly what each problem costs you over a year, what it would take to fix, and what order to do things in. If the honest answer is that you should spend the money somewhere else — or not spend it at all right now — that’s what we’ll tell you. We’d rather be useful than booked.'
      ],
      points: [
        'You get it in writing, and it’s yours either way',
        'Every suggestion comes with what it costs and what it should return',
        'A list in order, not a wish list',
        'We tell you what we wouldn’t bother with, and why',
      ],
    },

    {
      type: 'features',
      eyebrow: 'What we advise on',
      title: 'The three things we look at.',
      columns: 3,
      items: [
        {
          title: 'How the work actually flows',
          body: 'We follow a real enquiry through your business — who touches it, where it sits waiting, what gets typed in twice, and which steps only exist because two systems don’t talk. This is usually where the cheapest wins are hiding.',
          outcome: 'You find hours you’re already losing, before hiring anyone'
        },
        {
          title: 'What to build, buy, or bin',
          body: 'What to build, what to buy, what to connect and what to retire. Which systems are load-bearing, which are habit, and where an AI capability genuinely changes the economics rather than adding a subscription.',
          outcome: 'You spend on what’s holding you back, not what’s fashionable'
        },
        {
          title: 'What a customer really costs you',
          body: 'What you’re really paying to win each customer, which channels are quietly carrying the rest, and whether you have a demand problem at all — because more often the enquiries are fine and what happens to them isn’t.',
          outcome: 'You stop paying for enquiries that go nowhere'
        },
      ],
    },

    {
      type: 'process',
      eyebrow: 'How an engagement runs',
      title: 'What exists at the end of each stage.',
      lede: 'Short, fixed scope, written down. You should be able to act on it whether we do the work or someone else does.',
      steps: [
        {
          n: '01',
          title: 'Diagnostic',
          body: 'We talk to the people doing the work, look at the systems, and follow what really happens to an enquiry. You end up with a written picture of how the business runs and a number against each problem.',
        },
        {
          n: '02',
          title: 'Options, in order',
          body: 'Each fix priced, with what it should bring back and what has to happen before it. You end up able to say what’s first, what it’s worth, and how you’ll know if it didn’t work.'
        },
        {
          n: '03',
          title: 'Getting it approved',
          body: 'If you have to get this past a board, a business partner or a bank, we’ll sit in that meeting and answer the difficult questions with you rather than leaving you to defend our work alone.',
        },
        {
          n: '04',
          title: 'Building it, or handing it over',
          body: 'We build it, your team builds it, or somebody else does. It’s written to work either way — a plan that only works if we deliver it isn’t a plan, it’s a sales document.'
        },
      ],
    },

    {
      type: 'prose',
      eyebrow: 'Why it’s first',
      title: 'Why we always start here.',
      paragraphs: [
        'Build systems before you’ve worked out the problem and you just make the business do the wrong thing faster. Spend on marketing first and you pay to send people to a business that can’t handle them. Both are expensive ways of finding out what a much cheaper piece of work would have told you.',
        'It’s also why we’ll happily tell you when you don’t need us for the next bit.'
      ],
    },

    { type: 'faq', items: [] },

    {
      type: 'cta',
      eyebrow: 'Next step',
      title: 'Start with a conversation.',
      lede: 'Tell us what’s going wrong and we’ll tell you what we’d look at first. No deck, no pressure, and you keep whatever we work out.',
      secondary: { href: '/services', label: 'See all three pillars' },
    },
  ],

  faqs: [
    {
      q: 'Is this just a sales pitch for the bigger job?',
      a: 'Fair question. It’s written so your own team or another supplier could act on it, and you keep it either way. We’d rather lose the build and have told you the truth than win it and be wrong.',
    },
    {
      q: 'How long does a diagnostic take?',
      a: 'Weeks, not months, and we agree the scope up front. If working out what to do takes a whole quarter, it has stopped being the thing that decides the project and become the project.',
    },
    {
      q: 'What do you need from us?',
      a: 'Time with the people who actually do the work, and honest numbers. Not a data room. Most of what matters comes from watching how a quote or an invoice really moves through the business, which is rarely how the process document says it does.',
    },
    {
      q: 'What if the answer is that we should do nothing?',
      a: 'Then that’s what we’ll tell you, in writing, with the reasoning. It happens. Spending money isn’t the same as making progress, and you’ll remember who told you that.',
    },
  ],
};
