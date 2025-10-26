// @ts-ignore
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Conditional, Raw, render } from '../dist/esm/index.js';

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
  });
});
