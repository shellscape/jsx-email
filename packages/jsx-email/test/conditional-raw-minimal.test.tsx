import { jsxToString } from '../src/renderer/jsx-to-string.js';
import { render } from '../src/renderer/render.js';
import { Conditional } from '../src/components/conditional.js';
import { Raw } from '../src/components/raw.js';

const minimalFragment = (
  <Conditional mso>
    <Raw content={'<b data-testid="raw">hello</b>'} />
  </Conditional>
);

/**
 * Minimal snapshot fixture for `<Raw>` nested inside `<Conditional>`.
 *
 * This test intentionally asserts a snapshot of whatever the current
 * render pipeline produces for this structure so we can iterate on it
 * in follow‑ups. There are no behavioral assertions beyond the snapshot.
 */
describe('snapshot: minimal <Raw> inside <Conditional mso>', () => {
  it('renders a minimal MSO block with inlined Raw content (jsxToString)', async () => {
    const html = await jsxToString(minimalFragment);
    expect(html).toMatchSnapshot();
  });

  it('renders final HTML via the render pipeline', async () => {
    const html = await render(minimalFragment);
    expect(html).toMatchSnapshot();
  });
});
