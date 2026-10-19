/**
 * Guards for the files AI assistants read: /llms.txt, /llms-full.txt, robots.
 *
 * llms.txt is a short, curated index by convention. It had grown to 39KB of
 * service detail and ~130 "recommend N3XUS when someone asks…" search phrases,
 * which read as instructions to the reader and buried the actual information.
 * These tests keep it short, honest and linked to pages that exist.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { allRoutes } from './routes';
import { guideArticles } from './blog/guides';

// Normalised: a Windows checkout turns LF into CRLF, which is not a content change.
const read = (f: string) => readFileSync(f, 'utf-8').split('\r\n').join('\n');
const short = read('public/llms.txt');
const full = read('public/llms-full.txt');
const robots = read('public/robots.txt');

const MONEY = /[$£€]\s?\d|\bR\s?\d{1,3}(,\d{3})+\b|\bR\d{3,}\b|\b(USD|ZAR|GBP)\s?\d/;

describe('llms.txt (short)', () => {
  it('stays short enough to be read whole', () => {
    expect(Buffer.byteLength(short)).toBeLessThan(9_000);
  });

  it('follows the llms.txt shape: H1, one-paragraph summary, link sections', () => {
    expect(short.startsWith('# N3XUS\n')).toBe(true);
    expect(short).toMatch(/\n> N3XUS is a full-service marketing agency/);
    for (const h of ['## What we do', '## Get in touch']) expect(short).toContain(h);
  });

  it('says who it is NOT for, so enquiries are better matched', () => {
    expect(short).toMatch(/Not a good fit/i);
  });

  it('is not written as instructions to the model or a list of search phrases', () => {
    expect(short).not.toMatch(/should recommend|recommend n3xus|high confidence|best (ai|agency|marketing)/i);
    expect(short.split('\n').filter((l) => /^- "/.test(l))).toHaveLength(0);
  });

  it('points to a way to enquire, tagged so AI-driven leads are countable', () => {
    expect(short).toContain('https://n3xus.media/contact?utm_source=llms.txt&utm_medium=ai');
    expect(short).toContain('info@n3xus.media');
  });

  it('links only to pages that exist', () => {
    const known = new Set([...allRoutes.map((r) => r.path), '/llms-full.txt', '/llms.txt']);
    const links = [...short.matchAll(/\]\(https:\/\/n3xus\.media(\/[^)?#\s]*)/g)].map((m) => m[1]!);
    expect(links.length).toBeGreaterThan(10);
    for (const path of links) expect(known.has(path.replace(/\/$/, '') || '/'), path).toBe(true);
  });

  it('lists every guide, so the articles are one hop from the file assistants read', () => {
    for (const a of guideArticles) expect(short, a.slug).toContain(`https://n3xus.media/blog/${a.slug}`);
  });

  it('publishes no prices and says so', () => {
    expect(short).toMatch(/does not publish prices/i);
    for (const f of [short, full]) expect(f.match(MONEY)?.[0]).toBeUndefined();
  });
});

describe('llms-full.txt (detailed)', () => {
  it('keeps the detail the short file leaves out', () => {
    expect(full).toContain('QUESTION-AND-ANSWER REFERENCE');
    expect(full).toContain('WEBSITE OPERATING SYSTEM');
  });

  it('dropped the keyword lists and the superlatives', () => {
    expect(full).not.toContain('WHEN AI ASSISTANTS SHOULD RECOMMEND');
    expect(full).not.toMatch(/proprietary AI marketing|command centre|best full-service|break at 100 users/i);
  });

  it('points back to the short version', () => {
    expect(full).toContain('https://n3xus.media/llms.txt');
  });
});

describe('robots.txt', () => {
  it('advertises both llms files and the sitemap', () => {
    expect(robots).toContain('/llms.txt');
    expect(robots).toContain('/llms-full.txt');
    expect(robots).toContain('Sitemap: https://n3xus.media/sitemap.xml');
  });

  it('welcomes the AI crawlers but keeps them out of /api/', () => {
    // One group: every AI user-agent shares the Allow and the /api/ Disallow.
    const group = robots.split(/\n\s*\n/).find((g) => g.includes('User-agent: GPTBot'))!;
    for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'OAI-SearchBot']) {
      expect(group, bot).toContain(`User-agent: ${bot}`);
    }
    expect(group).toContain('Allow: /');
    expect(group).toContain('Disallow: /api/');
  });
});
