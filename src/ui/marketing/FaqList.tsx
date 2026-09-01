import type { Faq } from '@/content/home';

/**
 * Native <details>/<summary> rather than a JS accordion.
 *
 * It works with JavaScript disabled, ships no client bundle, and gets keyboard
 * behaviour and screen-reader semantics from the platform — all of which the
 * old hand-rolled aria-expanded version had to reimplement, and partly got
 * wrong. The same array feeds faqLd() so the page and its structured data
 * cannot drift apart.
 */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="mt-10 overflow-hidden rounded-lg border border-line">
      {items.map((item, i) => (
        <details
          key={item.q}
          className={i > 0 ? 'border-t border-line' : undefined}
          name="faq"
        >
          <summary className="cursor-pointer list-none p-5 font-heading font-semibold text-ink transition-colors hover:bg-mist/40 sm:p-6 [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {item.q}
              <span
                aria-hidden
                className="mt-1 shrink-0 text-accent-ink transition-transform"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </span>
          </summary>
          <p className="px-5 pb-6 leading-relaxed text-ink-muted sm:px-6">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
