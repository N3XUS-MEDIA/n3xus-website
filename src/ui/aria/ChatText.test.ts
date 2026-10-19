import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { ChatText, plainText } from './ChatText';
import { KNOWLEDGE_BASE } from '@/server/aria/knowledgeBase';

const html = (text: string) => renderToStaticMarkup(createElement(ChatText, { text }));

describe('chat links', () => {
  it('turns [label](url) into a link showing the label', () => {
    const out = html('See [the full page](https://n3xus.media/services/ai) for more.');
    expect(out).toContain('href="/services/ai"');
    expect(out).toContain('>the full page</a>');
    expect(out).not.toContain('](');
  });

  it('keeps our own pages in-app and sends everything else to a new tab', () => {
    expect(html('[x](https://n3xus.media/retainers)')).not.toContain('target=');
    const ext = html('[x](https://example.com/page)');
    expect(ext).toContain('target="_blank"');
    expect(ext).toContain('rel="noopener noreferrer"');
  });

  it('recognises a bare URL and email address, without swallowing the full stop', () => {
    const out = html('Start at https://n3xus.media/contact#enquiry. Or write to info@n3xus.media.');
    expect(out).toContain('href="/contact#enquiry"');
    expect(out).toContain('>n3xus.media/contact#enquiry</a>.');
    expect(out).toContain('href="mailto:info@n3xus.media"');
    expect(out).toContain('>info@n3xus.media</a>.');
  });

  it('never injects HTML from the text', () => {
    const out = html('<img src=x onerror=alert(1)> [a](https://n3xus.media/)');
    expect(out).not.toContain('<img');
    expect(out).toContain('&lt;img');
  });

  it('plainText drops the URL and keeps the label', () => {
    expect(plainText('Read [this page](https://n3xus.media/x) now')).toBe('Read this page now');
  });
});

describe('every knowledge-base answer renders cleanly', () => {
  it('leaves no raw markdown behind and every link has a target', () => {
    for (const e of KNOWLEDGE_BASE) {
      const out = html(e.answer);
      expect(out, e.id).not.toMatch(/\]\(/);
      for (const m of out.matchAll(/<a [^>]*href="([^"]*)"/g)) expect(m[1], e.id).toMatch(/^(\/|mailto:|https?:)/);
    }
  });

  it('sounds like a person: no stiff openers or corporate filler', () => {
    const STIFF = /\b(please note|kindly|we are pleased|do not hesitate|as an ai|i am an ai|certainly!|great question)\b/i;
    for (const e of KNOWLEDGE_BASE) expect(e.answer, e.id).not.toMatch(STIFF);
  });
});
