import type { Faq } from './home';
import type { IconName } from '@/ui/explainers/icons';

/** One spoke on the Website OS hub. `title`/`body`/`outcome` make it clickable. */
export interface HubItem {
  label: string;
  icon: IconName;
  title?: string;
  body?: string;
  outcome?: string;
}

/**
 * The diagram an `explainer` block draws. Every label here is shown on screen,
 * so the same rules as the rest of the copy apply: no invented figures, no
 * prices, nothing that needs a statistic to be true. Enforced in
 * src/content/explainers.test.ts.
 */
export type Diagram =
  | { kind: 'osHub'; centre: string; items: HubItem[] }
  | {
      kind: 'twoTrack';
      before: { label: string; steps: { text: string; idle?: boolean }[] };
      after: {
        label: string;
        steps: { time: string; actor: string; title: string; body: string }[];
      };
      coda?: string;
    }
  | {
      kind: 'compareVisual';
      before: { label: string; rows: string[] };
      after: { label: string; rows: string[] };
    };

/**
 * The vocabulary a service page is built from.
 *
 * Each page declares its own sequence of blocks, so /services/ai and
 * /services/brand stay genuinely different pages rather than one template with
 * the nouns swapped — while still sharing spacing, type scale and tone
 * alternation. Adding a one-off layout means adding a block type here, not
 * hand-rolling markup in a page.
 */
export type Block =
  | {
      type: 'prose';
      eyebrow?: string;
      title: string;
      paragraphs: string[];
      /** Optional checklist rendered beside the prose. */
      points?: string[];
    }
  | {
      type: 'features';
      eyebrow?: string;
      title: string;
      lede?: string;
      items: { title: string; body: string; outcome?: string }[];
      columns?: 2 | 3 | 4;
    }
  | {
      type: 'process';
      eyebrow?: string;
      title: string;
      lede?: string;
      steps: { n: string; title: string; body: string }[];
    }
  | {
      type: 'chips';
      eyebrow?: string;
      title: string;
      lede?: string;
      items: string[];
    }
  | {
      type: 'stats';
      eyebrow?: string;
      title: string;
      lede?: string;
      items: { value: string; label: string }[];
      /**
       * Third-party or internal figures must name where they came from.
       * Without a source the block does not render — see
       * docs/CLAIMS-REGISTER.md and CLAUDE.md non-negotiable #5.
       */
      source?: string;
    }
  | {
      type: 'compare';
      eyebrow?: string;
      title: string;
      lede?: string;
      before: { label: string; rows: string[] };
      after: { label: string; rows: string[] };
    }
  | {
      /**
       * A narrative walkthrough — one scenario told as timestamped steps.
       * Used where a feature list would understate what actually happens.
       */
      type: 'timeline';
      eyebrow?: string;
      title: string;
      lede?: string;
      steps: { time: string; actor: string; title: string; body: string }[];
      /** Closing paragraph that lands the contrast. */
      coda?: string;
    }
  | {
      /**
       * An animated diagram. `summary` is the text alternative a screen reader
       * gets instead of the drawing, and is required.
       */
      type: 'explainer';
      eyebrow?: string;
      title: string;
      lede?: string;
      summary: string;
      diagram: Diagram;
    }
  | { type: 'faq'; title?: string; items: Faq[] }
  | {
      type: 'cta';
      eyebrow?: string;
      title: string;
      lede?: string;
      secondary?: { href: string; label: string };
    }
  | {
      /** Points at the retainer builder instead of restating prices. */
      type: 'pricingPointer';
      eyebrow?: string;
      title: string;
      lede?: string;
    };

export interface ServicePageContent {
  eyebrow: string;
  title: string;
  lede: string;
  blocks: Block[];
  faqs?: Faq[];
}
