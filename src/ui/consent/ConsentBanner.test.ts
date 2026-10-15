import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { ConsentBanner } from './ConsentBanner';
import { CookieSettingsButton } from './CookieSettingsButton';

describe('ConsentBanner', () => {
  it('renders nothing on the server, so there is no flash and no hydration mismatch', () => {
    expect(renderToStaticMarkup(createElement(ConsentBanner))).toBe('');
  });
});

describe('CookieSettingsButton', () => {
  it('is a real button, so it works from the keyboard', () => {
    const html = renderToStaticMarkup(createElement(CookieSettingsButton, { className: 'x' }));
    expect(html).toContain('<button type="button"');
    expect(html).toContain('Cookie settings');
  });
});
