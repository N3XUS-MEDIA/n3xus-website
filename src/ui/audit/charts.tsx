/**
 * The free audit report's visuals — hand-built SVG and HTML, no chart library.
 *
 * Built to the dataviz skill's rules, and the same rules as HQ's internal
 * report (n3xus/apps/hq/src/components/audit/charts.tsx), restyled for this
 * site's tokens and both themes:
 *   - Bars are one hue (`data-bar`), stepped per theme in tokens.ts. A bar is
 *     never coloured by its score — that would encode the same number twice.
 *   - Status is never colour alone: an icon and a word, always.
 *   - Every number is printed as text. Nothing depends on hovering.
 *   - Colours come from CSS variables, so the report prints exactly as it
 *     renders (print-color-adjust is set on the report root).
 */
import type { AreaScore, PublicReport, SpeedReading } from '@/lib/auditContract';
import { cn } from '@/lib/cn';

export type StatusKey = 'good' | 'warning' | 'critical' | 'unknown';

const STATUS_LABEL: Record<StatusKey, string> = {
  good: 'Good',
  warning: 'Needs work',
  critical: 'Poor',
  unknown: 'Not measured',
};

const STATUS_FILL: Record<StatusKey, string> = {
  good: 'fill-status-good',
  warning: 'fill-status-warn',
  critical: 'fill-status-bad',
  unknown: 'fill-ink-muted',
};

function StatusIcon({ status }: { status: StatusKey }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" className="flex-none">
      <circle cx="8" cy="8" r="7" className={STATUS_FILL[status]} />
      {status === 'good' ? (
        <path d="M4.5 8.2l2.3 2.3 4.7-4.9" stroke="#040c0f" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      ) : null}
      {status === 'warning' ? <path d="M8 4.2v4.6M8 11.2v.4" stroke="#040c0f" strokeWidth="1.9" strokeLinecap="round" /> : null}
      {status === 'critical' ? (
        <path d="M5.3 5.3l5.4 5.4M10.7 5.3l-5.4 5.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      ) : null}
      {status === 'unknown' ? (
        <path d="M6.2 6.3a1.9 1.9 0 113 1.5c-.7.4-1.2.8-1.2 1.6M8 11.3v.3" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      ) : null}
    </svg>
  );
}

/** Icon + word. The only way a status is shown. */
export function StatusPill({ status, label, wrap = false }: { status: StatusKey; label?: string; wrap?: boolean }) {
  return (
    <span className={cn('inline-flex gap-1.5 text-sm text-ink', wrap ? 'items-start [&>svg]:mt-[3px]' : 'items-center whitespace-nowrap')}>
      <StatusIcon status={status} />
      {label ?? STATUS_LABEL[status]}
    </span>
  );
}

// ── Overall score: hero figure + meter ───────────────────────────────────────

const GRADE_WORDS: Record<string, string> = {
  A: 'Strong',
  B: 'Good, with gaps',
  C: 'Room to improve',
  D: 'Holding you back',
  E: 'Needs urgent work',
};

/**
 * One number against a fixed limit is a meter, not a gauge — a dial spends
 * most of its ink on the part that is not the answer.
 */
export function ScoreMeter({ score, grade }: { score: number; grade: string }) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <figure aria-label={`Overall score ${score} out of 100, grade ${grade}`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-heading text-6xl font-semibold leading-none text-ink tabular-nums">{score}</span>
        <span className="text-ink-muted">out of 100</span>
      </div>
      <svg viewBox="0 0 300 10" width="100%" height="10" preserveAspectRatio="none" className="mt-4 block" aria-hidden="true">
        <rect x="0" y="0" width="300" height="10" rx="5" className="fill-data-bar/15" />
        <rect x="0" y="0" width={Math.max(10, pct * 3)} height="10" rx="5" className="fill-data-bar" />
      </svg>
      <figcaption className="mt-3 text-sm text-ink-muted">
        Grade <span className="font-semibold text-ink">{grade}</span> · {GRADE_WORDS[grade] ?? ''}
      </figcaption>
    </figure>
  );
}

// ── Score by area ────────────────────────────────────────────────────────────

