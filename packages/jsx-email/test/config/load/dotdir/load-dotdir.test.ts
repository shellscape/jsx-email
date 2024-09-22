import { loadConfig } from '../../../../src/config.js';

describe('loadConfig → dotdir', async () => {
  test('loadConfig', async () => {
    const config = await loadConfig(__dirname);
    expect(config).toMatchSnapshot();
  });
});
