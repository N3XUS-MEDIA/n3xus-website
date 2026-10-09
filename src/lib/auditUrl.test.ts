import { describe, expect, it } from 'vitest';
import { checkAuditUrl, displayHost } from './auditUrl';

/** Mirrors HQ's url.test.ts, so the form and the engine agree on what's auditable. */
describe('checkAuditUrl', () => {
  it.each([
    ['acme.co.za', 'https://acme.co.za/'],
    ['  www.Acme.com/about  ', 'https://www.acme.com/about'],
    ['http://acme.com', 'http://acme.com/'],
    ['https://acme.com/#top', 'https://acme.com/'],
  ])('accepts %s', (input, expected) => {
    expect(checkAuditUrl(input)).toEqual({ ok: true, url: expected });
  });

  it.each([
    '',
    'localhost',
    'http://localhost:3000',
    '127.0.0.1',
    'http://[::1]/',
    'intranet',
    'printer.local',
    'shop.test',
    'ftp://acme.com',
    'https://user:pass@acme.com',
    'https://acme.com:8443',
    'metadata.google.internal',
  ])('refuses %s with a sentence a visitor can read', (input) => {
    const r = checkAuditUrl(input);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.message).toMatch(/^[A-Z].+\.$/);
  });
});

describe('displayHost', () => {
  it('drops the scheme and www', () => {
    expect(displayHost('https://www.acme.co.za/about')).toBe('acme.co.za');
  });
});
