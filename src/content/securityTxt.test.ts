import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

/**
 * RFC 9116 requires an Expires field, and a security.txt past its expiry is
 * treated as invalid by scanners. This fails a month before it lapses, so the
 * date gets moved on (to no more than a year ahead) before it matters.
 */
describe('security.txt', () => {
  const txt = readFileSync('public/.well-known/security.txt', 'utf-8');

  it('has a contact and an Expires date at least a month away', () => {
    expect(txt).toMatch(/^Contact: /m);
    const expires = txt.match(/^Expires: (.+)$/m)?.[1];
    expect(expires, 'Expires is required by RFC 9116').toBeDefined();
    const monthAhead = Date.now() + 30 * 24 * 60 * 60 * 1000;
    expect(new Date(expires!).getTime(), 'move Expires forward, up to a year').toBeGreaterThan(monthAhead);
  });
});
