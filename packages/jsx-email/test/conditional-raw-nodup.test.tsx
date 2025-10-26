import { describe, expect, it } from 'vitest';

// Import from source to keep tests hermetic and avoid prebuild coupling
import { Conditional, Raw, render } from '../src/index.ts';

function count(haystack: string, needle: string) {
  // Avoid regex escaping pitfalls by scanning linearly
  let i = 0;
  let c = 0;
  while (true) {
    const at = haystack.indexOf(needle, i);
    if (at === -1) break;
    c += 1;
    i = at + needle.length;
  }
  return c;
}

describe('Conditional + Raw – no duplication', () => {
  it('renders the inner Raw block exactly once inside a single MSO conditional', async () => {
    const table = [
      '<table role="presentation" id="msoTableTest" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0">',
      '<tbody><tr><td><b data-testid="unique">hello</b></td></tr></tbody>',
      '</table>'
    ].join('');

    const html = await render(
      <Conditional mso>
        <Raw content={table} />
      </Conditional>
    );

    // Exactly one conditional block, one closer, and one copy of the inner table
    const opener = '<!--[if mso]>';
    const closer = '<![endif]/-->';
    expect(count(html, opener)).toBe(1);
    expect(count(html, closer)).toBe(1);
    expect(count(html, 'id="msoTableTest"')).toBe(1);
    expect(count(html, 'data-testid="unique"')).toBe(1);

    // Sanity: should not contain an unguarded duplicate of the table before/after the block
    const firstIdx = html.indexOf(opener);
    const lastIdx = html.lastIndexOf(closer);
    expect(firstIdx).toBeGreaterThanOrEqual(0);
    expect(lastIdx).toBeGreaterThan(firstIdx);

    const before = html.slice(0, firstIdx);
    const after = html.slice(lastIdx + closer.length);
    expect(before).not.toContain('id="msoTableTest"');
    expect(after).not.toContain('id="msoTableTest"');
  });
});
