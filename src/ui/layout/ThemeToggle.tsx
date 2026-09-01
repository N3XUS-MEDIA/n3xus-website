'use client';

import { useEffect, useState } from 'react';
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme';

/**
 * Light/dark switch.
 *
 * Renders a stable placeholder until mounted. The server cannot know the
 * visitor's stored preference, so rendering the "real" icon during SSR
 * guarantees a hydration mismatch — and the previous site's version of this
 * bug shipped both icons at once in light mode (fixed in f5b2d35, then
 * reintroduced twice). The placeholder keeps layout identical, so nothing
 * shifts when the real control appears.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = (() => {
      try {
        return localStorage.getItem(THEME_STORAGE_KEY);
      } catch {
        return null;
      }
    })();

    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      return;
    }

    // No stored choice — reflect what the OS is giving them, so the icon
    // matches what they can actually see.
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing. The theme still applies for this page view.
    }
  }

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggle}
      className={[
        'inline-flex size-11 items-center justify-center rounded-md',
        'text-on-carbon/70 transition-colors hover:bg-on-carbon/10 hover:text-on-carbon',
        className ?? '',
      ].join(' ')}
      aria-label={theme ? label : 'Toggle colour theme'}
      title={theme ? label : undefined}
    >
      {theme === null ? (
        // Placeholder: same box, no icon, nothing to mismatch.
        <span className="size-5" aria-hidden />
      ) : theme === 'dark' ? (
        // Sun
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="size-5"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // Moon
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
          aria-hidden
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      )}
    </button>
  );
}
