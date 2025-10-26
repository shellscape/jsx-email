import { loadConfig } from '../../../../../src/config.js';

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

describe('loadConfig → parent dir', async () => {
  test('loadConfig', async () => {
    const config = await loadConfig(__dirname);
    expect(config).toBeDefined();
    expect(stable(config)).toMatchSnapshot();
  });
});
