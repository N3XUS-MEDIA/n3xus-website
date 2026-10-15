'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { cn } from '@/lib/cn';
import {
  consentServerSnapshot,
  consentSnapshot,
  onOpenPreferences,
  readConsent,
  subscribeConsent,
  writeConsent,
} from '@/lib/consent';

/**
 * The cookie notice.
 *
 * Shown on a first visit (and after the choice expires). Accept and reject are
 * the same size, style and weight on purpose: a banner that makes "no" harder
 * than "yes" is not consent. Nothing but the necessary storage runs until a
 * choice is made.
 *
 * It sits early in the DOM (right after the skip link) so a keyboard user
 * reaches it first, and it never steals focus on load. A footer link reopens it
 * in settings mode at any time, which is also how a choice is withdrawn.
 */
export function ConsentBanner() {
  const state = useSyncExternalStore(subscribeConsent, consentSnapshot, consentServerSnapshot);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [reopened, setReopened] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Reopened from the footer: show settings, pre-set to the current choice, and move focus in.
  useEffect(
    () =>
      onOpenPreferences(() => {
        setAnalytics(readConsent()?.analytics ?? false);
        setSettingsOpen(true);
        setReopened(true);
      }),
    [],
  );
  useEffect(() => {
    if (reopened) headingRef.current?.focus();
  }, [reopened]);

  useEffect(() => {
    if (!reopened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [reopened]);

  function close() {
    setReopened(false);
    setSettingsOpen(false);
  }
  function choose(value: boolean) {
    writeConsent(value);
    close();
  }

  const visible = state === 'unset' || reopened;
  if (state === 'loading' || !visible) return null;

  return (
    <section
      role="region"
      aria-label="Cookie consent"
      aria-labelledby="consent-heading"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-lg border border-line bg-paper p-5 shadow-2xl sm:p-6">
        <h2
          id="consent-heading"
          ref={headingRef}
          tabIndex={-1}
          className="font-heading text-base font-semibold text-ink outline-none"
        >
          Cookies and your privacy
        </h2>

        {!settingsOpen ? (
          <>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              A few cookies keep the site working. With your permission we also use analytics, to see which pages
              help and which channels bring enquiries. We don’t use advertising cookies, and nothing optional runs
              until you choose.{' '}
              <Link href="/privacy#cookies" className="font-medium text-accent-ink underline underline-offset-4 hover:no-underline">
                Cookie and privacy policy
              </Link>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <ChoiceButton onClick={() => choose(true)}>Accept analytics</ChoiceButton>
              <ChoiceButton onClick={() => choose(false)}>Reject optional cookies</ChoiceButton>
              <button
                type="button"
                onClick={() => {
                  setAnalytics(false);
                  setSettingsOpen(true);
                }}
                className="min-h-[44px] px-2 text-sm font-medium text-ink-muted underline underline-offset-4 hover:text-ink hover:no-underline"
              >
                Choose
              </button>
            </div>
          </>
        ) : (
          <>
            <ul className="mt-3 divide-y divide-line border-y border-line">
              <li className="flex items-start justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">Strictly necessary</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                    Remembers this cookie choice and your light or dark setting. The site can’t work properly
                    without these, so they can’t be switched off.
                  </p>
                </div>
                <span className="mt-0.5 shrink-0 text-xs font-medium uppercase tracking-wider text-ink-muted">
                  Always on
                </span>
              </li>
              <li className="flex items-start justify-between gap-4 py-3">
                <div>
                  <p id="consent-analytics-label" className="text-sm font-medium text-ink">
                    Analytics
                  </p>
                  <p id="consent-analytics-desc" className="mt-1 text-sm leading-relaxed text-ink-muted">
                    Google Analytics, and a note of how you arrived (for example search, an AI assistant or a link),
                    so we can see which pages and channels bring enquiries. Off unless you turn it on.
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={analytics}
                  aria-labelledby="consent-analytics-label"
                  aria-describedby="consent-analytics-desc"
                  onClick={() => setAnalytics((v) => !v)}
                  className={cn(
                    'relative mt-0.5 inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors',
                    analytics ? 'border-accent-ink bg-accent' : 'border-line bg-mist',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'inline-block size-5 rounded-full bg-paper shadow transition-transform',
                      analytics ? 'translate-x-6' : 'translate-x-1',
                    )}
                  />
                  <span className="sr-only">{analytics ? 'On' : 'Off'}</span>
                </button>
              </li>
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <ChoiceButton onClick={() => choose(analytics)}>Save my choice</ChoiceButton>
              <button
                type="button"
                onClick={() => (reopened ? close() : setSettingsOpen(false))}
                className="min-h-[44px] px-2 text-sm font-medium text-ink-muted underline underline-offset-4 hover:text-ink hover:no-underline"
              >
                {reopened ? 'Close' : 'Back'}
              </button>
              <Link
                href="/privacy#cookies"
                className="ml-auto text-sm font-medium text-accent-ink underline underline-offset-4 hover:no-underline"
              >
                Cookie policy
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/** Same size, style and weight for every decision button. */
function ChoiceButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-ink bg-paper px-5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
    >
      {children}
    </button>
  );
}
