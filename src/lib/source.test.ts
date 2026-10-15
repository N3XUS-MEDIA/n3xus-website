import { describe, expect, it } from 'vitest';
import { classifySource, describeSourceValue } from './source';

describe('classifySource', () => {
  it.each([
    ['https://chatgpt.com/', 'ai-assistant', 'chatgpt.com'],
    ['https://www.perplexity.ai/search?q=x', 'ai-assistant', 'perplexity.ai'],
    ['https://claude.ai/', 'ai-assistant', 'claude.ai'],
    ['https://gemini.google.com/app', 'ai-assistant', 'gemini.google.com'],
    ['https://www.google.com/', 'search', 'google.com'],
    ['https://www.google.co.za/', 'search', 'google.co.za'],
    ['https://www.bing.com/', 'search', 'bing.com'],
    ['https://www.linkedin.com/feed', 'social', 'linkedin.com'],
    ['https://example.org/post', 'referral', 'example.org'],
  ])('reads %s', (ref, kind, detail) => {
    expect(classifySource('', ref)).toEqual({ kind, detail });
  });

  it('treats no referrer, or our own site, as direct', () => {
    expect(classifySource('', '')).toEqual({ kind: 'direct' });
    expect(classifySource('', 'https://n3xus.media/services')).toEqual({ kind: 'direct' });
  });

  it('does not mistake a lookalike host for an AI assistant', () => {
    expect(classifySource('', 'https://notchatgpt.com/').kind).toBe('referral');
    expect(classifySource('', 'https://claude.ai.evil.example/').kind).toBe('referral');
  });

  it('counts the tagged links in llms.txt as AI-assistant visits', () => {
    expect(classifySource('?utm_source=llms.txt&utm_medium=ai', '')).toEqual({
      kind: 'ai-assistant',
      detail: 'link from llms.txt',
    });
  });

  it('treats other campaign tags as campaigns, ahead of the referrer', () => {
    expect(classifySource('?utm_source=newsletter&utm_medium=email', 'https://www.google.com/')).toEqual({
      kind: 'campaign',
      detail: 'newsletter / email',
    });
  });

  it('survives a malformed referrer', () => {
    expect(classifySource('', 'not a url').kind).toBe('direct');
  });
});

describe('describeSourceValue', () => {
  it('writes a line a person can read in an email', () => {
    expect(describeSourceValue({ kind: 'ai-assistant', detail: 'chatgpt.com', landing: '/services/ai' })).toBe(
      'AI assistant (chatgpt.com), landed on /services/ai',
    );
    expect(describeSourceValue({ kind: 'direct' })).toBe('Direct');
  });
});
