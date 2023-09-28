import { render } from '@jsx-email/render';

import { Link } from '../src';

describe('<Link> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', () => {
    const testMessage = 'Test message';
    const html = render(<Link href="https://example.com">{testMessage}</Link>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', () => {
    const style = { color: 'red' };
    const html = render(
      <Link href="https://example.com" style={style} data-testid="link-test">
        Test
      </Link>
    );
    expect(html).toContain('color:red');
    expect(html).toContain('data-testid="link-test"');
  });

  it('opens in a new tab', () => {
    const html = render(<Link href="https://example.com">Test</Link>);
    expect(html).toContain(`target="_blank"`);
  });

  it('renders correctly', () => {
    const actualOutput = render(<Link href="https://example.com">Example</Link>);
    expect(actualOutput).toMatchSnapshot();
  });
});
