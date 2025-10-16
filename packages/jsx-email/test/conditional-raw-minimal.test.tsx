// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/renderer/jsx-to-string.js';
import { Conditional } from '../src/components/conditional.js';
import { Raw } from '../src/components/raw.js';

/**
 * Minimal snapshot fixture for `<Raw>` nested inside `<Conditional>`.
 *
 * This test intentionally asserts a snapshot of whatever the current
 * render pipeline produces for this structure so we can iterate on it
 * in follow‑ups. There are no behavioral assertions beyond the snapshot.
 */
describe('snapshot: minimal <Raw> inside <Conditional mso>', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders a minimal MSO block with inlined Raw content', async () => {
    const fragment = (
      <Conditional mso>
        <Raw content={'<b data-testid="raw">hello</b>'} />
      </Conditional>
    );

    const html = await jsxToString(fragment);
    expect(html).toMatchSnapshot();
  });
});
