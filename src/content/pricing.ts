/**
 * The single source of truth for retainer pricing.
 *
 * Read by: the /pricing retainer builder, the proposal summary it generates,
 * the JSON-LD Offer list, and the Aria system prompt. Before this file existed
 * those were four independently hand-edited copies, which is exactly how the
 * old site ended up quoting three different figures for the same retainer
 * ($500/$1,000/$2,000 on the pricing page, $500/$1,025/$2,025 in one chat
 * widget's prompt, and a fourth set in the homepage JSON-LD).
 *
 * ── On the ZAR column ───────────────────────────────────────────────────────
 * ZAR is stored explicitly, never computed from USD. The published rates are
 * hand-rounded to neat figures and the implied exchange rate drifts between
 * R17.86 and R18.13 per dollar across the matrix. Deriving them would quietly
 * contradict the signed proposal PDF, so both columns are data.
 *
 * Source: N3XUS_Media_Custom_Retainer_Configurator.pdf (Ref: N3X-2026-8842).
 */

export type CurrencyCode = 'USD' | 'ZAR';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** Shown beside the switcher so the discount is never an unexplained number. */
  note?: string;
}

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: 'USD', symbol: '$', label: 'Global' },
  ZAR: {
    code: 'ZAR',
    symbol: 'R',
    label: 'South Africa',
    note: 'Local rate — 20% off. Applies to entities registered and operating in South Africa.',
  },
};

/** The badges that appear against a module in the proposal document. */
export type ModuleBadge = 'AI ENGINE' | 'AI MEDIA' | 'AI BOT' | 'AI VOICE';

export interface RetainerModule {
  id: string;
  name: string;
  scope: string;
  badge?: ModuleBadge;
  price: Record<CurrencyCode, number>;
  /** Base OS only. Always selected, cannot be removed. */
  required?: boolean;
}

export interface RetainerPillar {
  id: string;
  /** Section number as it appears in the proposal document. */
  index: number;
  name: string;
  /** Whether a selection here counts toward the multi-module bundle discount. */
  countsTowardBundle: boolean;
  modules: RetainerModule[];
}

