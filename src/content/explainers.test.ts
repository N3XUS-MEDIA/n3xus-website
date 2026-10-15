/**
 * Guard rails for the animated explainers (src/ui/explainers).
 *
 * A diagram is copy you can't skim past, so the copy rules apply to every
 * label in it — and docs/CLAIMS-REGISTER.md is explicit that invented figures
 * and fake product UI don't ship, whatever form they take. Every diagram also
 * needs a plain-text summary: it is what a screen reader gets instead of the
 * drawing.
 */
import { describe, expect, it } from 'vitest';
import type { Block, Diagram } from './blocks';
import { hero, problem, process, websiteOs } from './home';
import { websiteOsPage } from './services/website-os';

const PERCENT_OR_MONEY = /%|[$£€]\s?\d|\bR\s?\d|\b(USD|ZAR|GBP)\b/;
/** Bare numbers. Clock times ("17:12") and step numbers ("01") are allowed. */
const BARE_NUMBER = /(?<![:\d])\b\d+(?:[.,]\d+)?\b(?![:\d])/;

function labels(d: Diagram): string[] {
  switch (d.kind) {
    case 'osHub':
      return [d.centre, ...d.items.map((i) => i.label)];
    case 'twoTrack':
      return [d.before.label, d.after.label, ...d.before.steps.map((s) => s.text), ...d.after.steps.map((s) => s.title)];
    case 'compareVisual':
      return [d.before.label, d.after.label, ...d.before.rows, ...d.after.rows];
  }
}

const explainers = websiteOsPage.blocks.filter(
  (b): b is Extract<Block, { type: 'explainer' }> => b.type === 'explainer',
);

const homeLabels = [
  hero.system.loopLabel,
  ...problem.diagram.suppliers,
  problem.diagram.you,
  problem.diagram.joined,
  websiteOs.centre,
  ...websiteOs.items.map((i) => i.label),
  ...process.steps.map((s) => s.holds),
];

const allLabels = [...homeLabels, ...explainers.flatMap((b) => labels(b.diagram))];

describe('explainers', () => {
  it('the Website OS page uses all three diagram kinds', () => {
    expect(new Set(explainers.map((b) => b.diagram.kind))).toEqual(
      new Set(['osHub', 'twoTrack', 'compareVisual']),
    );
  });

  it('every diagram has a text alternative', () => {
    const summaries = [
      hero.system.summary,
      problem.diagram.summary,
      websiteOs.summary,
      process.summary,
      ...explainers.map((b) => b.summary),
    ];
    for (const s of summaries) expect(s.trim().length).toBeGreaterThan(60);
  });

  it('no diagram label carries a percentage, a price or an invented figure', () => {
    for (const label of allLabels) {
      expect(label, label).not.toMatch(PERCENT_OR_MONEY);
      expect(label, label).not.toMatch(BARE_NUMBER);
    }
  });

  it('hub labels are short enough to sit in a node', () => {
    const hub = explainers.find((b) => b.diagram.kind === 'osHub')!.diagram;
    if (hub.kind !== 'osHub') throw new Error('unreachable');
    for (const i of [...hub.items, ...websiteOs.items]) expect(i.label.length).toBeLessThanOrEqual(18);
  });

  it('every interactive hub spoke has the detail it opens', () => {
    const hub = explainers.find((b) => b.diagram.kind === 'osHub')!.diagram;
    if (hub.kind !== 'osHub') throw new Error('unreachable');
    for (const i of hub.items) {
      expect(i.body?.length ?? 0).toBeGreaterThan(40);
      expect(i.outcome).toBeTruthy();
    }
  });

  it('the two tracks line up step for step', () => {
    const t = explainers.find((b) => b.diagram.kind === 'twoTrack')!.diagram;
    if (t.kind !== 'twoTrack') throw new Error('unreachable');
    expect(t.before.steps.length).toBe(t.after.steps.length);
  });
});
