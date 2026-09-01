import { cn } from '@/lib/cn';

/**
 * The N3XUS hexagon, drawn.
 *
 * Replaces the supplied logo files, which are base64 PNGs wrapped in an SVG
 * (~2.9MB across the three of them). Those cannot inherit `currentColor`, so
 * they can never sit correctly on both a light page and a dark header, and
 * they were the heaviest asset on every page. Drawn geometry costs nothing,
 * recolours with the theme, and stays sharp from a 16px favicon up to the
 * launcher button.
 *
 * Pointy-top hexagon, matching the brand mark's orientation. The inner ring
 * echoes the depth in the original artwork without pretending to reproduce its
 * detail — at 20px that detail is mud anyway.
 */
export function HexMark({
  className,
  filled = false,
  title,
}: {
  className?: string;
  /** Solid mark, for the launcher. Outline is the default. */
  filled?: boolean;
  /** Sets an accessible name. Omit for decorative use. */
  title?: string;
}) {
  // Pointy-top hexagon inscribed in a 24-box: vertices at 12 o'clock and
  // 6 o'clock, flat edges left and right.
  const outer = '12,1.5 21.1,6.75 21.1,17.25 12,22.5 2.9,17.25 2.9,6.75';
  const inner = '12,6.6 16.8,9.3 16.8,14.7 12,17.4 7.2,14.7 7.2,9.3';

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('size-6', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      {title ? <title>{title}</title> : null}
      {filled ? (
        <>
          <polygon points={outer} fill="currentColor" />
          {/* Knocked out of the fill rather than drawn over it, so the mark
              works on any background. */}
          <polygon points={inner} fill="none" stroke="var(--n3x-hex-void, #091518)" strokeWidth="1.6" />
        </>
      ) : (
        <>
          <polygon points={outer} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <polygon
            points={inner}
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            opacity="0.55"
          />
        </>
      )}
    </svg>
  );
}
