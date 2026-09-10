import { cn } from '@/lib/cn';
import { HexArtMark } from './HexArtMark';

/**
 * The hex mark plus the N3XUS wordmark.
 *
 * The 3 is set apart from the letters around it, which is the one piece of
 * detail worth keeping from the original logo — it is what makes the name read
 * as N3XUS rather than "Nexus" spelled oddly.
 *
 * The mark is the supplied artwork rather than the drawn stand-in that stood
 * here before — see HexArtMark for how a file with no alpha channel ends up
 * with clean edges on both themes.
 */
export function Wordmark({
  className,
  markClassName,
  showMark = true,
}: {
  className?: string;
  markClassName?: string;
  showMark?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      {showMark ? <HexArtMark className={cn('h-7', markClassName)} /> : null}
      <span className="font-heading text-xl font-bold tracking-tight">
        N<span className="text-accent">3</span>XUS
      </span>
    </span>
  );
}
