import { render } from '@jsx-email/render';

import { Link } from '../src';

describe('<Link> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await render(<Link href="https://example.com">{testMessage}</Link>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', async () => {
    const style = { color: 'red' };
    const html = await render(
      <Link href="https://example.com" style={style} data-testid="link-test">
        Test
      </Link>
    );
    expect(html).toContain('color:red');
    expect(html).toContain('data-testid="link-test"');
  });

  it('opens in a new tab', async () => {
    const html = await render(<Link href="https://example.com">Test</Link>);
    expect(html).toContain(`target="_blank"`);
  });

  it('renders correctly', async () => {
    const actualOutput = await render(<Link href="https://example.com">Example</Link>);
    expect(actualOutput).toMatchSnapshot();
  });
});
