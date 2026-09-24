/**
 * Guards the positioning: N3XUS is a full-service marketing agency working
 * across strategy, intelligence and growth.
 *
 * An August 2026 pass relabelled the site a "business management consultancy".
 * That overcorrected — the revenue is execution, and the systems work exists to
 * make that execution measurable — and Google declined the matching Business
 * Profile category twice before auto-reverting it. Reversed 2026-09-24. These
 * tests exist because the consultancy wording is still in git history, in the
 * founders' muscle memory, and in every draft written from an August document.
 *
 * This comment said "technology and growth" until 2026-09-07 — the exact
 * phrase the test below forbids in the app. A doc comment is not covered by
 * its own assertions, which is how the wrong pillar survived here.
 *
 * A rename is easy to do and easy to half-undo. These tests exist because the
 * old naming and the old framing are still sitting in git history, in the
 * founders' muscle memory, and in every draft anyone writes from an old
 * document.
 */
import { describe, expect, it } from 'vitest';
import { globSync, readFileSync } from 'node:fs';
import { PILLARS, primaryNav, serviceLinks, serviceNav, site } from './copy';
import { audiences, core3, faqs, hero } from './home';
import { layers } from './services';
import { staticRoutes } from './routes';
import { organisationLd } from './structuredData';
import { buildSystemPrompt } from '@/server/aria/systemPrompt';

describe('brand naming', () => {
  it('uses N3XUS as the brand name', () => {
    expect(site.name).toBe('N3XUS');
  });

  /**
   * The registered entity is deliberately NOT renamed. Changing it is a CIPC
   * filing, not a website edit, and the copyright line and legal pages must
   * stay accurate until that happens.
   */
  it('keeps the registered entity name for legal contexts', () => {
    expect(site.legalName).toBe('N3XUS Media (Pty) Ltd');
  });

  it('keeps the domain', () => {
    expect(site.url).toBe('https://n3xus.media');
  });

  it('retains the former name as an alternateName for entity matching', () => {
    const ld = organisationLd() as { alternateName?: string[] };
    expect(ld.alternateName).toContain('N3XUS Media');
  });
});

describe('the three disciplines', () => {
  it('names strategy, intelligence and growth, in that order', () => {
    expect(PILLARS.map((p) => p.name)).toEqual(['Strategy', 'Intelligence', 'Growth']);
  });

  it('leads the homepage with them', () => {
    expect(hero.eyebrow).toBe('Strategy · Intelligence · Growth');
  });

  it('explains what the 3 stands for', () => {
    expect(core3.eyebrow.toLowerCase()).toContain('3');
    const titles = core3.layers.map((l) => l.title.toLowerCase());
    expect(titles[0]).toContain('strategy');
    expect(titles[1]).toContain('intelligence');
    expect(titles[2]).toContain('growth');
  });

  it('opens the services hub with strategy', () => {
    expect(layers[0].id).toBe('strategy');
    expect(layers[0].label).toBe('Pillar 01');
  });

  /** The old framing. None of it should survive as a pillar name. */
  it('has retired Build / Grow / Amplify as pillar labels', () => {
    for (const layer of layers) {
      expect(layer.name).not.toMatch(/^Build —|^Grow —|^Amplify —/);
    }
  });
});

