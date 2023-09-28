import { render } from '@jsx-email/render';

import { Text } from '../src';

describe('<Text> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', () => {
    const testMessage = 'Test message';
    const html = render(<Text>{testMessage}</Text>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', () => {
    const style = { fontSize: '16px' };
    const html = render(
      <Text style={style} data-testid="text-test">
        Test
      </Text>
    );
    expect(html).toContain('font-size:16px');
    expect(html).toContain('data-testid="text-test"');
  });

  it('renders correctly', () => {
    const actualOutput = render(<Text>Lorem ipsum</Text>);
    expect(actualOutput).toMatchSnapshot();
  });
});
