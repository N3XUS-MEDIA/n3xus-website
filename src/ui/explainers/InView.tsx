'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * Marks its subtree `data-inview="true"` the first time it scrolls into view,
 * then stops watching. All motion is CSS keyed off that attribute (see the
 * "Explainer motion" block in app/globals.css) — this component only decides
 * *when*, never *how*. The server render is the finished diagram.
 */
export function InView({
  as: Tag = 'div',
  className,
  children,
  threshold = 0.3,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'figure';
  threshold?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.setAttribute('data-inview', 'true');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.setAttribute('data-inview', 'true');
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-explainer=""
      className={cn(className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
