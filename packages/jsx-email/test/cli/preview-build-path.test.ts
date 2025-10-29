import { access, rm, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { execFile } from 'node:child_process';

describe('cli: preview --build-path', async () => {
  const outRel = '.test/preview-build-out';
  const outAbs = resolve(__dirname, outRel);
  const templates = resolve(__dirname, '../../../..', 'test/smoke/fixtures/templates');

  beforeAll(async () => {
    await rm(outAbs, { force: true, recursive: true });
  });

  afterAll(async () => {
    await rm(outAbs, { force: true, recursive: true });
  });

  test('relative build path writes to an absolute path derived from the original cwd', async () => {
    const repoRoot = resolve(__dirname, '../../../..');
    const cli = join(repoRoot, 'packages/jsx-email/bin/email');

    await new Promise<void>((resolvePromise, reject) => {
      execFile(
        'node',
        [cli, 'preview', templates, '--build-path', outRel],
        { cwd: __dirname },
        (error) => {
          if (error) reject(error);
          else resolvePromise();
        }
      );
    });

    await access(join(outAbs, 'index.html'));

    const html = await readFile(join(outAbs, 'index.html'), 'utf8');
    expect(html).toContain('<div id="root"></div>');
  }, 60e3);
});
