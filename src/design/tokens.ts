/**
 * N3XUS design tokens — the single source of colour, type and radius.
 *
 * Everything visual consumes this file. Do not introduce a second palette.
 *
 * ── Why these values ────────────────────────────────────────────────────────
 * The previous site ran a single teal (#00c8a3) as its only accent, on white,
 * for links and body-sized text. That measures ~1.9:1 contrast — it fails
 * WCAG AA for anything smaller than a large heading. The teal is the brand and
 * is worth keeping, so it is split in two rather than dropped:
 *
 *   accent     #00C8A3  the brand teal, unchanged. Large fills, the logomark,
 *                       and anything sitting on a dark ground, where it reads.
 *   accentInk  #06705E  the same hue darkened to ~5.6:1 on paper. Links, small
 *                       text, icons — anywhere the teal has to be legible.
 *
 * In dark mode that inverts: `accent` is legible on carbon, so it becomes the
 * link colour and `accentInk` is retired to a hover state.
 *
 * The neutrals are cool and rotated off navy toward graphite, so the teal has
 * nothing blue to fight with. Execuneed anchors on navy; using the same navy
 * here would make two separate businesses look like one product family.
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
  | 'danger'
  | 'warn'
  | 'ok';

export const palette: Record<ThemeName, Record<ColorRole, string>> = {
  light: {
    /** The dark band surface: header, footer, closing CTA panels. */
    carbon: '#0B1220',
    /** A lift of carbon, for hovers and secondary surfaces on that band. */
    carbonLight: '#16202F',
    /** Text and icons sitting ON carbon. Near-white in BOTH themes. */
    onCarbon: '#E8ECF2',

    /** Page background. Cool off-white so it sits under carbon without muddying. */
    paper: '#F7F9FB',
    /** Body text. Carbon-derived rather than a separate black. */
    ink: '#111A26',
    inkMuted: '#55637A',

    /** Quiet surfaces: cards on paper, section bands. */
    mist: '#E8ECF2',
    line: '#D5DDE7',

    accent: '#00C8A3',
    accentInk: '#06705E',

    danger: '#9B2C2C',
    warn: '#8A5A12',
    ok: '#2F6B45',
  },

  dark: {
    /* Carbon must stay visible as a distinct band. In light mode it drops away
       from the page; in dark mode it has to LIFT, or the header and footer
       disappear into the background — which is exactly what happened when
       carbon and paper were both #0B1220 here. */
    carbon: '#151E30',
    carbonLight: '#1F2B40',
    /* Unchanged across themes: this is "text on a dark band" in both. */
    onCarbon: '#E8ECF2',

    paper: '#0A101C',
    ink: '#E8ECF2',
    inkMuted: '#94A3B8',

    mist: '#131C2C',
    line: '#26314A',

    /* Teal reads well on a dark ground, so the brand colour carries links here
       and the darkened variant is retired to a hover/pressed state. */
    accent: '#00C8A3',
    accentInk: '#4FE3C6',

    danger: '#F1918E',
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
