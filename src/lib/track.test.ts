import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackAuditStarted, trackLead } from './track';

declare global {
  // eslint-disable-next-line no-var
  var gtag: unknown;
}

afterEach(() => {
  delete (globalThis as { gtag?: unknown }).gtag;
});

describe('trackLead', () => {
  it('sends GA4’s recommended event name so it can be marked a key event', () => {
    const gtag = vi.fn();
    (globalThis as { gtag?: unknown }).gtag = gtag;

    trackLead('Strategy');

    expect(gtag).toHaveBeenCalledTimes(1);
    const [command, name, params] = gtag.mock.calls[0];
    expect(command).toBe('event');
    expect(name).toBe('generate_lead');
    expect(params).toMatchObject({ lead_source: 'contact_form', service: 'Strategy' });
  });

  it('omits the service rather than sending an empty one', () => {
    const gtag = vi.fn();
    (globalThis as { gtag?: unknown }).gtag = gtag;

    trackLead();

    expect(gtag.mock.calls[0][2]).not.toHaveProperty('service');
  });

  /**
   * The enquiry has already been delivered by the time this runs. Analytics
   * failing must never surface to the person who just filled in the form.
   */
  it('does nothing when gtag is absent, and does not throw', () => {
    expect(() => trackLead('Growth')).not.toThrow();
  });

  it('swallows an exception from gtag itself', () => {
    (globalThis as { gtag?: unknown }).gtag = () => {
      throw new Error('blocked by an extension');
    };
    expect(() => trackLead('Growth')).not.toThrow();
  });

  /** No personal data may reach the analytics property. */
  it('sends no field that could carry personal data', () => {
    const gtag = vi.fn();
    (globalThis as { gtag?: unknown }).gtag = gtag;

    trackLead('Intelligence');

    const params = gtag.mock.calls[0][2] as Record<string, unknown>;
    expect(Object.keys(params).sort()).toEqual(['lead_source', 'service']);
  });
});

describe('website audit events', () => {
  it('tags an audit unlock as a lead from the audit', () => {
    const gtag = vi.fn();
    (globalThis as { gtag?: unknown }).gtag = gtag;

    trackLead(undefined, 'website_audit');

    expect(gtag).toHaveBeenCalledWith('event', 'generate_lead', { lead_source: 'website_audit' });
  });

  it('records an audit start with no parameters — not even the address', () => {
    const gtag = vi.fn();
    (globalThis as { gtag?: unknown }).gtag = gtag;

    trackAuditStarted();

    expect(gtag).toHaveBeenCalledWith('event', 'audit_started', undefined);
  });

  it('does not throw without gtag', () => {
    expect(() => trackAuditStarted()).not.toThrow();
  });
});
