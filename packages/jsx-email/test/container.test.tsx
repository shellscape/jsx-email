// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/renderer/jsx-to-string.js';
import { Container } from '../src/index.js';

describe('<Container> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await jsxToString(<Container>{testMessage}</Container>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' };
    const html = await jsxToString(
      <Container containerWidth={300} style={style} data-testid="container-test">
        Test
      </Container>
    );
    expect(html).toContain('style="max-width:300px;background-color:red"');
    expect(html).toContain('data-testid="container-test"');
  });

  it('renders correctly', async () => {
    const container = await jsxToString(
      <Container containerWidth={300}>
        <button>Hi</button>
      </Container>
    );

    expect(container).toMatchSnapshot();
  });

  it('renders alternate alignment', async () => {
    const container = await jsxToString(
      <Container alignment="right">
        <button>Hi</button>
      </Container>
    );

    expect(container).toMatchSnapshot();
  });
});
