import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import {
  palette,
  tokens,
  hexToRgbChannels,
  cssVar,
  type ColorRole,
} from './tokens';

const px = (n: number) => `${n}px`;

const roles = Object.keys(palette.light) as ColorRole[];

/**
 * `bg-paper`, `text-ink/75` etc. resolve to `rgb(var(--n3x-paper) / <alpha>)`
 * rather than a literal hex, so a single set of class names serves both
 * themes. Swapping the variables under [data-theme] re-themes the whole site
 * without a `dark:` variant on every element.
 */
const colors = Object.fromEntries(
  roles.map((role) => [
    // camelCase role → kebab utility name: accentInk → accent-ink
    role.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()),
    `rgb(var(${cssVar(role)}) / <alpha-value>)`,
  ]),
);

/**
 * Emits the custom properties both themes read from, generated from
 * `tokens.ts` so the palette is defined exactly once.
 *
 * Light lives on :root and is therefore the default for a visitor with no
 * stored preference. Dark is applied by [data-theme="dark"], which the
 * pre-paint script in app/layout.tsx sets before first paint, and also under
 * prefers-color-scheme for visitors who have never touched the toggle.
 */
const themeVariables = plugin(({ addBase }) => {
  const vars = (theme: 'light' | 'dark') =>
    Object.fromEntries(
      roles.map((role) => [cssVar(role), hexToRgbChannels(palette[theme][role])]),
    );

  addBase({
    ':root': { ...vars('light'), colorScheme: 'light' },
    // An explicit choice wins over the OS setting, in both directions.
    ':root[data-theme="dark"]': { ...vars('dark'), colorScheme: 'dark' },
    '@media (prefers-color-scheme: dark)': {
      ':root:not([data-theme="light"])': { ...vars('dark'), colorScheme: 'dark' },
    },
  });
});

export const n3xusPreset = {
  content: [],
  theme: {
    extend: {
      colors,
      fontFamily: {
        heading: [tokens.font.heading],
        body: [tokens.font.body],
      },
      borderRadius: {
        sm: px(tokens.radius.sm),
        md: px(tokens.radius.md),
        lg: px(tokens.radius.lg),
      },
    },
  },
  plugins: [themeVariables],
} satisfies Config;

export default n3xusPreset;
