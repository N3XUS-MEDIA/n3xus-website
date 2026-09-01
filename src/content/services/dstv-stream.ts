import type { ServicePageContent } from '../blocks';

/**
 * /services/dstv-stream
 *
 * Worth noting: this is the one page on the old site that handled figures
 * correctly. Every number is attributed to MultiChoice AND explicitly
 * disclaimed as platform audience data rather than N3XUS campaign results.
 * That is exactly the standard CLAUDE.md non-negotiable #5 asks for, so the
 * stats port across intact — with the source string, which the `stats` block
 * requires before it will render at all.
 */
const SOURCE =
  'Platform reach and audience figures published by MultiChoice for DStv Stream. This is audience data for the platform, not results from an N3XUS campaign.';

export const dstvStreamPage: ServicePageContent = {
  eyebrow: 'Connected TV',
  title: 'DStv Stream advertising.',
  lede: 'Put your brand in front of South Africa’s largest connected-TV audience — live sport, local general entertainment and on-demand catch-up, across smart TVs, mobile and web. We plan the format, target the audience, and connect every view back to your digital funnel.',

  blocks: [
    {
      type: 'stats',
      eyebrow: 'The platform',
      title: 'A streaming audience that keeps growing.',
      lede: 'Live viewership climbed every quarter through the 25/26 EPL and AFCON season, and catch-up viewing grew alongside it.',
      source: SOURCE,
      items: [
        { value: '127M', label: 'Peak monthly live views (March 2026, from 82.6M a year earlier)' },
        { value: '51M', label: 'Peak monthly VOD views on local GE content' },
        { value: '57%', label: 'Watched via connected TV — then mobile (32%) and web (11%)' },
        { value: '60%', label: 'Aged 25–49' },
      ],
    },

    {
      type: 'prose',
      eyebrow: 'Live & on-demand',
      title: 'One platform, two ways to reach the audience.',
      paragraphs: [
        'DStv Stream Live is live linear television — sport, news and appointment viewing — across smart TVs, desktop and mobile. It carries the same broadcast credibility as scheduled TV, with a connected-device audience layered on top.',
        'DStv Stream VOD is catch-up: local drama, reality and lifestyle titles watched on the viewer’s own schedule. Local general entertainment is consistently the most-watched genre there, which is a direct line to culturally engaged viewers.',
      ],
      points: [
        'One campaign planned across both Live and VOD inventory',
        'Sport, local drama, reality and international content',
        'Smart TV, mobile and web reached from a single buy',
        'Audience and content data available at planning stage',
      ],
    },

    {
      type: 'features',
      eyebrow: 'Ad formats',
      title: 'Built to match viewing intent.',
      lede: 'Each format is chosen for what the viewer is doing in that moment — watching, pausing, or catching up.',
      items: [
        {
          title: 'Skippable & non-skippable VOD',
          body: 'Plays before, during or after catch-up content. Up to 30 seconds, skippable after five in the skippable format, clickable on mobile and desktop with a UTM-tagged landing URL.',
          outcome: 'Reach on the big screen, measured like a digital buy',
        },
        {
          title: 'Pause screen',
          body: 'A static, non-intrusive ad appearing the moment content is paused — no competing motion or sound, and well suited to QR-code creative.',
          outcome: 'Your ad lands at the one moment attention is guaranteed',
        },
        {
          title: 'Live ads',
          body: 'Plays around live linear content — sport, news, appointment viewing. Up to 15 seconds, non-skippable, clickable, and best suited to major sporting moments.',
          outcome: 'You appear inside the moments people plan their evening around',
        },
      ],
    },

    {
      type: 'stats',
      eyebrow: 'Who you’ll reach',
      title: 'A young, economically active audience.',
      lede: 'The audience skews young and urban, with representation across income bands and a near-even gender split.',
      source: SOURCE,
      items: [
        { value: '60%', label: 'Aged 25–49, the core economically active band' },
        { value: '53 / 47', label: 'Male / female split' },
        { value: '41% / 15%', label: 'English and IsiZulu as leading home languages' },
        { value: '63%', label: 'Provincial reach led by Gauteng and Western Cape' },
      ],
    },

    {
      type: 'prose',
      eyebrow: 'What draws attention',
      title: 'Sport leads live. Local GE leads catch-up.',
      paragraphs: [
        'Sport is consistently the most-watched genre on Live, driven by the EPL season, AFCON and local rugby and cricket, with strong interest in local and international general entertainment alongside it.',
        'On VOD the pattern inverts: local drama, reality and lifestyle titles carry the viewing. Knowing which of the two your buyer is actually watching is what decides where the ad lands and how it is received — so we plan the format against the content, not the other way round.',
      ],
    },

    {
      type: 'pricingPointer',
      title: 'Priced against the buy.',
      lede: 'Streaming inventory is quoted per campaign — format, flight length, targeting and season all move the number, so a published rate card would be a guess. Bring a budget and we will tell you what it can realistically reach.',
    },

    {
      type: 'cta',
      eyebrow: 'Next step',
      title: 'Plan a streaming campaign.',
      lede: 'We will show you the audience breakdown for your category and what your budget actually buys before you commit to anything.',
      secondary: { href: '/services/brand', label: 'All brand services' },
    },
  ],
};
