import Link from 'next/link';
import { Container } from './Container';
import { Wordmark } from '@/ui/brand/Wordmark';
import { legalNav, primaryNav, serviceNav, site } from '@/content/copy';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-carbon text-on-carbon">
      <Container width="wide">
        <div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Wordmark className="text-2xl" />
            <p className="mt-4 max-w-sm text-on-carbon/70">{site.tagline}</p>
            <p className="mt-6">
              <a
                href={`mailto:${site.email}`}
                className="text-on-carbon/70 underline underline-offset-4 hover:text-on-carbon"
              >
                {site.email}
              </a>
            </p>
          </div>

          <div>
            <p className="eyebrow-on-carbon">Site</p>
            <ul className="mt-4 space-y-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-on-carbon/70 hover:text-on-carbon"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow-on-carbon">Services</p>
            <ul className="mt-4 space-y-1">
              {serviceNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-on-carbon/70 hover:text-on-carbon"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-on-carbon/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-on-carbon/65">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-on-carbon/65 hover:text-on-carbon">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
