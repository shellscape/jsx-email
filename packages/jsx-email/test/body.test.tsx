// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/render';
import { Body } from '../src';

describe('render', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await jsxToString(<Body>{testMessage}</Body>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' };
    const html = await jsxToString(
      <Body style={style} data-testid="body-test">
        Test
      </Body>
    );
    expect(html).toContain('style="background-color:red"');
    expect(html).toContain('data-testid="body-test"');
  });

  it('renders the <Body> component', async () => {
    const actualOutput = await jsxToString(<Body>Lorem ipsum</Body>);
    expect(actualOutput).toMatchSnapshot();
  });
});