describe('routing', () => {
  it('has a strategy page in the sitemap', () => {
    expect(staticRoutes.map((r) => r.path)).toContain('/services/strategy');
  });

  /**
   * Brand, TV and streaming are demoted, not deleted — they are live URLs with
   * search history and revenue behind them. Removing them would be an SEO and
   * commercial decision, not a repositioning one.
   */
  it('keeps the brand and streaming URLs reachable', () => {
    const paths = staticRoutes.map((r) => r.path);
    expect(paths).toContain('/services/brand');
    expect(paths).toContain('/services/dstv-stream');

    const navHrefs = serviceLinks.map((l) => l.href);
    expect(navHrefs).toContain('/services/brand');
    expect(navHrefs).toContain('/services/dstv-stream');
  });

  it('groups the service nav by the three pillars', () => {
    expect(serviceNav.map((g) => g.pillar)).toEqual(['Strategy', 'Intelligence', 'Growth']);
  });

  it('files brand and streaming under Growth, not their own pillar', () => {
    const growth = serviceNav.find((g) => g.pillar === 'Growth');
    expect(growth?.items.map((i) => i.href)).toEqual(
      expect.arrayContaining(['/services/brand', '/services/dstv-stream']),
    );
  });

  it('does not label a primary nav item "Services"', () => {
    // "What we do" — a consultancy sells engagements, not a service menu.
    expect(primaryNav.find((i) => i.href === '/services')?.label).toBe('What we do');
  });
});

describe('metadata and structured data', () => {
  it('never says "technology and growth" anywhere in the app', () => {
    for (const f of [
      'app/layout.tsx',
      'app/page.tsx',
      'app/services/page.tsx',
      'src/content/structuredData.ts',
    ]) {
      expect(readFileSync(f, 'utf-8').toLowerCase(), f).not.toContain('technology and growth');
    }
  });
});

describe('the assistant', () => {
  const prompt = buildSystemPrompt().replace(/\s+/g, ' ');

  it('describes the firm as a marketing agency', () => {
    expect(prompt).toMatch(/full-service marketing agency/i);
  });

  /**
   * The inverse of the rule this file used to assert. Aria was previously told
   * never to call N3XUS a marketing agency, which meant it corrected people who
   * had it right.
   */
  it('is told that "marketing agency" is correct, and not to say consultancy', () => {
    expect(prompt).toMatch(/N3XUS is a marketing agency, and saying so is correct/i);
    expect(prompt).toMatch(/do not call it a consultancy/i);
  });

  it('can still answer to the former name', () => {
    expect(prompt).toMatch(/previously called N3XUS Media/i);
  });
});

describe('public files carry the repositioning', () => {
  const llms = readFileSync('public/llms.txt', 'utf-8');
  const plugin = readFileSync('public/.well-known/ai-plugin.json', 'utf-8');

  it('llms.txt leads with the agency positioning', () => {
    expect(llms).toMatch(/N3XUS is a full-service marketing agency/);
    expect(llms).toMatch(/strategy, intelligence and growth/i);
  });

  it('llms.txt explains the former name rather than pretending it never existed', () => {
    expect(llms).toMatch(/previously called N3XUS Media/i);
  });

  it('llms.txt carries a strategy page reference', () => {
    expect(llms).toContain('https://n3xus.media/services/strategy');
  });

  it('llms.txt and ai-plugin.json name Intelligence, not Technology', () => {
    for (const [name, text] of [['llms.txt', llms], ['ai-plugin.json', plugin]] as const) {
      expect(text, name).toMatch(/strategy, intelligence and growth/i);
      expect(text, `${name} still says "technology and growth"`).not.toMatch(
        /technology and growth/i,
      );
    }
  });

  it('ai-plugin.json is valid JSON and repositioned', () => {
    const parsed = JSON.parse(plugin);
    expect(parsed.name_for_human).toBe('N3XUS');
    expect(parsed.description_for_model).toMatch(/full-service marketing agency/i);
    // The dangling openapi.yaml reference is gone (claims register G3).
    expect(parsed.api).toBeUndefined();
  });

  /** Every retired price, across both machine-readable files. */
  it('carries no superseded pricing', () => {
    for (const stale of ['$950/mo', '$2,400', '$5,500/mo', 'Dominate', '$135/mo', '$1,500 USD']) {
      expect(llms, `llms.txt contains ${stale}`).not.toContain(stale);
      expect(plugin, `ai-plugin.json contains ${stale}`).not.toContain(stale);
    }
  });

  /** Claims register A1/A2/A4 apply to machine-readable files too. */
  it('carries no unconfirmed claims', () => {
    for (const claim of ['528', 'media markup', '45-minute', '40-60%']) {
      expect(llms, `llms.txt contains "${claim}"`).not.toContain(claim);
      expect(plugin, `ai-plugin.json contains "${claim}"`).not.toContain(claim);
    }
  });
});

