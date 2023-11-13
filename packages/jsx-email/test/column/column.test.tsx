import { render } from '../../src/render';

import { Column } from '../../src';

describe('<Column> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await render(<Column>{testMessage}</Column>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' };
    const html = await render(
      <Column style={style} data-testid="column-test">
        Test
      </Column>
    );
    expect(html).toContain('style="background-color:red"');
    expect(html).toContain('data-testid="column-test"');
  });

  it('renders correctly', async () => {
    const actualOutput = await render(<Column>Lorem ipsum</Column>);
    expect(actualOutput).toMatchSnapshot();
  });
});
