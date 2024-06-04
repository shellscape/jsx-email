// @ts-ignore
import React from 'react';

import { render } from '../../src/renderer/render.js';
import { jsxToString } from '../../src/renderer/jsx-to-string.js';

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
