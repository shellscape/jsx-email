import { render } from '../../src/render';

import { Text } from '../../src';

describe('<Text> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await render(<Text>{testMessage}</Text>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', async () => {
    const style = { fontSize: '16px' };
    const html = await render(
      <Text style={style} data-testid="text-test">
        Test
      </Text>
    );
    expect(html).toContain('font-size:16px');
    expect(html).toContain('data-testid="text-test"');
  });

  it('renders correctly', async () => {
    const actualOutput = await render(<Text>Lorem ipsum</Text>);
    expect(actualOutput).toMatchSnapshot();
  });
});