describe('site copy', () => {
  it('does not call the firm an agency in the homepage FAQ answers', () => {
    for (const f of faqs) {
      expect(f.a, f.q).not.toMatch(/\bwe are an agency\b|\bour agency\b/i);
    }
  });
});

/**
 * The copy was rewritten in 2026 because it had drifted into aphorism —
 * "Built to own the joins", "A recommendation you cannot cost is an opinion",
 * "spend directed at the constraint". Sentences that sound clever and leave the
 * reader no better informed about whether we understand their situation.
 *
 * These tests are a smoke alarm, not a style guide. They catch the specific
 * vocabulary that register runs on, because it comes back one word at a time.
 */
describe('plain language', () => {
  const files = [
    'src/content/home.ts',
    'src/content/about.ts',
    'src/content/services.ts',
    'src/content/contact.ts',
    'src/content/intelligence.ts',
    'src/content/services/strategy.ts',
  ];

  const corpus = files.map((f) => ({ f, text: readFileSync(f, 'utf-8') }));

  /** Consultant-register words that almost always replace a concrete noun. */
  const BANNED = [
    'downstream of',
    'the joins',
    'is an opinion',
    'the constraint,',
    'caps the other',
    'survives the room',
    'a line on an invoice',
    'compounding growth engine',
    'operational efficiencies',
    'best-in-class',
    'leverage',
    'synergies',
    'holistic',
  ];

  it('avoids the consultant register', () => {
    for (const { f, text } of corpus) {
      for (const phrase of BANNED) {
        expect(text.toLowerCase(), `${f} contains "${phrase}"`).not.toContain(phrase.toLowerCase());
      }
    }
  });

  /**
   * The homepage has to open on the reader's situation, not ours. "You" in the
   * first heading is a crude proxy for that, but a reliable one.
   */
  it('opens the homepage by talking to the reader', () => {
    expect(hero.title.toLowerCase()).toMatch(/\byou\b|\byour\b/);
  });

  it('offers both audiences a door', () => {
    const labels = audiences.doors.map((d) => d.label.toLowerCase());
    expect(labels.some((l) => l.includes('starting'))).toBe(true);
    expect(labels.some((l) => l.includes('outgrown'))).toBe(true);
    // Both routes lead somewhere, so neither is a dead end.
    for (const d of audiences.doors) expect(d.href).toMatch(/^\//);
  });

  it('keeps sentences in the hero readable', () => {
    // Not a hard rule elsewhere, but the first thing anyone reads should not be
    // a 40-word sentence.
    for (const sentence of hero.title.split(/(?<=[.?!])\s+/)) {
      expect(sentence.split(/\s+/).length, sentence).toBeLessThanOrEqual(16);
    }
  });
});

/**
 * The site and the Google Business Profile have to agree, because a reviewer
 * deciding a category comparison reads the site as evidence.
 *
 * History worth keeping: an edit changing the primary category from "Marketing
 * agency" to "Business management consultant" was declined twice and then
 * auto-reverted by Google from outside feedback. Rather than push harder, the
 * claim was withdrawn — the evidence said agency. The profile keeps "Marketing
 * agency" as primary, with secondary categories covering the build side.
 */
describe('Google Business Profile alignment', () => {
  const CATEGORY = 'marketing agency';

  it('states the primary category verbatim, in the words Google uses', () => {
    expect(site.category).toBe(CATEGORY);
    expect(site.descriptor.toLowerCase()).toContain(CATEGORY);
  });

  it('puts the category in the homepage title and description', () => {
    for (const f of ['app/layout.tsx', 'app/page.tsx']) {
      expect(readFileSync(f, 'utf-8').toLowerCase(), f).toContain(CATEGORY);
    }
  });

  /**
   * The name discrepancy is real and cannot be removed — the registered
   * company is still N3XUS Media (Pty) Ltd. So it has to be explained rather
   * than hidden, in a place a reviewer will actually look.
   */
  it('explains the trading name rather than leaving it to be reconciled', () => {
    expect(site.tradingNameNote).toContain('N3XUS');
    expect(site.tradingNameNote).toContain('N3XUS Media (Pty) Ltd');

    const about = readFileSync('src/content/about.ts', 'utf-8');
    expect(about).toContain('Trading name');
    expect(about).toContain('Registered entity');
    expect(about).toContain('Full-service marketing agency');
  });

  it('says it in the machine-readable files too', () => {
    for (const f of ['public/llms.txt', 'public/.well-known/ai-plugin.json']) {
      expect(readFileSync(f, 'utf-8').toLowerCase(), f).toContain(CATEGORY);
    }
  });

  /**
   * The claim that was withdrawn. It must not creep back into the copy that a
   * category reviewer reads, or the profile and the site disagree again.
   */
  it('does not call the firm a consultancy in public-facing copy', () => {
    expect(site.descriptor.toLowerCase()).not.toContain('consultan');
    for (const f of [
      'app/layout.tsx',
      'app/page.tsx',
      'public/llms.txt',
      'public/.well-known/ai-plugin.json',
    ]) {
      expect(readFileSync(f, 'utf-8').toLowerCase(), f).not.toContain('consultancy');
    }
  });
});

/**
 * Published pricing was withdrawn on 2026-09-18. Every figure — retainer
 * modules, the bundle discount, project "starting from" prices — lives in an
 * internal document now, not on the site.
 *
 * Prices leak back one sentence at a time: an FAQ answer, a CTA lede, a line
 * in llms.txt that an AI assistant will quote verbatim to a buyer. So this
 * scans every file that becomes visible copy or machine-readable output.
 * Code comments are stripped first, because several of them record the old
 * figures deliberately as history.
 */
describe('no published pricing', () => {
  const MONEY = /[$£€]\s?\d|\bR\s?\d{1,3}(,\d{3})+\b|\bR\d{3,}\b|\b(USD|ZAR|GBP)\s?\d/;
  const DISCOUNT = /\d+\s?%\s*(off|discount)/i;

  const stripComments = (src: string) =>
    src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');

  const copyFiles = globSync('{src/content,app}/**/*.{ts,tsx}').filter(
    (f) => !f.endsWith('.test.ts'),
  );

  it('scans a meaningful number of copy files', () => {
    expect(copyFiles.length).toBeGreaterThan(20);
  });

  it('carries no currency figure in any site copy', () => {
    for (const f of copyFiles) {
      const text = stripComments(readFileSync(f, 'utf-8'));
      const hit = text.match(MONEY);
      expect(hit?.[0], `${f} contains a price`).toBeUndefined();
    }
  });

  it('carries no currency figure or discount in the files AI assistants read', () => {
    for (const f of ['public/llms.txt', 'public/.well-known/ai-plugin.json']) {
      const text = readFileSync(f, 'utf-8');
      expect(text.match(MONEY)?.[0], `${f} contains a price`).toBeUndefined();
      expect(text.match(DISCOUNT)?.[0], `${f} states a discount`).toBeUndefined();
    }
  });

  it('tells assistants that prices are not published', () => {
    const llms = readFileSync('public/llms.txt', 'utf-8');
    expect(llms).toMatch(/does not publish prices/i);
  });

  /**
   * Renamed from /pricing on 2026-09-23 because the page has no prices on it.
   * The old URL must stay redirected rather than 404, and must not come back
   * into the sitemap — a redirecting URL listed as canonical is a crawl error.
   */
  it('lists /retainers in the sitemap and not the old /pricing', () => {
    const paths = staticRoutes.map((r) => r.path);
    expect(paths).toContain('/retainers');
    expect(paths).not.toContain('/pricing');
  });
});
