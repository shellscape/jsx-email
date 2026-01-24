import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { execa } from 'execa';
import { globby } from 'globby';
import strip from 'strip-ansi';

process.chdir(__dirname);

describe('create-mail', async () => {
  test('command', async () => {
    const { stdout } = await execa({
      cwd: __dirname,
      env: { NOIS_CLI_TEST_COLOR: 'true' },
      shell: true
      // Note: For some reason `pnpm exec` is fucking with our CWD, and resets it to
      // packages/jsx-email, which causes the config not to be found. so we use npx instead
    })`IS_CLI_TEST=true create-mail .test/new --yes`;
    const plain = strip(stdout)
      .replace(/^(.*)create-mail/, 'create-mail')
      .replace(/v(\d+\.\d+\.\d+)/, '');
    const normalized = plain
      .replace(/\\/g, '/')
      .replace(/^ {2}\$ (?:pnpm install|yarn)$/gm, '  $ <package-manager install>')
      .replace(/^ {2}\$ (?:pnpm run dev|yarn dev)$/gm, '  $ <package-manager run dev>');

    expect(normalized).toMatchSnapshot();

    const contents = await readFile(join(__dirname, '.test/new/templates/email.tsx'), 'utf8');
    expect(contents).toMatchSnapshot();

    const files = await globby('.test/new/**/*', { dot: true, gitignore: true });

    expect(files.sort()).toMatchSnapshot();
  });
});
