import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { execa } from 'execa';
import strip from 'strip-ansi';

process.chdir(__dirname);

describe('cli', async () => {
  test('esbuild plugins', async () => {
    const { stdout } = await execa({
      cwd: __dirname,
      shell: true
      // Note: For some reason `pnpm exec` is fucking with our CWD, and resets it to
      // packages/jsx-email, which causes the config not to be found. so we use npx instead
    })`email create BatmanEmail --out ./.test/emails `;
    const plain = strip(stdout);

    console.log(plain);

    expect(plain).toContain('Creating a new template at ');
    expect(plain).toContain('Template BatmanEmail.tsx created');

    const contents = await readFile(join(__dirname, '.test/emails/BatmanEmail.tsx'), 'utf8');
    expect(contents).toMatchSnapshot();
  });
});
