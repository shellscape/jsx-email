import { resolve } from 'node:path';

import { execa } from 'execa';
import strip from 'strip-ansi';
import { describe, expect, it } from 'vitest';

const emailBin = resolve(__dirname, '../../../../node_modules/.bin/email');
const templatePath = './fixtures/cli-preview-props-template.tsx';

describe('cli check --email-clients', () => {
  it('checks compatibility using the provided clients list', async () => {
    const { stdout } = await execa({
      cwd: __dirname,
      shell: true
    })`${emailBin} check ${templatePath} --email-clients gmail.desktop-webmail,outlook.windows`;

    const plain = strip(stdout)
      .replace(/\[\d{2}:\d{2}:\d{2}\]/g, '[time]')
      .replaceAll(templatePath, '<template-path>')
      .split('\n')
      .map((line) => line.trimEnd())
      .join('\n');

    expect(plain).toMatchSnapshot();
  });
});
