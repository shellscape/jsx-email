// @ts-ignore
import React from 'react';

import { render } from '../../src/renderer/render.js';
import { Button } from '../../src/index.js';

describe('<Button> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('minifies outlook xml properly', async () => {
    const html = await render(
      <Button width={200} height={40}>
        {'Test message'}
      </Button>,
      { minify: true }
    );
    expect(html).toMatchSnapshot();
  });
});
