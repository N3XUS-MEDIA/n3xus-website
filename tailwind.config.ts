import type { Config } from 'tailwindcss';
import { n3xusPreset } from './src/design/tailwind-preset';

export default {
  presets: [n3xusPreset],
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
} satisfies Config;
