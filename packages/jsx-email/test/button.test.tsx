// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/render';
import { Button } from '../src';

describe('<Button> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await jsxToString(<Button>{testMessage}</Button>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' };
    const html = await jsxToString(
      <Button style={style} data-testid="button-test">
        Test
      </Button>
    );
    expect(html).toContain('background-color:red');
    expect(html).toContain('data-testid="button-test"');
  });

  it('renders correctly  with padding values from style prop', async () => {
    const actualOutput = await jsxToString(
      <Button style={{ padding: '12px 20px' }} href="https://example.com" />
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it('renders with no padding value', async () => {
    const actualOutput = await jsxToString(<Button href="https://example.com" />);
    expect(actualOutput).toMatchSnapshot();
  });
});
