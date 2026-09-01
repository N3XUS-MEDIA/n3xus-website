'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { cn } from '@/lib/cn';
import { ctas, primaryNav, serviceNav, site } from '@/content/copy';
import { Container } from './Container';
import { Wordmark } from '@/ui/brand/Wordmark';
import { Button } from '@/ui/primitives/Button';
import { ThemeToggle } from './ThemeToggle';

/**
 * Sticky header, carbon in both themes.
 *
 * The services dropdown is a disclosure, not a hover menu: hover menus are
 * unreachable by touch and by keyboard without extra handling, and this site's
 * traffic is mostly phones.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const mobileId = useId();
  const servicesId = useId();

  // Close everything on navigation, or the menu follows you to the next page.
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Escape closes the services disclosure.
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setServicesOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [servicesOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-40 bg-carbon text-on-carbon">
      <Container width="wide">
        <div className="flex min-h-[68px] items-center justify-between gap-4">
          <Link
            href="/"
            className="rounded-md py-2 text-on-carbon transition-opacity hover:opacity-80"
          >
            <Wordmark />
          </Link>

          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(item.href);

                if (item.href !== '/services') {
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'inline-flex min-h-[44px] items-center rounded-md px-3 text-sm transition-colors',
                          active
                            ? 'text-on-carbon'
                            : 'text-on-carbon/70 hover:bg-on-carbon/10 hover:text-on-carbon',
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.href} className="relative">
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      aria-expanded={servicesOpen}
                      aria-controls={servicesId}
                      className={cn(
                        'inline-flex min-h-[44px] items-center gap-1.5 rounded-md px-3 text-sm transition-colors',
                        active ? 'text-on-carbon' : 'text-on-carbon/70 hover:bg-on-carbon/10 hover:text-on-carbon',
                      )}
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={cn('size-4 transition-transform', servicesOpen && 'rotate-180')}
                        aria-hidden
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {servicesOpen ? (
                      <div
                        id={servicesId}
                        className="absolute left-0 top-full w-72 rounded-md border border-on-carbon/15 bg-carbon-light p-2 shadow-lg"
                      >
                        <Link
                          href="/services"
                          className="block rounded-sm px-3 py-2.5 text-sm text-on-carbon hover:bg-on-carbon/10"
                        >
                          All services
                        </Link>
                        <hr className="my-2 border-on-carbon/10" />
                        {serviceNav.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            aria-current={pathname === s.href ? 'page' : undefined}
                            className="block rounded-sm px-3 py-2.5 text-sm text-on-carbon/75 hover:bg-on-carbon/10 hover:text-on-carbon"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />

            <Button asChild variant="primary" className="hidden lg:inline-flex">
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                {ctas.book}
              </a>
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls={mobileId}
              className="inline-flex size-11 items-center justify-center rounded-md text-on-carbon hover:bg-on-carbon/10 lg:hidden"
            >
              <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="size-6"
                aria-hidden
              >
                {mobileOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {mobileOpen ? (
        <div id={mobileId} className="border-t border-on-carbon/10 lg:hidden">
          <Container width="wide">
            <nav aria-label="Mobile" className="py-3">
              <ul>
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={cn(
                        'flex min-h-[56px] items-center border-b border-on-carbon/10 text-base',
                        isActive(item.href) ? 'text-on-carbon' : 'text-on-carbon/75',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                {serviceNav.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="flex min-h-[52px] items-center border-b border-on-carbon/10 pl-4 text-sm text-on-carbon/60"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Button asChild variant="primary" size="lg" className="mt-4 w-full">
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                  {ctas.book}
                </a>
              </Button>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
