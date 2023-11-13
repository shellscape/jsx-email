import { render } from '@jsx-email/render';

import { Container } from '../src';

describe('<Container> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await render(<Container>{testMessage}</Container>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red', maxWidth: 300 };
    const html = await render(
      <Container style={style} data-testid="container-test">
        Test
      </Container>
    );
    expect(html).toContain('style="max-width:300px;background-color:red"');
    expect(html).toContain('data-testid="container-test"');
  });

  it('renders correctly', async () => {
    const container = await render(
      <Container style={{ maxWidth: '300px' }}>
        <button>Hi</button>
      </Container>
    );

    expect(container).toMatchSnapshot();
  });
});
