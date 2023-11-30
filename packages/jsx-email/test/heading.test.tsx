// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/render';
import { Heading } from '../src';

describe('render', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await jsxToString(<Heading>{testMessage}</Heading>);
    expect(html).toContain(testMessage);
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' };
    const html = await jsxToString(
      <Heading style={style} data-testid="heading-test">
        Test
      </Heading>
    );
    expect(html).toContain('background-color:red');
    expect(html).toContain('data-testid="heading-test"');
  });

  it('renders the <Heading> component', async () => {
    const actualOutput = await jsxToString(
      <Heading mx={4} as="h2">
        Lorem ipsum
      </Heading>
    );
    expect(actualOutput).toMatchSnapshot();
  });
});
