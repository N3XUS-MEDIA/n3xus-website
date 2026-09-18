/**
 * What a monthly retainer can be made of — names and descriptions only.
 *
 * ── Prices removed 2026-09-18 ───────────────────────────────────────────────
 * This file replaces src/content/pricing.ts, which carried a USD and ZAR price
 * for every module and drove an interactive retainer builder on /pricing.
 * Published pricing was withdrawn from the site on 18 September 2026: every
 * engagement is now quoted after a conversation, so no figure appears on any
 * page, in the assistant's answers, in structured data or in the files AI
 * crawlers read.
 *
 * The figures are not lost. The full matrix, the bundle rule and the project
 * "starting from" prices are recorded in the internal document
 * N3XUS-Pricing-Reference-2026-09-18.pdf, and the builder can be restored from
 * git history (src/content/pricing.ts, src/lib/retainer.ts and
 * src/ui/marketing/RetainerBuilder.tsx, in the commit before the one that
 * removed them).
 *
 * Do not add a `price` field back here without deciding to publish pricing
 * again. src/content/positioning.test.ts fails if a currency figure reappears
 * in site copy or the public files.
 */

export interface RetainerModule {
  id: string;
  name: string;
  scope: string;
  /** Base OS only — every retainer starts on it. */
  required?: boolean;
}

export interface RetainerArea {
  id: string;
  name: string;
  modules: RetainerModule[];
}

export const RETAINER_AREAS: RetainerArea[] = [
  {
    id: 'core',
    name: 'Core Infrastructure',
    modules: [
      {
        id: 'base-os',
        name: 'Base Website OS & Admin Backend',
        scope:
          'Hosting, speed and security monitoring, database management, CRM integration, uptime SLAs.',
        required: true,
      },
    ],
  },
  {
    id: 'visibility',
    name: 'Search & Generative AI Visibility',
    modules: [
      {
        id: 'seo-technical',
        name: 'Technical & On-Page SEO',
        scope:
          'Schema markup, metadata optimisation, technical health, Google Business Profile management.',
      },
      {
        id: 'geo',
        name: 'Generative Engine Optimization (GEO)',
        scope:
          'Entity mapping so ChatGPT, Claude, Gemini and Perplexity cite your brand as a top industry answer.',
      },
      {
        id: 'articles',
        name: '2× High-Intent Search & AI Articles',
        scope: 'Deep-dive long-form content formatted specifically for search indexation and LLM retrieval.',
      },
    ],
  },
  {
    id: 'social',
    name: 'Content Creation & Social Media',
    modules: [
      {
        id: 'social-light',
        name: 'Light Social (8 posts / month)',
        scope: '2 posts per week across 2 platforms. Includes copywriting, custom AI graphics and scheduling.',
      },
      {
        id: 'social-growth',
        name: 'Growth Social (12 posts + 2 carousels)',
        scope: '3 posts per week plus 2 carousel decks across LinkedIn, Meta or X. Full management.',
      },
      {
        id: 'short-form-video',
        name: 'AI Short-Form Video (4 reels / month)',
        scope: 'Scripting, AI voice synthesis, motion graphics, captions and distribution.',
      },
    ],
  },
  {
    id: 'agents',
    name: 'Conversational AI & Lead Capture',
    modules: [
      {
        id: 'web-bot',
        name: 'Website Service & Lead Capture Bot',
        scope:
          'Trained on your FAQs, product catalogue and sales scripts. Automates capture and email/SMS routing.',
      },
      {
        id: 'omnichannel-bot',
        name: 'Omnichannel WhatsApp & Meta Bot',
        scope:
          'WhatsApp Business API integration plus Meta DM bot. Multi-step lead qualification and live CRM sync.',
      },
      {
        id: 'phone-assistant',
        name: '24/7 AI Inbound Phone Assistant',
        scope: 'Voice agent answering calls, qualifying leads and booking appointments directly to calendar.',
      },
    ],
  },
  {
    id: 'performance',
    name: 'Performance Marketing & Workflows',
    modules: [
      {
        id: 'paid-ads',
        name: 'Paid Ads Operations (Google or Meta)',
        scope:
          'Campaign strategy, ad copy, visual assets, daily budget management and weekly ROI tracking.',
      },
      {
        id: 'workflow-automation',
        name: 'Custom AI Business Workflow Automation',
        scope: 'Zapier/Make/API connections for automated quoting, client onboarding or internal reporting.',
      },
    ],
  },
];

export const ALL_MODULES: RetainerModule[] = RETAINER_AREAS.flatMap((a) => a.modules);
