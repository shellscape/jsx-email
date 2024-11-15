import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { execa } from 'execa';
import { globby } from 'globby';
import strip from 'strip-ansi';

process.chdir(__dirname);

describe('create-jsx-email', async () => {
  test('command', async () => {
    const { stdout } = await execa({
      cwd: __dirname,
      shell: true
      // Note: For some reason `pnpm exec` is fucking with our CWD, and resets it to
      // packages/jsx-email, which causes the config not to be found. so we use npx instead
    })`IS_CLI_TEST=true create-jsx-email .test/new --yes`;
    const plain = strip(stdout)
      .replace(/^(.*)create-jsx-email/, 'create-jsx-email')
      .replace(/v(\d+\.\d+\.\d+)/, '');

    expect(plain).toMatchSnapshot();

    const contents = await readFile(join(__dirname, '.test/new/templates/email.tsx'), 'utf8');
    expect(contents).toMatchSnapshot();

    const files = await globby('.test/new/**/*', { dot: true });

    expect(files).toMatchSnapshot();
  });
});
