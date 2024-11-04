import React from 'react';

import { loadConfig } from '../../../src/config.js';
import { render } from '../../../src/renderer/render.js';
import { Template } from '../../render/fixtures/components.js';

// process.chdir(__dirname);

describe('config → render', async () => {
  test('render disableDefaultStyle from config', async () => {
    // Note: load the config from the target directory first, so it'll be picked up on cache
    // vitest makes it hard to change the workding directory due to workers use
    await loadConfig(__dirname);
    const result = await render(<Template />);
    expect(result).toMatchSnapshot();
  });
});
