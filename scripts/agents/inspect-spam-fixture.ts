import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

import { Window } from 'happy-dom';
import { scan } from '../../packages/canispam/src/index.js';
import { toEml } from '../../packages/jsx-email/src/eml/index.js';

interface SpamFixture {
  html: string;
  plain: string;
  templateName: string;
}

const main = async () => {
  const fixturePath = process.argv[2];

  if (!fixturePath) {
    throw new TypeError('Usage: inspect-spam-fixture.ts <fixture-path>');
  }

  const window = new Window();
  Object.assign(globalThis, {
    CSS: window.CSS,
    DOMParser: window.DOMParser,
    NodeFilter: window.NodeFilter
  });

  const fixture = (await import(pathToFileURL(resolve(fixturePath)).href)).default as SpamFixture;
  const result = await scan(
    toEml({
      html: fixture.html,
      plain: fixture.plain,
      subject: fixture.templateName
    })
  );

  console.log(
    JSON.stringify(
      {
        classification: result.classification,
        findings: result.findings,
        score: result.score,
        scoreBreakdown: result.scoreBreakdown
      },
      null,
      2
    )
  );
};

void main();
