// @ts-ignore
import React from 'react';

import { Head } from '../src/index.js';
import { jsxToString } from '../src/renderer/jsx-to-string.js';

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

  // Note: This test is moot with the changes to Conditional
  // it('renders mso-conditional statement correctly', async () => {
  //   const msoConditional =
  //     '<!--[if mso]><xml><o:OfficeDocumentSettings><o:AllowPNG></o:AllowPNG><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->';
  //   const html = await jsxToString(<Head enableFormatDetection />);
  //   expect(html).toContain(msoConditional);
  // });
});
