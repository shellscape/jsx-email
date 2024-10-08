import { defineConfig } from '../../src/config.js';
import { pluginSymbol } from '../../src/plugins.js';

describe('defineConfig', async () => {
  test('defaults', async () => {
    expect(await defineConfig({})).toMatchSnapshot();
  });

  test('basic set', async () => {
    const config = await defineConfig({
      render: {
        minify: true
      }
    });
    expect(config).toMatchSnapshot();
  });

  test('minify and pretty', async () => {
    const config = await defineConfig({
      render: {
        minify: true,
        pretty: true
      }
    });
    expect(config).toMatchSnapshot();
  });

  test('plain', async () => {
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
    const plugin = { name: 'batman', symbol: pluginSymbol };
    const config = await defineConfig({
      plugins: [plugin as any, plugin]
    });
    expect(config).toMatchSnapshot();
  });
});
