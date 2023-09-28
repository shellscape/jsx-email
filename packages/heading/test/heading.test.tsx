import { render } from '@jsx-email/render';

import { Heading } from '../src';

describe('render', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', () => {
    const testMessage = 'Test message';
    const html = render(<Heading>{testMessage}</Heading>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', () => {
    const style = { backgroundColor: 'red' };
    const html = render(
      <Heading style={style} data-testid="heading-test">
        Test
      </Heading>
    );
    expect(html).toContain('background-color:red');
    expect(html).toContain('data-testid="heading-test"');
  });

  it('renders the <Heading> component', () => {
    const actualOutput = render(
      <Heading mx={4} as="h2">
        Lorem ipsum
      </Heading>
    );
    expect(actualOutput).toMatchSnapshot();
  });
});
