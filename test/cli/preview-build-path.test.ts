import { access, rm, readFile } from 'node:fs/promises';
import os from 'node:os';
import { join, resolve } from 'node:path';

import { execa } from 'execa';

describe('cli: preview --build-path', async () => {
  const outRelational = './.test/build-path';
  const outAbsolute = resolve(__dirname, outRelational);
  const templatePath = './.test/.deploy/emails';
  const isWindows = os.platform() === 'win32';

  beforeAll(async () => {
    await rm(outAbsolute, { force: true, recursive: true });
  });

  afterAll(async () => {
    await rm(outAbsolute, { force: true, recursive: true });
  });

  if (!isWindows) {
    test('relative build path writes to an absolute path derived from the original cwd', async () => {
      await execa({ cwd: __dirname, shell: true })`email create BatmanEmail --out ${templatePath} `;
      const { stdout } = await execa({
        cwd: __dirname,
        shell: true
      })`email preview ${templatePath} --build-path ${outRelational}`;

      console.log(stdout);

      await access(join(outAbsolute, 'index.html'));

      const html = await readFile(join(outAbsolute, 'index.html'), 'utf8');
      expect(html).toContain('<div id="root"></div>');
    }, 60e3);
  }

  if (isWindows) {
    test('errors when Vite root and temp build path are on different drives (Windows)', async () => {
      await execa({ cwd: __dirname, shell: true })`email create BatmanEmail --out ${templatePath} `;
      await expect(
        execa({
          cwd: __dirname,
          shell: true
        })`email preview ${templatePath} --build-path ${outRelational}`
      ).rejects.toThrow(
        /Temporary directory drive letter different than root directory drive letter/
      );
    }, 60e3);
  }
});
