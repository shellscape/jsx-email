import { render } from '@jsx-email/render';

import { Body } from '../src';

describe('render', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', () => {
    const testMessage = 'Test message';
    const html = render(<Body>{testMessage}</Body>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', () => {
    const style = { backgroundColor: 'red' };
    const html = render(
      <Body style={style} data-testid="body-test">
        Test
      </Body>
    );
    expect(html).toContain('style="background-color:red"');
    expect(html).toContain('data-testid="body-test"');
  });

  it('renders the <Body> component', () => {
    const actualOutput = render(<Body>Lorem ipsum</Body>);
    expect(actualOutput).toMatchSnapshot();
  });
});
