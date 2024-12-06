// @ts-ignore
import React from 'react';

import { render } from '../src/renderer/render.js';
import { Raw } from '../src/components/raw.js';

describe('<Raw> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('Should render without escaping', async () => {
    const actual = await render(
      <>
        <Raw content={`<#if firstname & lastname>`} />
        Ola!
        <Raw content={`</#if>`} />
      </>
    );
    expect(actual).toMatchSnapshot();
  });

  it('Should preserve content on plainText render', async () => {
    const actual = await render(
      <>
        <Raw content={`<#if firstname & lastname>`} />
        Ola!
        <Raw content={`</#if>`} />
      </>,
      {
        plainText: true
      }
    );
    expect(actual).toMatchSnapshot();
  });

  it('Should work correctly with a comment as a content', async () => {
    const actual = await render(
      <>
        <Raw content={`<!--[if !mso]><!-->`} />
        Ola!
        <Raw content={`<!--<![endif]-->`} />
      </>
    );
    expect(actual).toMatchSnapshot();
  });

  describe('disableOutputToPlainText', () => {
    it('Should not output to the plain text when enabled', async () => {
      const actual = await render(
        <>
          <Raw disableOutputToPlainText={true} content={`<!--[if !mso]><!-->`} />
          Ola!
          <Raw disableOutputToPlainText={true} content={`<!--<![endif]-->`} />
        </>,
        { plainText: true }
      );
      expect(actual).toMatchSnapshot();
    });

    it('Should output to html when enabled', async () => {
      const actual = await render(
        <>
          <Raw disableOutputToPlainText={true} content={`<!--[if !mso]><!-->`} />
          Ola!
          <Raw disableOutputToPlainText={true} content={`<!--<![endif]-->`} />
        </>
      );
      expect(actual).toMatchSnapshot();
    });
  });
});
