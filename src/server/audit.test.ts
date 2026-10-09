import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchAudit, requestAudit, unlockAudit, verifyTurnstile } from './audit';

const TOKEN = 'a'.repeat(43);
const env = { ...process.env };

beforeEach(() => {
  process.env.HQ_LINK_URL = 'https://hq.example.com/api/link/events';
  process.env.HQ_LINK_KEY = 'test-key';
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  process.env = { ...env };
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const bodyOf = (spy: ReturnType<typeof vi.fn>) => JSON.parse((spy.mock.calls[0]![1] as RequestInit).body as string);

describe('requestAudit', () => {
  it('sends audit.requested keyed by the token', async () => {
    const spy = vi.fn().mockResolvedValue({ ok: true, status: 202, text: async () => '' });
    vi.stubGlobal('fetch', spy);

    await expect(requestAudit('https://acme.co.za/', TOKEN)).resolves.toBe(true);
    const event = bodyOf(spy).events[0];
    expect(event).toMatchObject({ type: 'audit.requested', external_id: TOKEN, payload: { url: 'https://acme.co.za/' } });
  });

  it('is false, not an exception, when HQ is not configured or down', async () => {
    delete process.env.HQ_LINK_KEY;
    await expect(requestAudit('https://acme.co.za/', TOKEN)).resolves.toBe(false);

    process.env.HQ_LINK_KEY = 'test-key';
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')));
    await expect(requestAudit('https://acme.co.za/', TOKEN)).resolves.toBe(false);
  });
});

describe('fetchAudit', () => {
  it('reads HQ’s public endpoint beside the Link endpoint', async () => {
    const spy = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({}) });
    vi.stubGlobal('fetch', spy);
    await fetchAudit(TOKEN);
    expect(String(spy.mock.calls[0]![0])).toBe(`https://hq.example.com/api/public/audits/${TOKEN}`);
  });

  it('never calls HQ with a malformed token', async () => {
    const spy = vi.fn();
    vi.stubGlobal('fetch', spy);
    await expect(fetchAudit('../../admin')).resolves.toEqual({ kind: 'not_found' });
    expect(spy).not.toHaveBeenCalled();
  });

  it('maps 404, errors and unknown shapes to answers the page can show', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 404 }));
    await expect(fetchAudit(TOKEN)).resolves.toEqual({ kind: 'not_found' });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    await expect(fetchAudit(TOKEN)).resolves.toEqual({ kind: 'unavailable' });

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ status: 'weird' }) }));
    await expect(fetchAudit(TOKEN)).resolves.toEqual({ kind: 'unavailable' });
  });
});

describe('unlockAudit', () => {
  it('sends one deduplicable unlock per audit, with recorded consent', async () => {
    const spy = vi.fn().mockResolvedValue({ ok: true, status: 202, text: async () => '' });
    vi.stubGlobal('fetch', spy);

    await unlockAudit({ token: TOKEN, name: 'A Person', email: 'a@example.com', company: '', phone: undefined });
    const event = bodyOf(spy).events[0];
    expect(event.type).toBe('audit.unlocked');
    expect(event.external_id).toBe(`unlock:${TOKEN}`);
    expect(event.payload).toEqual({ token: TOKEN, name: 'A Person', email: 'a@example.com', consent: true });
  });
});

describe('verifyTurnstile', () => {
  it('refuses in production when the secret is missing', async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    vi.stubEnv('NODE_ENV', 'production');
    await expect(verifyTurnstile('anything', '1.2.3.4')).resolves.toBe(false);
    vi.unstubAllEnvs();
  });

  it('skips the check in development when the secret is missing', async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    vi.stubEnv('NODE_ENV', 'development');
    await expect(verifyTurnstile(undefined, '1.2.3.4')).resolves.toBe(true);
    vi.unstubAllEnvs();
  });

  it('trusts only an explicit success from Cloudflare', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: async () => ({ success: true }) }));
    await expect(verifyTurnstile('t', '1.2.3.4')).resolves.toBe(true);

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: async () => ({ success: false }) }));
    await expect(verifyTurnstile('t', '1.2.3.4')).resolves.toBe(false);

    await expect(verifyTurnstile(undefined, '1.2.3.4')).resolves.toBe(false);
  });
});
