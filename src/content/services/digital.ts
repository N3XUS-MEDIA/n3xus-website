import type { ServicePageContent } from '../blocks';

/**
 * /services/digital
 *
 * Every monthly figure on the old page is removed. It listed its own rate card
 * — Basic SEO $185/mo, Standard $345, Advanced $630; Google Ads management
 * $160/$290/$500; social $240/$395/$630; and so on — which now contradicts the
 * retainer matrix in src/content/pricing.ts (Technical SEO $250, GEO $350,
 * Light Social $300, Growth Social $500, Paid Ads $500). Claims register C1/C3:
 * the retainer builder is the single source for anything monthly.
 *
 * One-off setup fees are project pricing and are not superseded, but they are
 * held back here too — several of them ($240 setup, $290 GA4) sat inside the
 * same tables as the retired monthly rates, so they need confirming as current
 * before being republished on their own.
 */
export const digitalPage: ServicePageContent = {
  eyebrow: 'Growth & demand',
  title: 'Get found by the people already looking for you.',
  lede: 'SEO that ranks, ads that convert, content that compounds and pages that close — connected, so you can see which of them actually produced the revenue.',

  blocks: [
    {
      type: 'features',
      eyebrow: 'What we deliver',
      title: 'The demand side of the system.',
      columns: 2,
      items: [
        {
          title: 'SEO & technical search',
          body: 'Technical, on-page and off-page SEO built around commercial intent rather than vanity keywords, plus the Core Web Vitals and site health work that protects the rankings you earn.',
          outcome: 'Traffic that arrives already wanting to buy',
        },
        {
          title: 'LLM marketing & GEO',
          body: 'Generative Engine Optimisation: structured data, semantic architecture and llms.txt so ChatGPT, Claude, Gemini and Perplexity can read, trust and cite you when a buyer asks for a recommendation.',
          outcome: 'You become the answer, not the tenth blue link',
        },
        {
          title: 'Google Ads',
          body: 'Performance campaigns in front of high-intent buyers at the moment they are searching, with budget pacing and landing pages engineered to convert the traffic they buy.',
          // Original outcome asserted "No media markup — every dollar is
          // accounted for" (claims register A2).
          outcome: 'Spend you can trace, campaign by campaign',
        },
        {
          title: 'Meta ads',
          body: 'Audience-targeted social advertising with creative testing, funnel work and retargeting that brings the cost of a qualified lead down rather than the volume up.',
          outcome: 'You pay less for each enquiry worth having',
        },
        {
          title: 'Web development & CRO',
          body: 'Landing pages through to full applications — fast, accessible and built to convert — plus testing and friction removal on the paths that already carry your traffic.',
          outcome: 'The page stops losing the traffic you paid to send it',
        },
        {
          title: 'Social & content',
          body: 'Planning, production, approvals and scheduled publishing across the channels your buyers actually use, with the blog and article engine behind it.',
          outcome: 'A consistent presence without a full-time hire',
        },
        {
          title: 'Email & lifecycle',
          body: 'Onboarding, nurture, reactivation and post-purchase sequences that fire off real behaviour in your CRM rather than a generic monthly newsletter.',
          outcome: 'Revenue from customers you already paid to win',
        },
        {
          title: 'Analytics & attribution',
          body: 'GA4 and dashboards set up properly, with multi-touch attribution so the question "which channel produced this sale" has an answer.',
          outcome: 'You finally know which channel actually paid',
        },
      ],
    },

    {
      type: 'prose',
      eyebrow: 'The new frontier',
      title: 'Get found where your customers are now asking.',
      paragraphs: [
        'Most businesses invest heavily in ranking on Google. Very few have thought about what happens when a potential client opens ChatGPT, Claude or Gemini and asks which company they should use for the work you do.',
        'Those systems do not return ten links. They return an answer — usually one to three named businesses. Being cited depends on whether your site is structured, credible and machine-readable enough for the model to rely on. Most sites are not, which is exactly why the position is still available.',
      ],
      points: [
        'Structured data and entity mapping so models can identify who you are',
        'Semantic architecture that makes your expertise machine-readable',
        'An llms.txt that tells AI crawlers what matters and where it lives',
        'Monitoring of how assistants actually describe you today',
      ],
    },

    {
      type: 'pricingPointer',
      title: 'Priced as modules, not packages.',
      lede: 'Search visibility, GEO, social and paid media are retainer modules on top of the Website OS base. Build the combination you need and see the monthly figure before you speak to anyone.',
    },

    { type: 'faq', items: [] },

    {
      type: 'cta',
      eyebrow: 'Next step',
      title: 'Ready to grow your digital presence?',
      lede: 'The audit shows where demand is leaking today and what fixing each part is worth — and you keep the findings either way.',
      secondary: { href: '/services/website-os', label: 'Website Operating System' },
    },
  ],

  faqs: [
    {
      q: 'How long before SEO shows results?',
      a: 'Technical fixes can move things within weeks; content and authority work compound over months, not days. Anyone promising you page one by a fixed date is selling you something they cannot control. The audit sets a realistic timeline per workstream before you commit.',
    },
    {
      q: 'What is GEO, and is it different from SEO?',
      a: 'Related but not the same. SEO optimises for a ranked list of links; GEO optimises for being the business an AI assistant names when someone asks for a recommendation. They share foundations — structured data, site health, credible content — but the target and the measurement differ.',
    },
    {
      q: 'Do you take a cut of our ad spend?',
      a: 'We charge a management fee. Media budget goes to the platform, in your own ad accounts, which you own and can see directly.',
    },
    {
      q: 'Can you work with our existing website?',
      a: 'Usually yes. Where the site itself is the bottleneck we will say so rather than spend your budget sending traffic to a page that cannot convert it.',
    },
  ],
};
