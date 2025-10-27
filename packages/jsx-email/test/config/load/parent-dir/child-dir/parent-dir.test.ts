import { loadConfig } from '../../../../../src/config.js';

describe('loadConfig → parent dir', async () => {
  test('loadConfig', async () => {
    const config = await loadConfig(__dirname);
    expect(config).toBeDefined();
    expect(config).toMatchSnapshot();
  });
});
