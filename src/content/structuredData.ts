/**
 * JSON-LD builders.
 *
 * Two rules, carried over from the reference implementation and reinforced by
 * CLAUDE.md non-negotiable #5:
 *
 *   1. Nothing unconfirmed. Structured data is invisible on the page but is
 *      read by Google and by the AI assistants this business sells visibility
 *      in, so it carries exactly the same standard as visible copy.
 *   2. Nothing new. JSON-LD restates facts already rendered on the page; it is
 *      not a place to assert extra things nobody can see.
 *
 * The old index.html shipped an OfferCatalog of twelve services with prices
 * that contradicted the pricing page (Website OS at $950/$2,400/$5,500 monthly,
 * retired by the retainer builder). That catalogue is NOT ported. When offers
 * return, they must be generated from src/content/pricing.ts.
 */

import { site, PILLARS } from './copy';
import { MARKETS, areaServedLd, homeMarket } from './markets';
import { faqs, type Faq } from './home';
import { CLAIMS } from './about';

/** Drops empty values rather than emitting placeholder fields. */
function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === null || v === undefined) return false;
      if (typeof v === 'string') return v.trim().length > 0;
      if (Array.isArray(v)) return v.length > 0;
      return true;
    }),
  ) as Partial<T>;
}

export const ORG_ID = `${site.url}/#org`;
export const WEBSITE_ID = `${site.url}/#website`;

export function organisationLd() {
  return compact({
    '@context': 'https://schema.org',
    // ProfessionalService rather than a bare Organization: it is a subtype of
    // LocalBusiness and lets search and AI assistants classify the firm as a
    // consultancy rather than guessing from copy.
    '@type': ['Organization', 'ProfessionalService'],
    /**
     * Mirrors the Google Business Profile category. Google declined a profile
     * edit because the site did not reflect the category change away from
     * "Marketing agency"; this states it machine-readably as well as in copy.
     */
    additionalType: 'https://en.wikipedia.org/wiki/Management_consulting',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    // The former trading name. Kept so the rename does not break entity
    // matching for anyone who already knows the business as N3XUS Media.
    alternateName: ['N3XUS Media'],
    url: site.url,
    email: site.email,
    description: site.descriptor,
    slogan: 'Strategy, intelligence and growth — one team, not three suppliers.',
    knowsAbout: [
      'Business strategy consulting',
      'Operating model design',
      'Technology strategy',
      'Custom software development',
      'AI and LLM systems',
      'Generative Engine Optimisation',
      'Search engine optimisation',
      'Performance marketing',
    ],
    image: `${site.url}/assets/og-image.png`,

    /**
     * Named markets, not "Worldwide".
     *
     * "Worldwide" is unverifiable, matches no query, and dilutes relevance in
     * every market. Two countries plus their regions, as resolvable Country /
     * State entities, is what actually helps a search engine or an assistant
     * decide the firm is relevant to someone in Cape Town or Austin.
     */
    areaServed: areaServedLd(),

    /**
     * Where the business actually is. Country-level only: there is no street
     * address here because publishing one N3XUS does not trade from would be
     * false, and a LocalBusiness address is exactly the field Google verifies.
     * Add `streetAddress`, `addressLocality` and `postalCode` when there is a
     * real registered premises to name — that unlocks Google Business Profile,
     * which is the single biggest remaining local-SEO lever in South Africa.
     */
    address: {
      '@type': 'PostalAddress',
      addressCountry: homeMarket.countryCode,
    },

    // NOT included pending docs/CLAIMS-REGISTER.md:
    // - foundingDate (F1) and numberOfEmployees (F2), unverified here
    // - sameAs profiles (F3), each URL needs confirming as owned and live
    // - paymentAccepted, which named "Cryptocurrency via Syrax" (E1)
    // - hasOfferCatalog, whose prices are superseded (C3)
    // - priceRange "$500 — $20,000+", which no longer matches the retainer
  });
}

export function websiteLd() {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  });
}

/**
 * Built from the same array the page renders, so a question can never appear
 * in structured data without also being visible — which is what Google's
 * FAQPage guidelines require, and what a hand-maintained second copy
 * reliably gets wrong.
 */
export function faqLd(items: Faq[]) {
  if (!items.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** FAQs that are safe to publish given the current claim verdicts. */
export function visibleFaqs(): Faq[] {
  return faqs.filter((f) => !f.claim || CLAIMS[f.claim]);
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  if (!trail.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/**
 * A `Service` entity per pillar, each carrying `areaServed`.
 *
 * This is the piece that was missing. Organization schema tells a search
 * engine who the firm is; Service schema tells it what the firm sells and
 * where — which is what an "AI consultant in Cape Town" or "operations
 * consultancy Texas" query is actually matching against. Without it, the only
 * geographic signal on the site was a single word on the organisation.
 *
 * Generated from PILLARS so a discipline cannot exist in the navigation and be
 * absent from the structured data.
 */
export function serviceLd() {
  return PILLARS.map((pillar) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${site.url}${pillar.href}#service`,
    name: `${pillar.name} — ${site.name}`,
    description: pillar.summary,
    serviceType: pillar.name,
    provider: { '@id': ORG_ID },
    areaServed: areaServedLd(),
    url: `${site.url}${pillar.href}`,
    /**
     * Currency is a real geographic signal: it tells an assistant which market
     * a quote applies to, and it is why the retainer matrix stores ZAR
     * explicitly rather than converting from USD.
     */
    offers: MARKETS.map((market) => ({
      '@type': 'Offer',
      priceCurrency: market.currency,
      availableAtOrFrom: {
        '@type': 'Country',
        name: market.country,
        identifier: market.countryCode,
      },
      url: `${site.url}/pricing`,
    })),
  }));
}
