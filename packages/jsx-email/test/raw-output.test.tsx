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
    const actual = await render(
      <>
        <RawOutput content={`<#if firstname & lastname>`} />
        Ola!
        <RawOutput content={`</#if>`} />
      </>
    );
    expect(actual).toMatchSnapshot();
  });

  it('Should preserve content on plainText render', async () => {
    const actual = await render(
      <>
        <RawOutput content={`<#if firstname & lastname>`} />
        Ola!
        <RawOutput content={`</#if>`} />
      </>,
      {
        plainText: true
      }
    );
    expect(actual).toMatchSnapshot();
  });
});
