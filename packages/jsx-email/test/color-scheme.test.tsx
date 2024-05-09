// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/renderer/jsx-to-string.js';
import { ColorScheme, type ColorSchemeMode } from '../src/index.js';

describe('<ColorScheme> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders correctly', async () => {
    const html = await jsxToString(<ColorScheme />);
    expect(html).toMatchSnapshot();

    const modes: ColorSchemeMode[] = [
      'dark',
      'dark only',
      'light',
      'light dark',
      'light dark only',
      'light only'
    ];

    for (const mode of modes) {
      // eslint-disable-next-line no-await-in-loop
      const html = await jsxToString(<ColorScheme mode={mode} />);
      expect(html).toMatchSnapshot();
    }
  });
});
