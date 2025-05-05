import { resolve } from 'node:path';

import { execa } from 'execa';
import strip from 'strip-ansi';
import { describe, expect, test } from 'vitest';

process.chdir(__dirname);

describe('cli', async () => {
  test('esbuild plugins', async () => {
    // console.log('changed dir:', process.cwd());
    // console.log(__dirname);
    const templatePath = resolve(
      __dirname,
      '../../../packages/jsx-email/test/render/fixtures/template.tsx'
    );
    const { stdout } = await execa({
      cwd: __dirname,
      shell: true
      // Note: For some reason `pnpm exec` is fucking with our CWD, and resets it to
      // packages/jsx-email, which causes the config not to be found. so we use npx instead
    })`email build ${templatePath}`;

    console.log(strip(stdout));

    expect(stdout).toContain('ESBUILD PLUGIN CONFIG TEST');
  });
});
