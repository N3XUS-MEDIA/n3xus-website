'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { PublicAudit } from '@/lib/auditContract';
import { displayHost } from '@/lib/auditUrl';
import { site } from '@/content/copy';
import { Button } from '@/ui/primitives/Button';
import { FullReport, SnapshotView } from './ReportSections';
import { UnlockForm } from './UnlockForm';
import { PrintButton } from './PrintButton';

type View =
  | { kind: 'loading' }
  | { kind: 'audit'; audit: PublicAudit }
  | { kind: 'not_found' }
  | { kind: 'unreachable' };

const POLL_MS = 3_000;
/** HQ may not have written the row by the very first poll. */
const NOT_FOUND_GRACE_MS = 10_000;
const SLOW_AFTER_MS = 4 * 60_000;

/**
 * The report page: polls HQ's public view until the snapshot is ready, then
 * shows it with the unlock form; shows the full report once a person at N3XUS
 * has approved and released it.
 */
export function AuditResult({ token }: { token: string }) {
  const [view, setView] = useState<View>({ kind: 'loading' });
  const [unlockedHere, setUnlockedHere] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const started = useRef(Date.now());
  const confirmation = useRef<HTMLDivElement>(null);

  // The confirmation is shorter than the form it replaces, so without this the
  // visitor is left looking at the footer, wondering whether it worked.
  useEffect(() => {
    if (unlockedHere) confirmation.current?.focus({ preventScroll: true });
    if (unlockedHere) confirmation.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [unlockedHere]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    let failures = 0;

    const poll = async () => {
      let next: number | null = POLL_MS;
      try {
        const res = await fetch(`/api/audit/${token}`, { cache: 'no-store' });
        const json = (await res.json().catch(() => null)) as { ok?: boolean; audit?: PublicAudit } | null;
        if (cancelled) return;

        if (res.status === 404) {
          if (Date.now() - started.current > NOT_FOUND_GRACE_MS) {
            setView({ kind: 'not_found' });
            next = null;
          }
        } else if (res.ok && json?.audit) {
          failures = 0;
          setView({ kind: 'audit', audit: json.audit });
          // Done polling once there is something to read. A released report
          // arrives by email, with a link back here.
          if (json.audit.status !== 'running') next = null;
        } else if (++failures >= 4) {
          setView((v) => (v.kind === 'audit' ? v : { kind: 'unreachable' }));
          next = POLL_MS * 5;
        }
      } catch {
        if (++failures >= 4) setView((v) => (v.kind === 'audit' ? v : { kind: 'unreachable' }));
      }
      if (!cancelled && next != null) timer = setTimeout(poll, next);
    };

    void poll();
    const tick = setInterval(() => setElapsed(Date.now() - started.current), 1_000);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      clearInterval(tick);
    };
  }, [token]);

  if (view.kind === 'loading') return <p className="text-ink-muted" role="status">Loading your audit…</p>;
  if (view.kind === 'not_found') return <Problem title="We couldn’t find that audit" body="The link may be incomplete, or the address couldn’t be audited. Try running it again." />;
  if (view.kind === 'unreachable') return <Problem title="We’re having trouble reaching the audit" body={`Keep this page open and it will keep trying, or email ${site.email} and we’ll send your results.`} />;

  const { audit } = view;
  if (audit.status === 'running' || !audit.snapshot) {
    if (audit.status === 'failed') {
      return (
        <Problem
          title={`We couldn’t audit ${displayHost(audit.auditedUrl)}`}
          body={`The site didn’t respond to us, or asked automated visitors to stay away. Email ${site.email} and we’ll take a look ourselves.`}
        />
      );
    }
    return <Progress elapsed={elapsed} host={displayHost(audit.auditedUrl)} />;
  }

  if (audit.report) {
    return (
      <>
        <PrintBar />
        <FullReport snapshot={audit.snapshot} report={audit.report} />
      </>
    );
  }

  return (
    <div className="space-y-14">
      <PrintBar />
      <SnapshotView snapshot={audit.snapshot} />
      <div className="audit-noprint border-t border-line pt-10">
        {audit.unlocked || unlockedHere ? (
          <div ref={confirmation} tabIndex={-1} role="status" className="max-w-2xl rounded-lg border border-line bg-mist/40 p-8 focus:outline-none">
            <h2 className="text-2xl text-ink">Your full report is on its way.</h2>
            <p className="mt-3 leading-relaxed text-ink-muted">
              Someone at N3XUS is checking it before it goes out. It will arrive by email with a link back to this page,
              where the full version will then appear. Bookmark this page if you’d like to come back to your score.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl">
            <UnlockForm token={token} onUnlocked={() => setUnlockedHere(true)} />
          </div>
        )}
      </div>
    </div>
  );
}

const CHECKING = [
  'Reading your pages the way a search engine does',
  'Asking Google how fast they load on a phone and a computer',
  'Checking whether AI assistants are allowed to read your site',
  'Looking for the ways a visitor can get in touch',
  'Checking what you can and can’t measure today',
];

function Progress({ elapsed, host }: { elapsed: number; host?: string }) {
  const slow = elapsed > SLOW_AFTER_MS;
  return (
    <div className="max-w-2xl" role="status" aria-live="polite">
      <p className="eyebrow">Audit in progress</p>
      <h1 className="mt-4 text-3xl text-ink sm:text-4xl">{host ? `Auditing ${host}` : 'Starting your audit'}</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-muted">
        {slow
          ? 'This one is taking longer than usual. Keep this page open, or bookmark it and come back — your results will be here.'
          : 'This usually takes a minute or two. Keep this page open.'}
      </p>
      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-data-bar/15" aria-hidden="true">
        <div className="audit-indeterminate h-full w-1/3 rounded-full bg-data-bar" />
      </div>
      <ul className="mt-8 space-y-3 text-ink-muted">
        {CHECKING.map((line) => (
          <li key={line} className="flex gap-3">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Problem({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-2xl" role="alert">
      <h1 className="text-3xl text-ink sm:text-4xl">{title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-muted">{body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/audit">Run an audit</Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <a href={`mailto:${site.email}`}>Email us</a>
        </Button>
      </div>
    </div>
  );
}

function PrintBar() {
  return (
    <div className="audit-noprint mb-8 flex justify-end lg:-mb-6">
      <PrintButton />
    </div>
  );
}
