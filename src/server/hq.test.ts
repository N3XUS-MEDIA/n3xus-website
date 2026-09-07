import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { notifyHq } from './hq';

const LEAD = { name: 'A Person', email: 'a@example.com', message: 'Hello' };

/**
 * The only property that matters here: this function must never be able to
 * affect the enquiry. The contact route's guarantee is that a lead is never
 * silently dropped, and HQ is a second path added beside it — if HQ can throw,
 * hang, or reject, it becomes a way to break the first path.
 */
describe('notifyHq never breaks the enquiry path', () => {
  const env = { ...process.env };

  beforeEach(() => {
    process.env.HQ_LINK_URL = 'https://hq.example.com/api/link/events';
    process.env.HQ_LINK_KEY = 'test-key';
  });

  afterEach(() => {
    process.env = { ...env };
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('is a no-op when HQ is not configured', async () => {
    delete process.env.HQ_LINK_URL;
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    await expect(notifyHq(LEAD)).resolves.toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('returns false rather than throwing when the network fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('ECONNREFUSED')));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await expect(notifyHq(LEAD)).resolves.toBe(false);
  });

  it('returns false rather than throwing when HQ refuses the key', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 401, text: async () => 'nope' }),
    );
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await expect(notifyHq(LEAD)).resolves.toBe(false);
  });

  it('sends one lead.created event with a bearer token', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, status: 202, text: async () => '' });
    vi.stubGlobal('fetch', fetchSpy);

    await expect(notifyHq({ ...LEAD, service: 'Strategy' })).resolves.toBe(true);

    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://hq.example.com/api/link/events');
    expect((init.headers as Record<string, string>).Authorization).toBe('Bearer test-key');

    const body = JSON.parse(init.body as string);
    expect(body.events).toHaveLength(1);
    expect(body.events[0].type).toBe('lead.created');
    expect(body.events[0].payload.source).toBe('n3xus.media contact form');
    expect(body.events[0].external_id).toMatch(/^[0-9a-f-]{36}$/);
  });

  it('gives each submission its own external_id', async () => {
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, status: 202, text: async () => '' });
    vi.stubGlobal('fetch', fetchSpy);

    await notifyHq(LEAD);
    await notifyHq(LEAD);

    const ids = fetchSpy.mock.calls.map(
      (c) => JSON.parse((c[1] as RequestInit).body as string).events[0].external_id,
    );
    expect(ids[0]).not.toBe(ids[1]);
  });
});
