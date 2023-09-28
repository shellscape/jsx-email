import { render } from '@jsx-email/render';

import { Button } from '../src';

describe('<Button> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', () => {
    const testMessage = 'Test message';
    const html = render(<Button>{testMessage}</Button>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', () => {
    const style = { backgroundColor: 'red' };
    const html = render(
      <Button style={style} data-testid="button-test">
        Test
      </Button>
    );
    expect(html).toContain('background-color:red');
    expect(html).toContain('data-testid="button-test"');
  });

  it('renders correctly  with padding values from style prop', () => {
    const actualOutput = render(
      <Button style={{ padding: '12px 20px' }} href="https://example.com" />
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it('renders with no padding value', () => {
    const actualOutput = render(<Button href="https://example.com" />);
    expect(actualOutput).toMatchSnapshot();
  });
});
