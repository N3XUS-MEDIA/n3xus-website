import { z } from 'zod';

/**
 * What HQ's public audit endpoint returns, as the website is prepared to
 * accept it.
 *
 * The source of truth is `toPublicView` in n3xus/apps/hq/src/lib/audit/run.ts.
 * It is restated here rather than shared because the two apps live in
 * different repositories and deploy separately; parsing at the boundary means
 * a change on one side shows up as a clear "unavailable" here instead of a
 * page that renders half a report.
 *
 * Deliberately permissive about extra fields (zod strips them) and strict
 * about the ones the page draws from.
 */

const Severity = z.enum(['critical', 'high', 'medium', 'low']);

export const AreaScoreSchema = z.object({
  area: z.string(),
  label: z.string(),
  score: z.number().min(0).max(100).nullable(),
  checks: z.number(),
  failed: z.number(),
});

export const SpeedReadingSchema = z.object({
  strategy: z.enum(['mobile', 'desktop']),
  performance: z.number().nullable(),
  lcpMs: z.number().nullable(),
  cls: z.number().nullable(),
  inpMs: z.number().nullable(),
  source: z.enum(['field', 'lab']),
});

export const SnapshotSchema = z.object({
  version: z.literal(1),
  auditedUrl: z.string(),
  overall: z.number().min(0).max(100),
  grade: z.enum(['A', 'B', 'C', 'D', 'E']),
  areas: z.array(AreaScoreSchema),
  headlines: z.array(
    z.object({ checkId: z.string(), title: z.string(), why: z.string(), severity: Severity }),
  ),
  speed: z.array(SpeedReadingSchema).optional(),
  generatedAt: z.string(),
});

export const PublicReportSchema = z.object({
  summary: z.string(),
  strengths: z.array(z.object({ checkId: z.string(), title: z.string(), detail: z.string() })),
  topIssues: z.array(z.object({ checkId: z.string(), title: z.string(), whyItMatters: z.string() })),
  aiVisibilitySummary: z.string(),
  firstSteps: z.array(z.object({ title: z.string(), detail: z.string() })),
  aiVisibility: z
    .object({
      assistant: z.string(),
      askedAt: z.string(),
      rows: z.array(
        z.object({ question: z.string(), named: z.boolean(), namedInstead: z.array(z.string()) }),
      ),
    })
    .nullable()
    .optional(),
});

export const PublicAuditSchema = z.object({
  status: z.enum(['running', 'snapshot_ready', 'failed']),
  auditedUrl: z.string(),
  snapshot: SnapshotSchema.nullable(),
  report: PublicReportSchema.nullable(),
  unlocked: z.boolean(),
  createdAt: z.string(),
});

export type Severity = z.infer<typeof Severity>;
export type AreaScore = z.infer<typeof AreaScoreSchema>;
export type SpeedReading = z.infer<typeof SpeedReadingSchema>;
export type Snapshot = z.infer<typeof SnapshotSchema>;
export type PublicReport = z.infer<typeof PublicReportSchema>;
export type PublicAudit = z.infer<typeof PublicAuditSchema>;

/** The token HQ issues and the page URL carries. Same rule as HQ's. */
export const AUDIT_TOKEN = /^[A-Za-z0-9_-]{24,128}$/;

/** A fresh unguessable token: 32 bytes, base64url, 43 characters. */
export function newAuditToken(): string {
  const bytes = new Uint8Array(32);
  globalThis.crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
