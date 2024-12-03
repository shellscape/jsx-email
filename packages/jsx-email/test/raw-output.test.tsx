// @ts-ignore
import React from 'react';

import { render } from '../src/renderer/render.js';
import { RawOutput } from '../src/components/raw-output.js';

describe('<RawOutput> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('Should render not escaped value', async () => {
    const html = await render(<RawOutput content={`<#if firstname & lastname>Ola!</#if>`} />);
    expect(html).toMatchSnapshot();
  });
});
