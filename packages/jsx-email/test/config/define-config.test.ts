import { defineConfig } from '../../src/config.js';
import { pluginSymbol } from '../../src/plugins.js';

// Snapshot only stable fields to avoid environment-dependent diffs
const stable = (config: any) => {
  return {
    logLevel: config.logLevel,
    plugins: Array.isArray(config.plugins)
      ? config.plugins.map((p: any) => {
          return { name: p?.name };
        })
      : [],
    render: config.render
  };
};

describe('defineConfig', async () => {
  test('defaults', async () => {
    const config = await defineConfig({});
    expect(stable(config)).toMatchSnapshot();
  });

  test('basic set', async () => {
    const config = await defineConfig({
      render: {
        minify: true
      }
    });
    expect(stable(config)).toMatchSnapshot();
  });

  test('minify and pretty', async () => {
    const config = await defineConfig({
      render: {
        minify: true,
        pretty: true
      }
    });
    expect(stable(config)).toMatchSnapshot();
  });

  test('plain', async () => {
    const config = await defineConfig({
      render: {
        minify: true,
        plainText: true,
        pretty: true
      }
    });
    expect(stable(config)).toMatchSnapshot();
  });

  test('de-dupe plugins', async () => {
    const plugin = { name: 'batman', symbol: pluginSymbol };
    const config = await defineConfig({
      plugins: [plugin as any, plugin]
    });
    expect(stable(config)).toMatchSnapshot();
  });
});
