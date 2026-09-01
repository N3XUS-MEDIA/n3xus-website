import type { ServicePageContent } from '../blocks';

/**
 * /services/brand
 *
 * The old page's "Why TV Still Dominates" section leaned on four assertions
 * with no source: that broadcast "reaches households digital targeting never
 * touches", that "the TV halo effect measurably lifts digital conversion
 * rates", that it reaches "millions", and that recall "compounds over time".
 * Those are empirical claims about media effectiveness, not opinions, and
 * CLAUDE.md non-negotiable #5 applies to them.
 *
 * The section is kept — the argument is a real one and worth making — but
 * rewritten so it says what N3XUS does and measures, rather than asserting
 * industry effects it has not sourced. If Jared has the research (BARB, Nielsen,
 * Thinkbox and the SA equivalents publish exactly this), the stronger version
 * can come back WITH the citation, via a `stats` block, which refuses to render
 * without a source.
 */
export const brandPage: ServicePageContent = {
  eyebrow: 'Brand & market presence',
  title: 'Look like the obvious choice before anyone calls.',
  lede: 'Positioning, identity, broadcast and physical presence — the work that decides whether a buyer takes you seriously before they have spoken to you. Planned so it connects to your digital acquisition rather than running beside it.',

  blocks: [
    {
      type: 'features',
      eyebrow: 'What we deliver',
      title: 'Brand work, and the channels that carry it.',
      columns: 2,
      items: [
        {
          title: 'Brand identity & strategy',
          body: 'Positioning, messaging hierarchy, identity system and guidelines — the work that makes a business look the size it actually is, applied consistently enough to be recognised.',
          outcome: 'You stop losing deals to competitors who only look bigger',
        },
        {
          title: 'Television advertising',
          body: 'National broadcast campaigns end to end: concept, scripting, production, post, media buying, scheduling and delivery, with brand recall measured after the flight rather than assumed.',
          outcome: 'Credibility at a scale performance ads cannot buy',
        },
        {
          title: 'Streaming & CTV',
          body: 'Connected-TV and streaming placement, including DStv Stream — the same authority signal as broadcast, bought against a targetable, measurable audience.',
          outcome: 'Broadcast presence with digital-grade reporting',
        },
        {
          title: 'Content & video production',
          body: 'Commercials, brand films, corporate video and social-native content — the creative that feeds every paid channel rather than one campaign.',
          outcome: 'Creative that stops the scroll instead of blending in',
        },
        {
          title: 'Brand activations',
          body: 'Experiential events, pop-ups and integrated campaigns that put the brand physically in front of people, built so the moment produces content rather than just attendance.',
          outcome: 'Word-of-mouth that outlives the campaign',
        },
        {
          title: 'Sponsorship & OOH',
          body: 'Sponsorship of sport, broadcast and cultural properties, plus billboards, transit and ambient placement — with geo-targeted digital retargeting behind them.',
          outcome: 'Your name sits where your buyers already pay attention',
        },
      ],
    },

    {
      type: 'prose',
      eyebrow: 'Why broadcast still matters',
      title: 'Television is not a legacy channel.',
      paragraphs: [
        'There is a persistent belief that broadcast is finished and every rand belongs in performance. Businesses acting on that assumption compete only where their competitors already are, on the channels where the cost of a click rises every year.',
        'Broadcast and physical presence do something performance advertising structurally cannot: they make a business look established to people who were not searching for it. That is an authority signal, and it is why the same digital campaign converts differently for a brand somebody has already heard of.',
        'What we will not do is quote you an industry statistic to prove it. We plan the campaign so its effect on your digital performance is measurable — brand recall measured after the flight, and the lift in your own conversion rates tracked against it — so the argument is settled by your numbers rather than someone else’s case study.',
      ],
      points: [
        'Campaigns planned to be measured, not just delivered',
        'Brand recall measured after the flight',
        'Broadcast timing connected to your digital retargeting',
        'Reported through N3XUS Intelligence alongside every other channel',
      ],
    },

    {
      type: 'pricingPointer',
      title: 'Brand work is scoped, not listed.',
      lede: 'Identity, production and broadcast are quoted per project — reach, flight length and production scope decide the number, and a rate card would be a guess. Ongoing brand and content support runs as retainer modules.',
    },

    { type: 'faq', items: [] },

    {
      type: 'cta',
      eyebrow: 'Next step',
      title: 'Ready to build the brand at scale?',
      lede: 'We will tell you honestly whether broadcast is the right next spend for your stage — including when the answer is to fix the system it would drive traffic into first.',
      secondary: { href: '/services/dstv-stream', label: 'DStv Stream advertising' },
    },
  ],

  faqs: [
    {
      q: 'Is television affordable for a business our size?',
      a: 'It depends on the flight and the placement far more than most people expect, and streaming and regional buys have moved the entry point a long way down. The honest answer needs your budget and your market in front of us — and sometimes the answer is that the money is better spent elsewhere first.',
    },
    {
      q: 'How do you measure whether it worked?',
      a: 'Brand recall measurement after the flight, and the lift in your own digital conversion rates during and after it, tracked in the same dashboard as everything else. Broadcast is harder to attribute than a click, which is a reason to instrument it carefully rather than a reason to skip measuring it.',
    },
    {
      q: 'Do you produce the commercial as well as buy the media?',
      a: 'Yes — concept, script, shoot, post and delivery. Handing production and media to two suppliers is where most of the cost and most of the delay comes from.',
    },
    {
      q: 'Should we do brand work before or after the digital system?',
      a: 'Usually after. Driving broadcast-scale attention at a website that cannot book, quote or qualify wastes most of it. The audit will say plainly which order makes sense for you.',
    },
  ],
};
