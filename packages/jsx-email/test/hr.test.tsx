// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/renderer/jsx-to-string.js';
import { Hr } from '../src/index.js';

describe('<Hr> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('passes styles and other props correctly', async () => {
    const style = { borderColor: 'black', width: '50%' };
    const html = await jsxToString(<Hr style={style} data-testid="hr-test" />);
    expect(html).toContain('width:50%');
    expect(html).toContain('border-color:black');
    expect(html).toContain('data-testid="hr-test"');
  });

  it('renders correctly', async () => {
    const actualOutput = await jsxToString(<Hr />);
    expect(actualOutput).toMatchSnapshot();
  });

  it('disables the default styles', async () => {
    const actualOutput = await jsxToString(<Hr disableDefaultStyle={true} />);
    expect(actualOutput).toMatchSnapshot();
  });
});
