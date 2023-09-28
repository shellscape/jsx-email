import { render } from '@jsx-email/render';

import { Html } from '../src';

describe('<Html> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', () => {
    const testMessage = 'Test message';
    const html = render(<Html>{testMessage}</Html>);
    expect(html).toContain(testMessage);
  });

  it('passes props correctly', () => {
    const html = render(<Html lang="fr" dir="rtl" data-testid="html-test" />);
    expect(html).toContain('lang="fr"');
    expect(html).toContain('dir="rtl"');
    expect(html).toContain('data-testid="html-test"');
  });

  it('renders correctly', () => {
    const actualOutput = render(<Html />);
    expect(actualOutput).toMatchSnapshot();
  });
});
