// @ts-ignore
import React from 'react';

import { render } from '../../src/render';
import { jsxToString } from '../../src/render/jsx-to-string';

import { Template } from './fixtures/async-template';

describe('render', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('processes an async component', async () => {
    const result = await jsxToString(<Template firstName="Jim" />);
    expect(result).toMatchSnapshot();
  });

  it('renders an async component', async () => {
    const result = await render(<Template firstName="Jim" />);
    expect(result).toMatchSnapshot();
  });
});
