import { render } from '@jsx-email/render';

import { Row } from '../src';

describe('<Row> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', () => {
    const testMessage = 'Test message';
    const html = render(<Row>{testMessage}</Row>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', () => {
    const style = { backgroundColor: 'red' };
    const html = render(
      <Row style={style} data-testid="row-test">
        Test
      </Row>
    );
    expect(html).toContain('style="background-color:red"');
    expect(html).toContain('data-testid="row-test"');
  });

  it('renders correctly', () => {
    const actualOutput = render(<Row children={undefined} />);
    expect(actualOutput).toMatchSnapshot();
  });
});
