import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { execa } from 'execa';
import { globby } from 'globby';
import strip from 'strip-ansi';

process.chdir(__dirname);

const normalizePathSeparators = (value: string) => value.replaceAll('\\', '/');

describe('create-mail', async () => {
  test('command', async () => {
    const { stdout } = await execa({
      cwd: __dirname,
      env: {
        IS_CLI_TEST: 'true'
      },
      shell: true
      // Note: For some reason `pnpm exec` is fucking with our CWD, and resets it to
      // packages/jsx-email, which causes the config not to be found. so we use npx instead
    })`create-mail .test/new --yes`;
    const plain = normalizePathSeparators(
      strip(stdout)
        .replace(/^(.*)create-mail/, 'create-mail')
        .replace(/v(\d+\.\d+\.\d+)/, '')
        .split('\n')
        .map((line) => line.trimEnd())
        .join('\n')
    );

    expect(plain).toMatchSnapshot();

    const contents = await readFile(join(__dirname, '.test/new/templates/email.tsx'), 'utf8');
    expect(contents).toMatchSnapshot();

    const packageJson = JSON.parse(
      await readFile(join(__dirname, '.test/new/package.json'), 'utf8')
    );
    expect(packageJson.engines).toMatchInlineSnapshot(`
      {
        "node": ">=22.0.0",
      }
    `);
    expect(packageJson.dependencies).toMatchInlineSnapshot(`
      {
        "@jsx-email/plugin-inline": "^2.0.0",
        "@jsx-email/plugin-minify": "^2.0.0",
        "@jsx-email/plugin-pretty": "^2.0.0",
        "jsx-email": "^3.0.0",
      }
    `);

    const files = (await globby('.test/new/**/*', { dot: true }))
      .map(normalizePathSeparators)
      .sort((left, right) => {
        const depthDifference = left.split('/').length - right.split('/').length;

        if (depthDifference !== 0) {
          return depthDifference;
        }

        if (left < right) {
          return -1;
        }

        if (left > right) {
          return 1;
        }

        return 0;
      });

    expect(files).toMatchSnapshot();
  });
});
