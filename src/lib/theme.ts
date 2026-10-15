export const THEME_STORAGE_KEY = 'n3xus-theme';

export type Theme = 'light' | 'dark';

/**
 * Runs before first paint, inlined in <head>.
 *
 * Without this the page renders light, then flips to dark once React hydrates —
 * a white flash on every navigation for anyone using dark mode. Kept as a
 * string because it has to be a synchronous, blocking <script>, which rules
 * out any module the bundler would defer.
 *
 * Deliberately silent on failure: Safari in private mode throws on
 * localStorage access, and a theme preference is not worth a broken page.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
    // No stored choice: the CSS prefers-color-scheme query handles it, so
    // leave the attribute off entirely rather than guessing here.
  } catch (e) {}
  // Explainer diagrams only start hidden (to animate in) when this is set.
  // Set here, before paint, so a visitor who asked for reduced motion - or
  // whose browser never runs scripts - always gets the finished diagram.
  try {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.setAttribute('data-motion', 'ok');
    }
  } catch (e) {}
})();
`.trim();
