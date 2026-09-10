'use client';

import { useEffect, useState } from 'react';

const SEEN_KEY = 'n3xus:intro-seen';
/** Short on purpose. The animation has no payoff to wait for. */
const DURATION_MS = 1200;

/**
 * A one-off brand moment on a visitor's first ever visit.
 *
 * ── The cost this is trying to stay under ───────────────────────────────────
 * Anything covering the page delays Largest Contentful Paint, which is a
 * ranking signal and the thing the last fortnight of work was spent earning.
 * So this: never blocks rendering (the page is behind it and already painted),
 * never repeats, and is gone in 1.2 seconds.
 *
 * It is skipped entirely for anyone who has asked for reduced motion, and for
 * anyone whose browser has no localStorage — a private window should not mean
 * seeing an intro on every page.
 */
export function BrandIntro({ force = false }: { force?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (!force) {
      try {
        if (localStorage.getItem(SEEN_KEY)) return;
        localStorage.setItem(SEEN_KEY, '1');
      } catch {
        // No storage means we cannot tell a first visit from a fiftieth.
        // Showing nothing is the safer of the two mistakes.
        return;
      }
    }

    setVisible(true);
    const fade = setTimeout(() => setLeaving(true), DURATION_MS);
    const done = setTimeout(() => setVisible(false), DURATION_MS + 400);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, [force]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-carbon transition-opacity duration-[400ms] ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <video
        src="/brand/hex-alive.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="size-40 object-contain"
        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
      />
    </div>
  );
}
