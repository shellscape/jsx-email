import { resolve } from 'node:path';

import { execa } from 'execa';
import strip from 'strip-ansi';
import { describe, expect, test } from 'vitest';

process.chdir(__dirname);

describe('cli', async () => {
  test('email check supports --use-preview-props', async () => {
    const templatePath = resolve(__dirname, './fixtures/check-preview-props.tsx');

    await expect(
      execa({ cwd: __dirname, shell: true })`email check ${templatePath}`
    ).rejects.toMatchObject({
      exitCode: 1
    });

    const { stdout } = await execa({
      cwd: __dirname,
      shell: true
    })`email check ${templatePath} --use-preview-props`;

    const plain = strip(stdout);

    expect(plain).toContain('Checking email template for Client Compatibility');
    expect(plain).toContain('Check Complete');
    expect(plain).not.toContain('noteLines');
    expect(plain).not.toContain('asshole');
  });
});
