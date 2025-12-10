import { createRequire } from 'node:module';
import { dirname } from 'node:path';

import loglevelnext from 'loglevelnext';

const require = createRequire(import.meta.url);

describe('defineConfig', async () => {
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

  test('defaults', async () => {
    const { defineConfig } = await import('../../src/config.js');
    expect(await defineConfig({})).toMatchSnapshot();
  });

  test('basic set', async () => {
    const { defineConfig } = await import('../../src/config.js');
    const config = await defineConfig({
      render: {
        minify: true
      }
    });
    expect(config).toMatchSnapshot();
  });

  test('minify and pretty', async () => {
    const { defineConfig } = await import('../../src/config.js');
    const config = await defineConfig({
      render: {
        minify: true,
        pretty: true
      }
    });
    expect(config).toMatchSnapshot();
  });

  test('plain', async () => {
    const { defineConfig } = await import('../../src/config.js');
    const config = await defineConfig({
      render: {
        minify: true,
        plainText: true,
        pretty: true
      }
    });
    expect(config).toMatchSnapshot();
  });

  test('de-dupe plugins', async () => {
    const { defineConfig } = await import('../../src/config.js');
    const { pluginSymbol } = await import('../../src/plugins.js');
    const plugin = { name: 'batman', symbol: pluginSymbol };
    const config = await defineConfig({
      plugins: [plugin as any, plugin]
    });
    expect(config).toMatchSnapshot();
  });
});
