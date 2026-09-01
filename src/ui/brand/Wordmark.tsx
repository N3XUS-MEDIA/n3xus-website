import { cn } from '@/lib/cn';
import { HexMark } from './HexMark';

/**
 * The hex mark plus the N3XUS wordmark.
 *
 * The 3 is set apart from the letters around it, which is the one piece of
 * detail worth keeping from the original logo — it is what makes the name read
 * as N3XUS rather than "Nexus" spelled oddly.
 *
 * TODO: if a true vector of the original artwork ever arrives, swap HexMark's
 * geometry for it. Nothing else should need to change.
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
      {showMark ? <HexMark className={cn('size-6 text-accent', markClassName)} /> : null}
      <span className="font-heading text-xl font-bold tracking-tight">
        N<span className="text-accent">3</span>XUS
      </span>
    </span>
  );
}
