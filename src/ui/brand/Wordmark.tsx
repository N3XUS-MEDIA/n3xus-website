import { cn } from '@/lib/cn';

/**
 * The N3XUS wordmark, set in the heading face.
 *
 * NOT the brand logo file. assets/n3xus-logo.svg is an 856KB SVG wrapping a
 * base64 PNG — a logo-maker export, not a vector. It cannot inherit
 * currentColor, so it cannot sit on both a light and a dark header, and it
 * would be the heaviest asset on every page.
 *
 * A type-set wordmark is honest, weighs nothing, and themes correctly. When a
 * real vector mark exists, replace this component — nothing else should need
 * to change.
 *
 * TODO: swap for the vector logomark once it's redrawn (see docs/brand).
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-heading text-xl font-bold tracking-tight',
        className,
      )}
    >
      N3XUS
      <span className="sr-only"> Media</span>
    </span>
  );
}
