/**
 * Guards the 2026 repositioning: N3XUS Media (marketing agency) → N3XUS
 * (business consultancy across strategy, technology and growth).
 *
 * A rename is easy to do and easy to half-undo. These tests exist because the
 * old naming and the old framing are still sitting in git history, in the
 * founders' muscle memory, and in every draft anyone writes from an old
 * document.
 */
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
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

  it('describes the firm as a consultancy', () => {
    expect(prompt).toMatch(/business consultancy/i);
  });

  it('is told not to call it a marketing agency', () => {
    expect(prompt).toMatch(/do not describe N3XUS as a marketing agency/i);
  });

  it('can still answer to the former name', () => {
    expect(prompt).toMatch(/previously called N3XUS Media/i);
  });
});

describe('public files carry the repositioning', () => {
  const llms = readFileSync('public/llms.txt', 'utf-8');
  const plugin = readFileSync('public/.well-known/ai-plugin.json', 'utf-8');

  it('llms.txt leads with the consultancy positioning', () => {
    expect(llms).toMatch(/N3XUS is a business consultancy/);
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
    expect(parsed.description_for_model).toMatch(/business consultancy/i);
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
