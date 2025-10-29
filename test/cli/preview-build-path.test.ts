import { access, rm, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { execa } from 'execa';

describe('cli: preview --build-path', async () => {
  const outRelational = './.test/build-path';
  const outAbsolute = resolve(__dirname, outRelational);
  const templatePath = './.test/.deploy/emails';

  beforeAll(async () => {
    await rm(outAbsolute, { force: true, recursive: true });
  });

  afterAll(async () => {
    await rm(outAbsolute, { force: true, recursive: true });
  });

  test('relative build path writes to an absolute path derived from the original cwd', async () => {
    await execa({
      cwd: __dirname,
      shell: true
    })`email create BatmanEmail --out ${templatePath} `;

    await execa({
      cwd: __dirname,
      shell: true
    })`email preview ${templatePath} --build-path ${outRelational}`;

    await access(join(outAbsolute, 'index.html'));

    const html = await readFile(join(outAbsolute, 'index.html'), 'utf8');
    expect(html).toContain('<div id="root"></div>');
  }, 60e3);
});
