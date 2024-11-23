import { join, resolve } from 'node:path';

// @ts-ignore
import React from 'react';

import { compile } from '../../src/renderer/compile.js';
import { render } from '../../src/renderer/render.js';

describe('import css', () => {
  it('simple', async () => {
    const filePath = resolve(__dirname, './fixtures/import-css.js');
    const outDir = resolve(__dirname, '.compiled');

    await compile({ files: [filePath], hashFiles: false, outDir });

    const { Template } = await import(join(outDir, 'import-css.js'));

    expect(await render(<Template />, { minify: false, pretty: true })).toMatchSnapshot();
  });
});
