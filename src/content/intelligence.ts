import type { ServicePageContent } from './blocks';

/**
 * /intelligence
 *
 * The old page opened with a fabricated dashboard — 38 enquiries, 21 quotes,
 * 12 booked, channel scores of 78/92/66/71/55 and a "Lead Velocity" chart —
 * presented as a live product screenshot with "Updated just now" on it. None
 * of it was real. Same problem as the homepage mock: invented precision,
 * client-facing, non-negotiable #5.
 *
 * It is not replaced with a different invented mock. A real screenshot of the
 * product is the right asset here, and the page reads honestly without one
 * until that exists.
 *
 * Note for whoever adds it: docs/context/STATE.md records that
 * apps/intelligence cannot currently boot, so there is nothing to screenshot
 * yet. That is the actual blocker, and dressing over it with a mock is what
 * the old page did.
 */
export const intelligencePage: ServicePageContent = {
  eyebrow: 'Proprietary platform',
  title: 'N3XUS Intelligence.',
  lede: 'One dashboard connecting every channel — broadcast reach, digital conversions, social performance and AI interactions — so the question “which of these actually produced revenue” has an answer you can see.',

  blocks: [
    {
      type: 'features',
      eyebrow: 'Platform capabilities',
      title: 'Stop assembling the month out of five dashboards.',
      lede: 'No spreadsheets, no switching between platforms. Every data point from every channel, in one place, with the analysis already done.',
      columns: 2,
      items: [
        {
          title: 'Unified cross-channel dashboard',
          body: 'Broadcast reach, Google Ads, Meta Ads, SEO rankings, social metrics and AI assistant interactions in a single live view, with custom KPI widgets and an executive summary.',
          outcome: 'Decisions stop waiting on a monthly spreadsheet',
        },
        {
          title: 'Live platform integrations',
          body: 'Direct API connections to Google Ads and GA4, Meta Ads Manager, LinkedIn Campaign Manager and Search Console. Data flows on its own.',
          outcome: 'No manual exports, and no stale numbers in the meeting',
        },
        {
          title: 'Campaign optimisation signals',
          body: 'Recommendations on budget allocation, audience targeting, bid adjustment and creative rotation, generated from your live data — budget reallocation signals, underperforming ad detection, creative fatigue alerts.',
          outcome: 'Budget moves to what works without waiting for review day',
        },
        {
          title: 'Automated reporting',
          body: 'Weekly and monthly performance reports generated and delivered without anyone assembling them, in a branded, stakeholder-ready format.',
          outcome: 'The report arrives without anyone losing a day to it',
        },
        {
          title: 'Lead intelligence',
          body: 'Every lead tracked from first touch to closed deal: full conversion path, source attribution, CRM sync and revenue attribution modelling.',
          outcome: 'You know which channel produced each sale, and what it cost',
        },
        {
          title: 'Competitor monitoring',
          body: 'Competitor keyword tracking, ranking movement alerts, content gap analysis and share-of-voice tracking.',
          outcome: 'You hear about their move before it costs you position',
        },
        {
          title: 'Content generation',
          body: 'On-brand articles, ad copy, email campaigns and landing page content generated inside the platform, working from your own brand voice rather than a generic model default.',
          outcome: 'The content calendar stops being the bottleneck',
        },
        {
          title: 'Ownership & governance',
          body: 'Roles and permissions, audit trails, full data export, and your own accounts with every tool connected.',
          outcome: 'You own the system — there is no box to be locked into',
        },
      ],
    },

    {
      type: 'prose',
      eyebrow: 'Why it exists',
      title: 'Three programmes, one set of numbers.',
      paragraphs: [
        'Running systems, demand and brand together only pays if you can see them together. Otherwise you are running three programmes and guessing which one produced the revenue — which is precisely the position most businesses are in with three separate agencies and three separate reports.',
        'Intelligence is the layer underneath the other three. Every campaign, workflow and enquiry reports into it, so attribution is a property of the system rather than a monthly reconstruction someone does by hand.',
      ],
      points: [
        'Every channel reporting into one screen, live',
        'Attribution that survives a channel being switched off',
        'Reports generated rather than assembled',
        'Included with every retainer, not sold separately',
      ],
    },

    {
      type: 'cta',
      eyebrow: 'Next step',
      title: 'See it against your own numbers.',
      lede: 'A walkthrough using your channels and your data, so you can judge whether it tells you anything your current reporting doesn’t.',
      secondary: { href: '/pricing', label: 'Build your retainer' },
    },
  ],
};
