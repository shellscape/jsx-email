// @ts-ignore
import React from 'react';

import { Raw } from '../src/components/raw.js';
import { render } from '../src/renderer/render.js';

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

  it('Should work correctly when it has linebreaks', async () => {
    const actual = await render(
      <>
        <Raw
          content={`
            Raw context
        `}
        />
      </>
    );
    expect(actual).toMatchSnapshot();
  });

  describe('disablePlainTextOutput', () => {
    it('Should not output to the plain text when enabled', async () => {
      const actual = await render(
        <>
          <Raw disablePlainTextOutput={true} content={`<!--[if !mso]><!-->`} />
          Ola!
          <Raw disablePlainTextOutput={true} content={`<!--<![endif]-->`} />
        </>,
        { plainText: true }
      );
      expect(actual).toMatchSnapshot();
    });

    it('Should output to html when enabled', async () => {
      const actual = await render(
        <>
          <Raw disablePlainTextOutput={true} content={`<!--[if !mso]><!-->`} />
          Ola!
          <Raw disablePlainTextOutput={true} content={`<!--<![endif]-->`} />
        </>
      );
      expect(actual).toMatchSnapshot();
    });
  });
});
