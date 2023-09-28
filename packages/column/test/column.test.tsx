import { render } from '@jsx-email/render';

import { Column } from '../src';

describe('<Column> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', () => {
    const testMessage = 'Test message';
    const html = render(<Column>{testMessage}</Column>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', () => {
    const style = { backgroundColor: 'red' };
    const html = render(
      <Column style={style} data-testid="column-test">
        Test
      </Column>
    );
    expect(html).toContain('style="background-color:red"');
    expect(html).toContain('data-testid="column-test"');
  });

  it('renders correctly', () => {
    const actualOutput = render(<Column>Lorem ipsum</Column>);
    expect(actualOutput).toMatchSnapshot();
  });
});