export const PILLARS: RetainerPillar[] = [
  {
    id: 'core',
    index: 1,
    name: 'Core Infrastructure',
    countsTowardBundle: false, // mandatory, so it can't distinguish one build from another
    modules: [
      {
        id: 'base-os',
        name: 'Base Website OS & Admin Backend',
        scope:
          'Hosting, speed and security monitoring, database management, CRM integration, uptime SLAs.',
        price: { USD: 450, ZAR: 6500 },
        required: true,
      },
    ],
  },
  {
    id: 'visibility',
    index: 2,
    name: 'Search & Generative AI Visibility',
    countsTowardBundle: true,
    modules: [
      {
        id: 'seo-technical',
        name: 'Technical & On-Page SEO',
        scope:
          'Schema markup, metadata optimisation, technical health, Google Business Profile management.',
        price: { USD: 250, ZAR: 3600 },
      },
      {
        id: 'geo',
        name: 'Generative Engine Optimization (GEO)',
        scope:
          'Entity mapping so ChatGPT, Claude, Gemini and Perplexity cite your brand as a top industry answer.',
        badge: 'AI ENGINE',
        price: { USD: 350, ZAR: 5000 },
      },
      {
        id: 'articles',
        name: '2× High-Intent Search & AI Articles',
        scope:
          'Deep-dive long-form content formatted specifically for search indexation and LLM retrieval.',
        price: { USD: 300, ZAR: 4300 },
      },
    ],
  },
  {
    id: 'social',
    index: 3,
    name: 'Content Creation & Social Media',
    countsTowardBundle: true,
    modules: [
      {
        id: 'social-light',
        name: 'Light Social (8 posts / month)',
        scope:
          '2 posts per week across 2 platforms. Includes copywriting, custom AI graphics and scheduling.',
        price: { USD: 300, ZAR: 4300 },
      },
      {
        id: 'social-growth',
        name: 'Growth Social (12 posts + 2 carousels)',
        scope:
          '3 posts per week plus 2 carousel decks across LinkedIn, Meta or X. Full management.',
        price: { USD: 500, ZAR: 7200 },
      },
      {
        id: 'short-form-video',
        name: 'AI Short-Form Video (4 reels / month)',
        scope: 'Scripting, AI voice synthesis, motion graphics, captions and distribution.',
        badge: 'AI MEDIA',
        price: { USD: 400, ZAR: 5800 },
      },
    ],
  },
  {
    id: 'agents',
    index: 4,
    name: 'Conversational AI & Lead Capture',
    countsTowardBundle: true,
    modules: [
      {
        id: 'web-bot',
        name: 'Website Service & Lead Capture Bot',
        scope:
          'Trained on your FAQs, product catalogue and sales scripts. Automates capture and email/SMS routing.',
        badge: 'AI BOT',
        price: { USD: 200, ZAR: 2900 },
      },
      {
        id: 'omnichannel-bot',
        name: 'Omnichannel WhatsApp & Meta Bot',
        scope:
          'WhatsApp Business API integration plus Meta DM bot. Multi-step lead qualification and live CRM sync.',
        badge: 'AI BOT',
        price: { USD: 350, ZAR: 5000 },
      },
      {
        id: 'phone-assistant',
        name: '24/7 AI Inbound Phone Assistant',
        scope:
          'Voice agent answering calls, qualifying leads and booking appointments directly to calendar.',
        badge: 'AI VOICE',
        price: { USD: 450, ZAR: 6500 },
      },
    ],
  },
  {
    id: 'performance',
    index: 5,
    name: 'Performance Marketing & Workflows',
    countsTowardBundle: true,
    modules: [
      {
        id: 'paid-ads',
        name: 'Paid Ads Operations (Google or Meta)',
        scope:
          'Campaign strategy, ad copy, visual assets, daily budget management and weekly ROI tracking.',
        price: { USD: 500, ZAR: 7200 },
      },
      {
        id: 'workflow-automation',
        name: 'Custom AI Business Workflow Automation',
        scope:
          'Zapier/Make/API connections for automated quoting, client onboarding or internal reporting.',
        price: { USD: 350, ZAR: 5000 },
      },
    ],
  },
];

/**
 * Multi-module bundle discount.
 *
 * Requires at least one module from EVERY pillar marked `countsTowardBundle`
 * — Visibility, Social, AI Agents and Performance. That is the rule as
 * written in the brief.
 *
 * Note for anyone comparing against the proposal PDF: the worked example on
 * page 2 applies this discount while selecting nothing from section 5
 * (Performance), so by this rule that example does not qualify. Its subtotal
 * is also understated — the five ticked modules sum to $1,750 / R25,200, not
 * the $1,500 / R22,200 printed. Confirmed with Deacon 2026-09-01: the written
 * rule is authoritative and the PDF needs reissuing.
 */
export const BUNDLE_DISCOUNT_RATE = 0.1;

export const BUNDLE_RULE_DESCRIPTION =
  'Select at least one module from Visibility, Social, AI Agents and Performance to unlock 10% off your monthly retainer.';

/** Every pillar that a selection must touch for the bundle discount to apply. */
export const BUNDLE_PILLAR_IDS = PILLARS.filter((p) => p.countsTowardBundle).map((p) => p.id);

export const ALL_MODULES: RetainerModule[] = PILLARS.flatMap((p) => p.modules);

export const REQUIRED_MODULE_IDS = ALL_MODULES.filter((m) => m.required).map((m) => m.id);

export function findModule(id: string): RetainerModule | undefined {
  return ALL_MODULES.find((m) => m.id === id);
}

export function pillarOf(moduleId: string): RetainerPillar | undefined {
  return PILLARS.find((p) => p.modules.some((m) => m.id === moduleId));
}

/** Engagement terms, shown under the builder and in the generated summary. */
export const ENGAGEMENT_TERMS = [
  'Invoices are rendered on the 1st of each month by debit order (South Africa) or card (international).',
  'Modules can be changed or swapped with 30 days written notice before the next billing cycle.',
  'The 20% local rate applies strictly to entities registered and operating within South Africa.',
] as const;
