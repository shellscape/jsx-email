// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/render';
import { QrCode } from '../src/components/qrcode';

describe('render', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders QR code with required props', async () => {
    const testValue = 'test';
    const html = await jsxToString(<QrCode src={testValue} size={300} correctionLevel="L" />);
    // expect(html).toContain(testValue);
    expect(html).toContain('width="300"');
    expect(html).toContain('height="300"');
  });

  it('passes style and other props correctly', async () => {
    const style = { border: '1px solid black' };
    const html = await jsxToString(
      <QrCode src="test" size={300} correctionLevel="L" style={style} data-testid="qr-test" />
    );
    expect(html).toContain('style="border:1px solid black"');
    expect(html).toContain('data-testid="qr-test"');
  });

  it('renders the <QrCode> component', async () => {
    const actualOutput = await jsxToString(
      <QrCode src="Lorem ipsum" size={300} correctionLevel="L" />
    );
    expect(actualOutput).toMatchSnapshot();
  });
});
