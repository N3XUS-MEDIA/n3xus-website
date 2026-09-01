/**
 * Site-wide strings used in more than one place. Anything used twice belongs
 * here so the two copies cannot drift.
 *
 * ── Naming ──────────────────────────────────────────────────────────────────
 * The brand is N3XUS. "Media" is dropped: it described a marketing agency, and
 * the business is repositioning as a consultancy.
 *
 * `legalName` is deliberately still "N3XUS Media (Pty) Ltd". That is the
 * registered entity, and it must stay accurate in the copyright line, the
 * privacy policy and the terms until the company itself is renamed at CIPC.
 * Changing a registered name is not a website decision. Use `name` for brand
 * voice and `legalName` only where the legal entity is meant.
 *
 * The domain stays n3xus.media.
 */

export const site = {
  name: 'N3XUS',
  /** The registered entity. Legal and copyright contexts only. */
  legalName: 'N3XUS Media (Pty) Ltd',
  url: 'https://n3xus.media',
  email: 'info@n3xus.media',
  retainersEmail: 'retainers@n3xus.media',
  bookingUrl: 'https://link.n3xus.media/widget/bookings/jared-sinclair-calendar',
  tagline: 'Strategy, technology and growth for businesses that have outgrown their systems.',
  /** One line, used in metadata and structured data. */
  descriptor:
    'A business consultancy working across strategy, technology and growth — the three disciplines most businesses buy separately and then struggle to connect.',
} as const;

/**
 * The three disciplines the name refers to.
 *
 * This replaces the previous Build / Grow / Amplify framing, which never
 * explained what the 3 in N3XUS stood for and read as an agency service menu.
 */
export const PILLARS = [
  {
    n: '01',
    id: 'strategy',
    name: 'Strategy',
    href: '/services/strategy',
    summary: 'Where the business actually loses money, and what to do first.',
  },
  {
    n: '02',
    id: 'technology',
    name: 'Technology',
    href: '/services/website-os',
    summary: 'The systems the work runs on, built and connected.',
  },
  {
    n: '03',
    id: 'growth',
    name: 'Growth',
    href: '/services/digital',
    summary: 'Demand, visibility and the brand that makes both cheaper.',
  },
] as const;

export const primaryNav = [
  { href: '/services', label: 'What we do' },
  { href: '/intelligence', label: 'Intelligence' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Insights' },
  { href: '/about', label: 'About' },
] as const;

/**
 * Services grouped by pillar, for the header disclosure and the footer.
 *
 * Brand, television and streaming stay reachable — they are live URLs with
 * search history and real revenue behind them — but they sit under Growth as
 * delivery capabilities rather than a headline pillar of their own. That is the
 * part of the old positioning the business is moving away from.
 */
export interface NavLink {
  href: string;
  label: string;
}

export interface ServiceGroup {
  pillar: string;
  items: NavLink[];
}

export const serviceNav: ServiceGroup[] = [
  {
    pillar: 'Strategy',
    items: [{ href: '/services/strategy', label: 'Advisory & operating strategy' }],
  },
  {
    pillar: 'Technology',
    items: [
      { href: '/services/website-os', label: 'Website Operating System' },
      { href: '/services/ai', label: 'AI & LLM systems' },
      { href: '/services/software', label: 'Custom software' },
    ],
  },
  {
    pillar: 'Growth',
    items: [
      { href: '/services/digital', label: 'Demand & visibility' },
      { href: '/services/brand', label: 'Brand & market presence' },
      { href: '/services/dstv-stream', label: 'Streaming advertising' },
    ],
  },
];

/** Flat list, where a grouped menu would be overkill. */
export const serviceLinks: NavLink[] = serviceNav.flatMap((g) => g.items);

export const legalNav = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
] as const;

export const ctas = {
  book: 'Book a consultation',
  contact: 'Get in touch',
  buildRetainer: 'Build your retainer',
} as const;
