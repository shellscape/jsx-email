// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/render';
import { Code } from '../src';

describe('<Code> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' };
    const html = await jsxToString(
      <Code style={style} data-testid="code-test" language="js">
        Test
      </Code>
    );
    expect(html).toContain('style="background-color:red"');
    expect(html).toContain('data-testid="code-test"');
  });

  it('renders correctly, with literal', async () => {
    const actualOutput = await jsxToString(
      <Code language="js">
        {`
        import { batman } from 'superheros';
        import { joker } from 'villains';

        const henchmen = joker.help();

        batman.fight(henchmen);
        batman.arrest(joker);
        `}
      </Code>
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it('renders correctly, plain text', async () => {
    const actualOutput = await jsxToString(
      <Code language="js">import batman from 'superheros';</Code>
    );
    expect(actualOutput).toMatchSnapshot();
  });
});
