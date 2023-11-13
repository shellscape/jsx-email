import { render } from '../../src/render';

import { Html } from '../../src';

describe('<Html> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await render(<Html>{testMessage}</Html>);
    expect(html).toContain(testMessage);
  });

  it('passes props correctly', async () => {
    const html = await render(<Html lang="fr" dir="rtl" data-testid="html-test" />);
    expect(html).toContain('lang="fr"');
    expect(html).toContain('dir="rtl"');
    expect(html).toContain('data-testid="html-test"');
  });

  it('renders correctly', async () => {
    const actualOutput = await render(<Html />);
    expect(actualOutput).toMatchSnapshot();
  });
});
