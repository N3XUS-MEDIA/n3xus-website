/**
 * N3XUS design tokens — the single source of colour, type and radius.
 *
 * Everything visual consumes this file. Do not introduce a second palette.
 *
 * ── Why these values ────────────────────────────────────────────────────────
 * These ARE the original N3XUS colours, recovered from the pre-rebuild
 * stylesheet (see git tag `pre-nextjs-rebuild`, assets/styles.css). An earlier
 * pass rebuilt on blue-graphite neutrals, which quietly turned the site into a
 * different brand: every off-white and near-black here is pulled toward the
 * teal, and that tint is most of what made the original look like itself.
 *
 * The teal cannot carry small text — #00c8a3 measures 2.01:1 on paper, which
 * fails WCAG AA for anything but large headings. The original had already
 * solved this with a darker teal for text, and that exact value is reused:
 *
 *   accent      #00c8a3  the brand teal. Large fills, the mark, dark grounds.
 *   accentInk   #047a64  the original's own text teal — 4.95:1 on paper.
 *   accentDeep  #00977b  hover and pressed states.
 *
 * In dark mode this inverts: the teal reads at 9.22:1 on #030c0d, so `accent`
 * carries links there and `accentInk` points at the same value.
 *
 * What is deliberately NOT restored: the neon glow tokens, the gradient text
 * and the 100px pill radii. Restoring the brand's hues is not the same as
 * restoring its maximalism.
 */

export type ThemeName = 'light' | 'dark';

/** Colour roles. Every role must be defined in both themes. */
export type ColorRole =
  | 'carbon'
  | 'carbonLight'
  | 'onCarbon'
  | 'paper'
  | 'ink'
  | 'inkMuted'
  | 'mist'
  | 'line'
  | 'accent'
  | 'accentInk'
  | 'accentDeep'
  | 'danger'
  | 'warn'
  | 'ok';

export const palette: Record<ThemeName, Record<ColorRole, string>> = {
  light: {
    /** The dark band surface: header, footer, closing CTA panels. */
    carbon: '#091518',
    /** A lift of carbon, for hovers and secondary surfaces on that band. */
    carbonLight: '#0e1c20',
    /** Text and icons sitting ON carbon. Near-white in BOTH themes. */
    onCarbon: '#e6efef',

    /** Page background — the original's teal-tinted off-white, not a grey. */
    paper: '#f5f8f8',
    /** Headings and body. Near-black, tinted toward the teal. 17.32:1. */
    ink: '#0c1517',
    /** Secondary text. 5.67:1 on paper. */
    inkMuted: '#51666c',

    /** Quiet surfaces: cards on paper, section bands. */
    mist: '#eef3f3',
    line: '#dfe6e7',

    accent: '#00c8a3',
    accentInk: '#047a64',
    accentDeep: '#00977b',

    danger: '#a02b2f',
    warn: '#8A5A12',
    ok: '#2F6B45',
  },

  dark: {
    /* Carbon must stay visible as a distinct band. In light mode it drops away
       from the page; in dark mode it has to LIFT, or the header and footer
       disappear into the background. */
    carbon: '#0e1c20',
    carbonLight: '#16282b',
    /* Unchanged across themes: this is "text on a dark band" in both. */
    onCarbon: '#e6efef',

    /** The original's dark ground. */
    paper: '#030c0d',
    ink: '#e6efef',
    inkMuted: '#8ea3a3',

    mist: '#091518',
    line: '#16282b',

    /* The teal reads at 9.22:1 here, so the brand colour itself carries links
       and accentInk points at the same value rather than a darker one. */
    accent: '#00c8a3',
    accentInk: '#00c8a3',
    accentDeep: '#00977b',

    danger: '#f1918e',
    warn: '#E0B36A',
    ok: '#7FC79B',
  },
};

export const tokens = {
  color: palette.light,
  font: {
    /**
     * Space Grotesk replaces Syne. Syne is a display face — it has real
     * personality at 48px and becomes noise at 20px, which is most of a
     * marketing site. Space Grotesk keeps a technical, engineered character
     * appropriate to an AI/software agency while staying quiet at subhead
     * sizes. Loaded at 600/700 only; an unset weight leaves the browser
     * synthesising a fake face.
     */
    heading: 'var(--font-heading), "Space Grotesk", "Helvetica Neue", Arial, sans-serif',
    /** Inter for body — it disappears, which is the job. */
    body: 'var(--font-body), Inter, system-ui, sans-serif',
  },
  radius: { sm: 4, md: 8, lg: 16 },
} as const;

/**
 * '#0B1220' → '11 18 32'
 *
 * Tailwind needs channels rather than hex so that `bg-carbon/50` and friends
 * can slot an alpha value in. Kept here so the palette above stays readable as
 * hex, which is what a designer will hand over.
 */
export function hexToRgbChannels(hex: string): string {
  const h = hex.replace('#', '').trim();

  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;

  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    throw new Error(`tokens: "${hex}" is not a 3- or 6-digit hex colour`);
  }

  const int = parseInt(full, 16);
  return `${(int >> 16) & 255} ${(int >> 8) & 255} ${int & 255}`;
}

/** CSS custom property name for a colour role. */
export const cssVar = (role: ColorRole) => `--n3x-${role.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())}`;
