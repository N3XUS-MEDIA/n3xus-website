/**
 * Site-wide strings that appear in more than one place: navigation, contact
 * details, the booking link. Anything used twice belongs here so the two
 * copies cannot drift.
 */

export const site = {
  name: 'N3XUS Media',
  legalName: 'N3XUS Media (Pty) Ltd',
  url: 'https://n3xus.media',
  email: 'info@n3xus.media',
  retainersEmail: 'retainers@n3xus.media',
  bookingUrl: 'https://link.n3xus.media/widget/bookings/jared-sinclair-calendar',
  tagline: 'Automated growth and AI infrastructure.',
} as const;

export const primaryNav = [
  { href: '/services', label: 'Services' },
  { href: '/intelligence', label: 'Intelligence' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Insights' },
  { href: '/about', label: 'About' },
] as const;

export const serviceNav = [
  { href: '/services/website-os', label: 'Website OS' },
  { href: '/services/ai', label: 'AI & LLM Development' },
  { href: '/services/software', label: 'Custom Software' },
  { href: '/services/digital', label: 'Growth & Demand' },
  { href: '/services/brand', label: 'Brand & Traditional' },
  { href: '/services/dstv-stream', label: 'DStv Stream Advertising' },
] as const;

export const legalNav = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
] as const;

export const ctas = {
  book: 'Book a strategy call',
  contact: 'Get in touch',
  buildRetainer: 'Build your retainer',
} as const;
