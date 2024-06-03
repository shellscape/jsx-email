// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/render';
import { Html } from '../src';

describe('<Html> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await jsxToString(<Html>{testMessage}</Html>);
    expect(html).toContain(testMessage);
  });

  it('passes props correctly', async () => {
    const html = await jsxToString(<Html lang="fr" dir="rtl" data-testid="html-test" />);
    expect(html).toContain('lang="fr"');
    expect(html).toContain('dir="rtl"');
    expect(html).toContain('data-testid="html-test"');
  });

  it('renders with VML attributes', async () => {
    const html = await jsxToString(<Html />);
    expect(html).toContain('xmlns:v="urn:schemas-microsoft-com:vml"');
    expect(html).toContain('xmlns:o="urn:schemas-microsoft-com:office:office"');
  });

  it('disables VML attributes', async () => {
    const html = await jsxToString(<Html enableVML={false} />);
    expect(html).not.toContain('xmlns:v="urn:schemas-microsoft-com:vml"');
    expect(html).not.toContain('xmlns:o="urn:schemas-microsoft-com:office:office"');
  });

  it('renders correctly', async () => {
    const actualOutput = await jsxToString(<Html />);
    expect(actualOutput).toMatchSnapshot();
  });
});
