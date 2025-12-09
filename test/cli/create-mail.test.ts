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
      shell: true
      // Note: For some reason `pnpm exec` is fucking with our CWD, and resets it to
      // packages/jsx-email, which causes the config not to be found. so we use npx instead
    })`IS_CLI_TEST=true create-mail .test/new --yes`;
    const plain = strip(stdout)
      .replace(/^(.*)create-mail/, 'create-mail')
      .replace(/v(\d+\.\d+\.\d+)/, '');

    expect(plain).toMatchSnapshot();

    type PackageJson = {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };

    const packageJson = JSON.parse(
      await readFile(join(__dirname, '.test/new/package.json'), 'utf8')
    ) as PackageJson;

    expect(packageJson.devDependencies).toMatchObject({
      react: expect.any(String),
      'react-dom': expect.any(String)
    });

    expect(packageJson.dependencies ?? {}).not.toHaveProperty('react');
    expect(packageJson.dependencies ?? {}).not.toHaveProperty('react-dom');

    const contents = await readFile(join(__dirname, '.test/new/templates/email.tsx'), 'utf8');
    expect(contents).toMatchSnapshot();

    const files = await globby('.test/new/**/*', { dot: true });

    expect(files).toMatchSnapshot();
  });
});
