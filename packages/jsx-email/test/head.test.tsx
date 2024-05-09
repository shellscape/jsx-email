// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/renderer/jsx-to-string.js';
import { Head } from '../src/index.js';

describe('<Head> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await jsxToString(<Head>{testMessage}</Head>);
    expect(html).toContain(testMessage);
  });

  it('renders meta tags correctly', async () => {
    const testMessage = 'Test message';
    const html = await jsxToString(<Head>{testMessage}</Head>);
    expect(html).toContain(testMessage);
  });

  it('renders correctly', async () => {
    const actualOutput = await jsxToString(<Head />);
    expect(actualOutput).toMatchSnapshot();
  });

  it('renders style tags', async () => {
    const actualOutput = await jsxToString(
      <Head>
        <style>
          {`body{
            color: red;
          }`}
        </style>
      </Head>
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it('renders meta format-detection conditionally', async () => {
    const testMessage = 'Test message';
    const html = await jsxToString(<Head enableFormatDetection>{testMessage}</Head>);
    expect(html).toContain(testMessage);
  });
});
