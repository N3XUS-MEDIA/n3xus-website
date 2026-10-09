import { describe, expect, it } from 'vitest';
import { AUDIT_TOKEN, newAuditToken, PublicAuditSchema } from './auditContract';

/**
 * A response shaped exactly as HQ's toPublicView builds it
 * (n3xus/apps/hq/src/lib/audit/run.ts). If HQ's shape changes, this fixture
 * is the first thing to update — and the page stays safe meanwhile, because a
 * response that fails to parse is shown as "unavailable", not half-rendered.
 */
const HQ_RESPONSE = {
  status: 'snapshot_ready',
  auditedUrl: 'https://acme.co.za/',
  snapshot: {
    version: 1,
    auditedUrl: 'https://acme.co.za/',
    overall: 58,
    grade: 'C',
    areas: [
      { area: 'search', label: 'Search', score: 72, checks: 10, failed: 3 },
      { area: 'speed', label: 'Speed', score: null, checks: 4, failed: 0 },
    ],
    headlines: [{ checkId: 'ai.crawlers', title: 'AI assistants are blocked', why: 'Because…', severity: 'high' }],
    speed: [{ strategy: 'mobile', performance: 61, lcpMs: 3900, cls: 0.04, inpMs: null, source: 'lab' }],
    generatedAt: '2026-10-09T10:00:00.000Z',
  },
  report: {
    summary: 'x',
    strengths: [],
    topIssues: [],
    aiVisibilitySummary: 'y',
    firstSteps: [],
    aiVisibility: {
      assistant: 'Claude (with web search)',
      askedAt: '2026-10-09T10:00:00.000Z',
      rows: [{ question: 'Best plumber?', named: false, namedInstead: ['A'] }],
    },
  },
  unlocked: false,
  createdAt: '2026-10-09T10:00:00.000Z',
};

describe('PublicAuditSchema', () => {
  it('accepts what HQ sends', () => {
    expect(PublicAuditSchema.safeParse(HQ_RESPONSE).success).toBe(true);
  });

  it('accepts a snapshot from before speed readings existed', () => {
    const { speed: _speed, ...older } = HQ_RESPONSE.snapshot;
    expect(PublicAuditSchema.safeParse({ ...HQ_RESPONSE, snapshot: older, report: null }).success).toBe(true);
  });

  it('drops fields it does not know rather than passing them to the page', () => {
    const parsed = PublicAuditSchema.parse({ ...HQ_RESPONSE, internal_report: { secret: true } });
    expect(parsed).not.toHaveProperty('internal_report');
  });

  it('refuses a score out of range', () => {
    const bad = { ...HQ_RESPONSE, snapshot: { ...HQ_RESPONSE.snapshot, overall: 140 } };
    expect(PublicAuditSchema.safeParse(bad).success).toBe(false);
  });
});

describe('newAuditToken', () => {
  it('meets HQ’s token rule and does not repeat', () => {
    const a = newAuditToken();
    const b = newAuditToken();
    expect(a).toMatch(AUDIT_TOKEN);
    expect(a.length).toBeGreaterThanOrEqual(43);
    expect(a).not.toBe(b);
  });
});
