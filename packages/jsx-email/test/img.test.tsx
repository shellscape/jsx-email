// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/render';
import { Img } from '../src';

describe('<Img> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red', border: 'solid 1px black' };
    const html = await jsxToString(
      <Img src="cat.jpg" alt="Cat" width="300" height="300" style={style} data-testid="img-test" />
    );
    expect(html).toContain('background-color:red');
    expect(html).toContain('border:solid 1px black');
    expect(html).toContain('data-testid="img-test"');
  });

  it('renders correctly', async () => {
    const actualOutput = await jsxToString(
      <Img src="cat.jpg" alt="Cat" width="300" height="300" />
    );
    expect(actualOutput).toMatchSnapshot();
  });
});
