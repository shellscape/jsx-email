import { render } from '@jsx-email/render';

import { Button } from '../src';

describe('<Button> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await render(<Button>{testMessage}</Button>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' };
    const html = await render(
      <Button style={style} data-testid="button-test">
        Test
      </Button>
    );
    expect(html).toContain('background-color:red');
    expect(html).toContain('data-testid="button-test"');
  });

  it('renders correctly  with padding values from style prop', async () => {
    const actualOutput = await render(
      <Button style={{ padding: '12px 20px' }} href="https://example.com" />
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it('renders with no padding value', async () => {
    const actualOutput = await render(<Button href="https://example.com" />);
    expect(actualOutput).toMatchSnapshot();
  });
});