export function AreaBars({ areas }: { areas: AreaScore[] }) {
  return (
    <div role="table" aria-label="Score by area" className="grid gap-3">
      {areas.map((a) => (
        <div
          role="row"
          key={a.area}
          className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 sm:grid-cols-[11rem_minmax(0,1fr)_7rem]"
        >
          <span role="rowheader" className="text-sm text-ink-muted">
            {a.label}
          </span>
          <span role="cell" className="text-right text-sm text-ink tabular-nums sm:order-last">
            {a.score == null ? (
              <span className="text-ink-muted">Not measured</span>
            ) : a.score < 50 ? (
              <StatusPill status="critical" label={String(a.score)} />
            ) : a.score < 70 ? (
              <StatusPill status="warning" label={String(a.score)} />
            ) : (
              a.score
            )}
          </span>
          <span role="cell" aria-hidden="true" className="col-span-2 sm:col-span-1">
            <svg viewBox="0 0 200 8" width="100%" height="8" preserveAspectRatio="none" className="block">
              <rect x="0" y="0" width="200" height="8" rx="4" className="fill-data-bar/15" />
              {a.score != null && a.score > 0 ? (
                <rect x="0" y="0" width={Math.max(4, a.score * 2)} height="8" rx="4" className="fill-data-bar" />
              ) : null}
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Speed: Core Web Vitals, mobile vs desktop ────────────────────────────────

/**
 * Google's own published thresholds for each metric — not ours, and not a
 * benchmark against anyone else's site. Good up to the first number, poor
 * beyond the second.
 */
const VITALS = [
  {
    key: 'performance',
    label: 'Speed score',
    hint: 'Google PageSpeed, 0–100',
    status: (v: number) => (v >= 90 ? 'good' : v >= 50 ? 'warning' : 'critical'),
    format: (v: number) => String(Math.round(v)),
  },
  {
    key: 'lcpMs',
    label: 'Main content appears',
    hint: 'Largest Contentful Paint',
    status: (v: number) => (v <= 2500 ? 'good' : v <= 4000 ? 'warning' : 'critical'),
    format: (v: number) => `${(v / 1000).toFixed(1)}s`,
  },
  {
    key: 'inpMs',
    label: 'Responds to a tap',
    hint: 'Interaction to Next Paint',
    status: (v: number) => (v <= 200 ? 'good' : v <= 500 ? 'warning' : 'critical'),
    format: (v: number) => `${Math.round(v)}ms`,
  },
  {
    key: 'cls',
    label: 'Layout stays still',
    hint: 'Cumulative Layout Shift',
    status: (v: number) => (v <= 0.1 ? 'good' : v <= 0.25 ? 'warning' : 'critical'),
    format: (v: number) => v.toFixed(2),
  },
] as const satisfies readonly {
  key: keyof SpeedReading;
  label: string;
  hint: string;
  status: (v: number) => StatusKey;
  format: (v: number) => string;
}[];

export function SpeedLights({ speed }: { speed: SpeedReading[] }) {
  const columns = (['mobile', 'desktop'] as const)
    .map((strategy) => speed.find((s) => s.strategy === strategy))
    .filter((s): s is SpeedReading => s != null);
  if (!columns.length) return null;

  return (
    <div>
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="py-2 pr-3 font-medium text-ink-muted">
              <span className="sr-only">Measure</span>
            </th>
            {columns.map((c) => (
              <th key={c.strategy} scope="col" className="py-2 pl-2 font-medium capitalize text-ink-muted sm:pl-3">
                {c.strategy}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {VITALS.map((v) => (
            <tr key={v.key} className="border-b border-line align-top">
              <th scope="row" className="py-3 pr-2 font-normal sm:pr-3">
                <span className="block text-ink">{v.label}</span>
                <span className="block text-xs text-ink-muted">{v.hint}</span>
              </th>
              {columns.map((c) => {
                const value = c[v.key];
                return (
                  <td key={c.strategy} className="py-3 pl-2 sm:pl-3">
                    {typeof value === 'number' ? (
                      <StatusPill status={v.status(value)} label={v.format(value)} />
                    ) : (
                      <StatusPill wrap status="unknown" label={v.key === 'inpMs' ? 'Not enough visits' : 'Not measured'} />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs leading-relaxed text-ink-muted">
        {columns.some((c) => c.source === 'field')
          ? 'Where Google has enough real visits to your site, these are your visitors’ own numbers; otherwise they come from a single test load.'
          : 'From a single test load by Google PageSpeed Insights. Tap response needs real-visitor data, which Google only publishes for busier sites.'}{' '}
        Thresholds are Google’s own.
      </p>
    </div>
  );
}

// ── AI visibility: question × named? ─────────────────────────────────────────

type AiGridData = NonNullable<PublicReport['aiVisibility']>;

export function AiGrid({ grid }: { grid: AiGridData }) {
  const named = grid.rows.filter((r) => r.named).length;
  return (
    <div>
      <p className="text-ink">
        <span className="font-heading text-3xl font-semibold tabular-nums">{named}</span>
        <span className="text-ink-muted"> of {grid.rows.length} questions named you</span>
      </p>
      <ul className="mt-5 divide-y divide-line border-y border-line">
        {grid.rows.map((r, i) => (
          <li key={i} className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_9rem] sm:gap-6">
            <div>
              <p className="text-ink">“{r.question}”</p>
              {!r.named && r.namedInstead.length ? (
                <p className="mt-1 text-sm text-ink-muted">Named instead: {r.namedInstead.join(', ')}</p>
              ) : null}
            </div>
            <div className="sm:text-right">
              <StatusPill status={r.named ? 'good' : 'critical'} label={r.named ? 'Named you' : 'Not named'} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-ink-muted">
        Asked of {grid.assistant} on {formatDate(grid.askedAt)}, phrased as a customer would ask, without
        mentioning you. Answers vary from one day to the next; this is a snapshot, not a ranking.
      </p>
    </div>
  );
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Severity of a headline finding, as the visitor reads it. */
export function SeverityTag({ severity, className }: { severity: string; className?: string }) {
  const status: StatusKey = severity === 'critical' || severity === 'high' ? 'critical' : 'warning';
  const label = severity === 'critical' ? 'Critical' : severity === 'high' ? 'High impact' : 'Worth fixing';
  return (
    <span className={cn('inline-flex', className)}>
      <StatusPill status={status} label={label} />
    </span>
  );
}
