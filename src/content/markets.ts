/**
 * The two markets N3XUS targets, as structured data.
 *
 * ── Why this file exists ────────────────────────────────────────────────────
 * The site previously declared `areaServed: 'Worldwide'`. That is the weakest
 * possible geographic signal: it is unverifiable, it matches no query, and it
 * tells Google and the AI assistants nothing about where the firm actually
 * operates. Naming two markets specifically beats claiming all of them.
 *
 * ── What this file deliberately does NOT do ─────────────────────────────────
 * It does not generate a page per city. "Business consultancy in Phoenix",
 * "Business consultancy in Denver" and forty siblings with the same body copy
 * is the textbook definition of a doorway page, which Google's spam policy
 * names explicitly and penalises. For a firm that delivers remotely, city
 * pages are also simply untrue.
 *
 * Two markets, two genuinely different pages — different currency, different
 * buying context, different concerns — is the defensible version of the same
 * intent, and it is what actually ranks.
 *
 * ── Regions ────────────────────────────────────────────────────────────────
 * The South African regions are taken from the firm's own audience data (see
 * services/dstv-stream: Gauteng and Western Cape lead reach, with meaningful
 * presence in every province). The US states are the largest concentrations of
 * small and mid-market professional-services firms — the buyer profile — and
 * are stated as focus rather than as presence, because N3XUS has no US office
 * and claiming otherwise would be both false and, for a LocalBusiness schema,
 * a guidelines violation.
 */

export interface Market {
  id: 'za' | 'us';
  /** ISO 3166-1 alpha-2, for schema.org Country. */
  countryCode: string;
  country: string;
  /** Sub-national regions of focus. Named for relevance, not presence. */
  regions: string[];
  currency: 'ZAR' | 'USD';
  /** True only where the firm is actually established. */
  isHomeMarket: boolean;
}

export const MARKETS: Market[] = [
  {
    id: 'za',
    countryCode: 'ZA',
    country: 'South Africa',
    regions: [
      'Gauteng',
      'Western Cape',
      'KwaZulu-Natal',
      'Eastern Cape',
      'Free State',
      'Mpumalanga',
      'Limpopo',
      'North West',
      'Northern Cape',
    ],
    currency: 'ZAR',
    isHomeMarket: true,
  },
  {
    id: 'us',
    countryCode: 'US',
    country: 'United States',
    regions: [
      'California',
      'Texas',
      'Florida',
      'New York',
      'Georgia',
      'Arizona',
      'Colorado',
      'North Carolina',
      'Washington',
      'Illinois',
    ],
    currency: 'USD',
    isHomeMarket: false,
  },
];

export const homeMarket = MARKETS.find((m) => m.isHomeMarket)!;

/**
 * schema.org `areaServed`, as structured Country/State entities rather than a
 * string. Search engines can resolve these to real places; "Worldwide" they
 * cannot.
 */
export function areaServedLd() {
  return MARKETS.flatMap((market) => [
    {
      '@type': 'Country',
      name: market.country,
      identifier: market.countryCode,
    },
    ...market.regions.map((region) => ({
      '@type': 'State',
      name: region,
      containedInPlace: { '@type': 'Country', name: market.country },
    })),
  ]);
}
