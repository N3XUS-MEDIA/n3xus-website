import Link from 'next/link';
import { Container } from '@/ui/layout/Container';
import { Button } from '@/ui/primitives/Button';
import { primaryNav } from '@/content/copy';

export default function NotFound() {
  return (
    <Container width="narrow">
      <div className="py-24 sm:py-32">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-3xl text-ink sm:text-4xl">Page not found.</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">
          That page doesn’t exist, or it moved. These might be what you were after.
        </p>

        <ul className="mt-8 divide-y divide-line border-y border-line">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex min-h-[56px] items-center justify-between gap-4 text-ink hover:text-accent-ink"
              >
                {item.label}
                <span aria-hidden className="text-accent-ink">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Button asChild className="mt-8">
          <Link href="/">Back to the homepage</Link>
        </Button>
      </div>
    </Container>
  );
}
