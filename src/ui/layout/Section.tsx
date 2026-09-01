import { cn } from '@/lib/cn';
import { Container } from './Container';

type Tone = 'paper' | 'mist' | 'carbon';

const tones: Record<Tone, string> = {
  paper: '',
  mist: 'bg-mist/50',
  carbon: 'bg-carbon text-on-carbon',
};

/**
 * Vertical rhythm for the site.
 *
 * Whitespace and a small number of tonal bands are the design. The previous
 * site reached for a particle canvas, a marquee and a fake dashboard mock to
 * fill space; the replacement for all of that is rhythm and restraint, so the
 * spacing scale living in one place is what stops the pages drifting apart as
 * they are edited.
 */
export function Section({
  className,
  children,
  tone = 'paper',
  width,
  bordered = false,
  size = 'md',
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  tone?: Tone;
  width?: React.ComponentProps<typeof Container>['width'];
  bordered?: boolean;
  size?: 'sm' | 'md';
}) {
  return (
    <section
      className={cn(
        size === 'sm' ? 'py-12 sm:py-16' : 'py-16 sm:py-20 lg:py-28',
        tones[tone],
        bordered && 'border-t border-line',
        className,
      )}
      {...props}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}

/**
 * Eyebrow, heading, lede — in that order, at the same optical weight on every
 * section of the site.
 *
 * The eyebrow drops a trailing full stop: the copy deck writes these as
 * sentences, and a full stop set in wide-tracked small caps reads as a typo.
 * The source string itself is untouched.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  onCarbon = false,
  as: Heading = 'h2',
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: 'left' | 'center';
  onCarbon?: boolean;
  as?: 'h1' | 'h2';
  className?: string;
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow ? (
        <p className={onCarbon ? 'eyebrow-on-carbon' : 'eyebrow'}>{eyebrow.replace(/\.$/, '')}</p>
      ) : null}
      <Heading
        className={cn(
          'text-3xl sm:text-4xl',
          Heading === 'h1' && 'lg:text-5xl',
          onCarbon ? 'text-on-carbon' : 'text-ink',
          eyebrow && 'mt-4',
        )}
      >
        {title}
      </Heading>
      {lede ? (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed sm:text-xl',
            onCarbon ? 'text-on-carbon/75' : 'text-ink-muted',
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
