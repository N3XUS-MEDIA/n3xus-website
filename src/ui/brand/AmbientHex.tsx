'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * The alive_v11 animation as an ambient background on a dark band.
 *
 * ── Why here rather than as a page loader ───────────────────────────────────
 * The animation has no arc. Frames sampled across the full seven seconds are
 * essentially identical: it is drifting particles, not a build or a reveal.
 * A loader implies something is arriving, and here nothing arrives — there is
 * nothing to wait for, so waiting is just delay. It would also push Largest
 * Contentful Paint, days after the site was finally indexed.
 *
 * As ambient texture the same property is a virtue: it can be joined at any
 * point, it never demands attention, and the near-black ground it was
 * composited against stops being a problem to key out and becomes the design.
 * That is why this belongs only on a carbon band and takes no alpha channel.
 */
export function AmbientHex({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  /**
   * Play only while on screen. A decoder running under a section nobody is
   * looking at is pure battery cost, and this sits below the fold.
   */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src="/brand/hex-ambient.mp4"
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={cn(
        // Not stretched across the band. Full-bleed `object-cover` zooms so far
        // into the source that the hexagon disappears and what is left is an
        // anonymous slab of texture — with a hard edge where the video ends and
        // marginal contrast under the body copy, which the measured contrast
        // work on this band does not survive.
        //
        // Instead: the mark itself, oversized and bleeding off the right, with
        // the text column clear to the left of it. It still reads as N3XUS.
        'pointer-events-none absolute -right-16 top-1/2 hidden aspect-[105/120] h-[150%]',
        '-translate-y-1/2 object-contain lg:block',
        // Low enough to sit behind type; the band's own colour still dominates.
        'opacity-[0.28]',
        'motion-reduce:hidden',
        className,
      )}
      style={{
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        // Fades into the band rather than stopping at an edge.
        maskImage: 'radial-gradient(ellipse at center, #000 45%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, #000 45%, transparent 78%)',
      }}
    />
  );
}
