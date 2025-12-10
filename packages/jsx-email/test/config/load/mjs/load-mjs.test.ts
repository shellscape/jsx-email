import { createRequire } from 'node:module';
import { dirname } from 'node:path';

import loglevelnext from 'loglevelnext';

const require = createRequire(import.meta.url);

describe('loadConfig → mjs', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();

    process.env.FORCE_COLOR = '1';

    const dotLogPath = require.resolve('@dot/log');
    const chalkPath = require.resolve('chalk', { paths: [dirname(dotLogPath)] });

    delete require.cache[dotLogPath];
    delete require.cache[chalkPath];
    require(chalkPath).level = 1;

    delete (globalThis as any)[Symbol.for('jsx-email/global/config')];
    delete process.env.DOT_LOG_LEVEL;

    for (const key of Object.keys(loglevelnext.loggers)) {
      if (key === 'default') continue;
      delete loglevelnext.loggers[key];
    }
  });

  test('loadConfig', async () => {
    const { loadConfig } = await import('../../../../src/config.js');
    const config = await loadConfig(__dirname);
    expect(config).toMatchSnapshot();
  });
});
