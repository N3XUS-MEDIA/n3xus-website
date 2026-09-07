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

const SITE_URL = 'https://n3xus.media';

/**
 * Where every "Book a free call" button goes.
 *
 * ── Why this is not a plain string ──────────────────────────────────────────
 * It used to be:
 *
 *   https://link.n3xus.media/widget/bookings/jared-sinclair-calendar
 *
 * That host DOES NOT EXIST. Checked 2026-09-07 against GoDaddy's authoritative
 * nameserver (ns07.domaincontrol.com) and the 1.1.1.1 / 8.8.8.8 / 9.9.9.9
 * resolvers — NXDOMAIN from all four. It is not a slow record or a caching
 * problem; nothing is published for that name.
 *
 * So the primary call to action on more than twenty pages, in `llms.txt`, and
 * in the answers Aria gives, was sending buyers to a browser DNS error. The old
 * static site carried the same URL, so this has been broken for some time and
 * silently — a dead external link produces no error anyone here would see.
 *
 * Until that host resolves again, the CTA goes to /contact, which works and
 * reaches the same inbox. To restore self-serve booking:
 *
 *   1. Add the CNAME the booking provider asks for in
 *      GoDaddy → Domain → DNS → Records (DNS is GoDaddy, not Cloudflare).
 *   2. Confirm it resolves:  dig +short link.n3xus.media
 *   3. Set NEXT_PUBLIC_BOOKING_URL in Vercel to the full booking URL.
 *
 * No code change is needed for step 3, and if the variable is ever set to a
 * host that goes dead again, the fix is to unset it rather than to ship.
 */
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || `${SITE_URL}/contact`;

/**
 * Booking links open in a new tab only when they actually leave the site.
 * `target="_blank"` on our own contact page would be a small rudeness.
 */
const bookingLinkProps: { target?: '_blank'; rel?: string } = bookingUrl.startsWith(SITE_URL)
  ? {}
  : { target: '_blank', rel: 'noopener noreferrer' };

export const site = {
  name: 'N3XUS',
  /** The registered entity. Legal and copyright contexts only. */
  legalName: 'N3XUS Media (Pty) Ltd',
  url: SITE_URL,
  email: 'info@n3xus.media',
  retainersEmail: 'retainers@n3xus.media',
  bookingUrl,
  bookingLinkProps,
  /**
   * True only when a real scheduler is configured. The contact page uses this
   * to decide whether "book directly" is a genuine second option or a link
   * back to the page the reader is already on.
   */
  bookingIsLive: !bookingUrl.startsWith(SITE_URL),
  /**
   * The Google Business Profile category, verbatim.
   *
   * Google declined a profile edit changing the category from "Marketing
   * agency" because the website did not reflect it. Their reviewer looks for
   * the category language on the site, and "business consultancy" is not the
   * same string as "business management consultant". This constant exists so
   * the exact term is used consistently and cannot drift back out.
   */
  category: 'business management consultancy',

  /**
   * Explains the name to anyone — a Google reviewer included — who sees
   * "N3XUS" on the site and "N3XUS Media (Pty) Ltd" in the copyright line.
   * The registered company has not been renamed at CIPC, so both are true and
   * the relationship between them has to be stated rather than implied.
   */
  tradingNameNote: 'N3XUS is the trading name of N3XUS Media (Pty) Ltd.',

  tagline: 'Strategy, intelligence and growth — for businesses that have outgrown how they work.',
  /** One line, used in metadata and structured data. */
  descriptor:
    'N3XUS is a business management consultancy working across strategy, intelligence and growth. We work out what is holding your business back, build the systems to fix it, and bring you the customers.',
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
    summary: 'Working out what is actually costing you, and what to fix first.',
  },
  {
    n: '02',
    id: 'intelligence',
    name: 'Intelligence',
    href: '/intelligence',
    summary: 'The systems that run the work, and show you what is happening.',
  },
  {
    n: '03',
    id: 'growth',
    name: 'Growth',
    href: '/services/digital',
    summary: 'Getting you found, and getting people to choose you.',
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
    items: [{ href: '/services/strategy', label: 'Where to start' }],
  },
  {
    pillar: 'Intelligence',
    items: [
      { href: '/intelligence', label: 'The N3XUS Intelligence platform' },
      { href: '/services/website-os', label: 'Website Operating System' },
      { href: '/services/ai', label: 'AI systems & assistants' },
      { href: '/services/software', label: 'Custom software' },
    ],
  },
  {
    pillar: 'Growth',
    items: [
      { href: '/services/digital', label: 'Getting found & getting chosen' },
      { href: '/services/brand', label: 'Brand, TV & events' },
      { href: '/services/dstv-stream', label: 'Streaming ads (DStv)' },
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
  /** Low commitment on purpose — "consultation" sounds like an invoice. */
  book: 'Book a free call',
  contact: 'Get in touch',
  buildRetainer: 'Price it up',
} as const;
