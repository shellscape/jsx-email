import { describe, expect, it } from 'vitest';

import { codeToLineNumberedHtml, formatCode } from '../../../src/components/code/code-block';

describe('codeToLineNumberedHtml', () => {
  it('adds aligned line number markup to highlighted TSX code', () => {
    const html = codeToLineNumberedHtml(
      ['const subject = "Hi";', '<Text>{subject}</Text>'].join('\n'),
      'tsx',
      'github-light'
    );

    expect(html).toContain('class="line"');
    expect(html).toContain('class="code-line-number"');
    expect(html).toContain('data-line-number="1"');
    expect(html).toContain('data-line-number="2"');
    expect(html).toContain('class="code-line-content"');
  });
});

describe('formatCode', () => {
  it('formats HTML before it is highlighted', () => {
    expect(formatCode('<main><p>Hello</p></main>', 'html')).toBe(
      ['<main>', '  <p>Hello</p>', '</main>'].join('\n')
    );
  });
});
