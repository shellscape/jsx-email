// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/renderer/jsx-to-string.js';
import { Background } from '../src/index.js';

describe('<Hr> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('passes styles and other props correctly', async () => {
    const html = await jsxToString(
      <Background src="url-to-image" width={600} height={400} bgColor="#FFFFFF" bgRepeat="repeat">
        Hello World
      </Background>
    );
    expect(html).toContain('width="600"');
    expect(html).toContain('height="400"');
    expect(html).toContain('height="400"');
  });

  it('renders VML elements conditionally', async () => {
    const html = await jsxToString(
      <Background src="url-to-image" width={600} height={400} bgColor="#FFFFFF" bgRepeat="repeat">
        Hello World
      </Background>
    );
    expect(html).toContain('<!--[if gte mso 9]>');
    expect(html).toContain('v:rect');
    expect(html).toContain('v:fill');
    expect(html).toContain('v:textbox');
    expect(html).toContain('type="tile"');
  });

  it('renders correctly', async () => {
    const actualOutput = await jsxToString(<Background src="url-to-image">Hello World</Background>);
    expect(actualOutput).toMatchSnapshot();
  });
});
