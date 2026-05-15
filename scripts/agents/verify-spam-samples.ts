import { Window } from 'happy-dom';
import React from 'react';

import { scan } from '../../packages/canispam/src/index.js';
import { toEml } from '../../packages/jsx-email/src/eml/index.js';
import { render } from '../../packages/jsx-email/src/index.js';
import * as spamError from '../../apps/samples/emails/spam emails/spam-error.js';
import * as spamWarning from '../../apps/samples/emails/spam emails/spam-warning.js';

const window = new Window();
globalThis.DOMParser = window.DOMParser;
globalThis.NodeFilter = window.NodeFilter;

const samples = [
  { expected: 'warn', module: spamWarning },
  { expected: 'fail', module: spamError }
] as const;

const main = async () => {
  for (const sample of samples) {
    const html = await render(React.createElement(sample.module.Template));
    const plain = await render(React.createElement(sample.module.Template), { plainText: true });
    const result = await scan(
      toEml({
        html,
        plain,
        subject: sample.module.templateName
      })
    );

    console.log(`${sample.module.templateName}: ${result.classification} ${result.score}`);

    if (result.classification !== sample.expected) {
      throw new Error(
        `${sample.module.templateName} expected ${sample.expected}, received ${result.classification}.`
      );
    }
  }
};

void main();
