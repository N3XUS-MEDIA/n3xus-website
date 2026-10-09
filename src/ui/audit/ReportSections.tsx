import type { PublicReport, Snapshot } from '@/lib/auditContract';
import { displayHost } from '@/lib/auditUrl';
import { site } from '@/content/copy';
import { Button } from '@/ui/primitives/Button';
import { AiGrid, AreaBars, formatDate, ScoreMeter, SeverityTag, SpeedLights, StatusPill } from './charts';

/**
 * The two views a visitor can reach: the instant snapshot (no AI, no human),
 * and the full free report (written by AI from the rubric, approved by a
 * person). Pure components — the polling lives in AuditResult.
 */

function Block({ title, eyebrow, children }: { title: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <section className="audit-block border-t border-line pt-10">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-2xl text-ink sm:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function ScoreHeader({ snapshot }: { snapshot: Snapshot }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="eyebrow">Website audit · {formatDate(snapshot.generatedAt)}</p>
        <h1 className="mt-4 break-words text-3xl text-ink sm:text-4xl">{displayHost(snapshot.auditedUrl)}</h1>
        <div className="mt-8">
          <ScoreMeter score={snapshot.overall} grade={snapshot.grade} />
        </div>
      </div>
      <div className="lg:col-span-7">
        <h2 className="text-lg text-ink">Score by area</h2>
        <div className="mt-5">
          <AreaBars areas={snapshot.areas} />
        </div>
      </div>
    </div>
  );
}

export function SnapshotView({ snapshot }: { snapshot: Snapshot }) {
  return (
    <div className="space-y-14">
      <ScoreHeader snapshot={snapshot} />

      {snapshot.headlines.length ? (
        <Block eyebrow="Your score, explained" title="The three things costing you most">
          <ol className="grid gap-5 lg:grid-cols-3">
            {snapshot.headlines.map((h, i) => (
              <li key={h.checkId} className="rounded-lg border border-line bg-mist/40 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-heading text-sm font-semibold text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                  <SeverityTag severity={h.severity} />
                </div>
                <h3 className="mt-4 text-lg text-ink">{h.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{h.why}</p>
              </li>
            ))}
          </ol>
        </Block>
      ) : (
        <Block title="Nothing major to flag">
          <p className="max-w-2xl leading-relaxed text-ink-muted">
            None of our scored checks failed. The full report still covers how AI assistants answer about you and
            where there is room to grow.
          </p>
        </Block>
      )}

      {snapshot.speed?.length ? (
        <Block eyebrow="Measured by Google" title="How fast it feels">
          <div className="max-w-2xl">
            <SpeedLights speed={snapshot.speed} />
          </div>
        </Block>
      ) : null}
    </div>
  );
}

export function FullReport({ snapshot, report }: { snapshot: Snapshot; report: PublicReport }) {
  return (
    <div className="space-y-14">
      <ScoreHeader snapshot={snapshot} />

      <Block eyebrow="Summary" title="What we found">
        <p className="max-w-3xl text-lg leading-relaxed text-ink">{report.summary}</p>
      </Block>

      {report.strengths.length ? (
        <Block eyebrow="Keep doing this" title="What’s working">
          <ul className="grid gap-5 lg:grid-cols-3">
            {report.strengths.map((s) => (
              <li key={s.checkId} className="rounded-lg border border-line p-6">
                <StatusPill status="good" label="Working" />
                <h3 className="mt-3 text-lg text-ink">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{s.detail}</p>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {report.topIssues.length ? (
        <Block eyebrow="Costing you enquiries" title="The issues that matter most">
          <ol className="divide-y divide-line border-t border-line">
            {report.topIssues.map((issue, i) => {
              const severity = snapshot.headlines.find((h) => h.checkId === issue.checkId)?.severity;
              return (
                <li key={issue.checkId} className="grid gap-3 py-6 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-6">
                  <span className="font-heading text-sm font-semibold text-ink-muted">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-lg text-ink">{issue.title}</h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-ink-muted">{issue.whyItMatters}</p>
                  </div>
                  {severity ? <SeverityTag severity={severity} className="sm:justify-end" /> : <span />}
                </li>
              );
            })}
          </ol>
        </Block>
      ) : null}

      <Block eyebrow="AI visibility" title="When customers ask an AI assistant">
        <p className="max-w-3xl leading-relaxed text-ink-muted">{report.aiVisibilitySummary}</p>
        {report.aiVisibility?.rows.length ? (
          <div className="mt-8 max-w-3xl">
            <AiGrid grid={report.aiVisibility} />
          </div>
        ) : null}
      </Block>

      {snapshot.speed?.length ? (
        <Block eyebrow="Measured by Google" title="How fast it feels">
          <div className="max-w-2xl">
            <SpeedLights speed={snapshot.speed} />
          </div>
        </Block>
      ) : null}

      {report.firstSteps.length ? (
        <Block eyebrow="Where we’d start" title="Three things we’d do first">
          <ol className="grid gap-5 lg:grid-cols-3">
            {report.firstSteps.map((step, i) => (
              <li key={i} className="rounded-lg bg-mist/50 p-6">
                <span className="font-heading text-sm font-semibold text-accent-ink">Step {i + 1}</span>
                <h3 className="mt-3 text-lg text-ink">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{step.detail}</p>
              </li>
            ))}
          </ol>
          <div className="audit-noprint mt-10 rounded-lg bg-carbon p-8 text-on-carbon sm:p-10">
            <h3 className="text-2xl text-on-carbon">Want us to walk you through it?</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-on-carbon/75">
              A short call to go through your report, answer questions, and agree what’s worth fixing first. No pitch
              deck.
            </p>
            <Button asChild size="lg" className="mt-6">
              {site.bookingIsLive ? (
                <a href={site.bookingUrl} {...site.bookingLinkProps}>
                  Book a call
                </a>
              ) : (
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(`My website audit — ${displayHost(snapshot.auditedUrl)}`)}`}>
                  Email us to book a call
                </a>
              )}
            </Button>
          </div>
        </Block>
      ) : null}

      <Method />
    </div>
  );
}

/** How the audit works and what it cannot see. Part of every full report. */
export function Method() {
  return (
    <Block eyebrow="Method and limits" title="How this audit works">
      <div className="grid max-w-4xl gap-8 text-ink-muted sm:grid-cols-2">
        <p className="leading-relaxed">
          We read the pages of your website that anyone can visit — never logged-in areas — and obey your robots.txt.
          Google PageSpeed Insights measures speed. An AI assistant with web search answers questions your customers
          might ask. Scores come from a fixed checklist, so the same site scores the same way every time.
        </p>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-semibold text-ink">Measured</dt>
            <dd>Tested directly and repeatable, like page speed or whether AI crawlers are allowed.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Observed</dt>
            <dd>Seen on your pages, like a missing booking option or contact details.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">What we can’t see</dt>
            <dd>
              How you handle enquiries once they arrive, your sales process and your numbers. That’s what a call is
              for.
            </dd>
          </div>
        </dl>
      </div>
    </Block>
  );
}
