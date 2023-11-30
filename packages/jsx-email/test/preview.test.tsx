// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/render';
import { Preview, renderWhiteSpace } from '../src';

describe('<Preview> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders correctly', async () => {
    const actualOutput = await jsxToString(<Preview>Email preview text</Preview>);
    expect(actualOutput).toMatchSnapshot();
  });

  it('renders correctly with array text', async () => {
    const actualOutputArray = await jsxToString(<Preview>Email {'preview'} text</Preview>);
    expect(actualOutputArray).toMatchSnapshot();
  });

  it('renders correctly with really long text', async () => {
    const longText = 'really long'.repeat(100);
    const actualOutputLong = await jsxToString(<Preview>{longText}</Preview>);
    expect(actualOutputLong).toMatchSnapshot();
  });
});

describe('renderWhiteSpace', async () => {
  it('renders null when text length is greater than or equal to PREVIEW_MAX_LENGTH (150)', async () => {
    const text =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur dolore mollitia dignissimos itaque. At excepturi reiciendis iure molestias incidunt. Ab saepe, nostrum dicta dolor maiores tenetur eveniet odio amet ipsum?';
    const html = await renderWhiteSpace(text);
    expect(html).toBeNull();
  });

  it('renders white space characters when text length is less than PREVIEW_MAX_LENGTH', async () => {
    const text = 'Short text';
    const whiteSpaceCharacters = '\xa0\u200C\u200B\u200D\u200E\u200F\uFEFF';

    const html = await renderWhiteSpace(text);
    expect(html).not.toBeNull();

    const actualTextContent = html?.props.children;
    const expectedTextContent = whiteSpaceCharacters.repeat(150 - text.length);
    expect(actualTextContent).toBe(expectedTextContent);
  });
});
