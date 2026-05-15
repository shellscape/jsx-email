import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import React from 'react';

import { render } from '../../packages/jsx-email/src/index.js';
import * as spamError from '../../apps/samples/emails/spam emails/spam-error.js';
import * as spamWarning from '../../apps/samples/emails/spam emails/spam-warning.js';

interface SpamFixtureTemplate {
  Template: React.ComponentType;
  templateName: string;
}

const fixtures = [
  {
    fixturePath: 'apps/preview/dev/fixtures/spam emails/spam-error.js',
    sourceFile: 'emails/spam emails/spam-error.tsx',
    sourcePath: 'apps/samples/emails/spam emails/spam-error.tsx',
    template: spamError as SpamFixtureTemplate
  },
  {
    fixturePath: 'apps/preview/dev/fixtures/spam emails/spam-warning.js',
    sourceFile: 'emails/spam emails/spam-warning.tsx',
    sourcePath: 'apps/samples/emails/spam emails/spam-warning.tsx',
    template: spamWarning as SpamFixtureTemplate
  }
];

const main = async () => {
  for (const fixture of fixtures) {
    const absoluteSourcePath = resolve(fixture.sourcePath);
    const html = await render(React.createElement(fixture.template.Template));
    const plain = await render(React.createElement(fixture.template.Template), { plainText: true });
    const source = await readFile(absoluteSourcePath, 'utf8');
    const content = {
      html,
      plain,
      source,
      sourceFile: fixture.sourceFile,
      sourcePath: absoluteSourcePath,
      templateName: fixture.template.templateName
    };
    const outputPath = resolve(fixture.fixturePath);

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `export default ${JSON.stringify(content, null, 2)};\n`, 'utf8');
    console.log(`Wrote ${fixture.fixturePath}`);
  }
};

void main();
