import { describe, expect, it } from 'vitest';

// Import from source to keep tests hermetic and avoid prebuild coupling
import { Conditional, Raw, render } from '../src/index.ts';

describe('<Conditional mso> closer', () => {
  it('emits a self-closing MSO closer `<![endif]/-->`', async () => {
    const html = await render(
      <Conditional mso>
        <Raw content={'<b data-testid="closer">hi</b>'} />
      </Conditional>
    );

    expect(html).toContain('<![endif]/-->' /* Outlook-friendly closer */);
    expect(html).not.toContain('<![endif]-->' /* slashless closer */);
    expect(html).not.toContain('<!--[endif]---->' /* previously corrupted closer */);
    // Robustness: ensure the closer appears exactly once
    expect((html.match(/<!\[endif\]\/-->/g) || []).length).toBe(1);
  });

  it('emits the standard MSO closer `<![endif]-->` within <head>', async () => {
    const html = await render(
      <Conditional head mso>
        <Raw content={'<b data-testid="closer-head">hi</b>'} />
      </Conditional>
    );

    expect(html).toContain('<![endif]-->' /* standard closer */);
    expect(html).not.toContain('<![endif]/-->' /* slashed closer */);
    // Robustness: ensure the closer appears exactly once
    expect((html.match(/<!\[endif\]-->/g) || []).length).toBe(1);
  });
});
