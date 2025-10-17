import { jsxToString } from '../src/renderer/jsx-to-string.js';
import { render } from '../src/renderer/render.js';
import { Conditional } from '../src/components/conditional.js';
import { Raw } from '../src/components/raw.js';

// We stub core plugins to keep the bundler from trying to resolve unpublished build outputs
// during test collection. These stubs are no-ops; we're not testing plugin behavior here.
vi.mock('@jsx-email/plugin-inline', () => {
  return {
    plugin: { name: '@jsx-email/plugin-inline', symbol: Symbol.for('jsx-email/plugin') }
  };
});
vi.mock('@jsx-email/plugin-minify', () => {
  return {
    plugin: { name: '@jsx-email/plugin-minify', symbol: Symbol.for('jsx-email/plugin') }
  };
});
vi.mock('@jsx-email/plugin-pretty', () => {
  return {
    plugin: { name: '@jsx-email/plugin-pretty', symbol: Symbol.for('jsx-email/plugin') }
  };
});

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

  it('renders final HTML via the render pipeline (with plugin stubs)', async () => {
    const html = await render(minimalFragment);
    expect(html).toMatchSnapshot();
  });
});
