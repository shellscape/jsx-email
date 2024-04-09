import { loadConfig } from '../../../../src/config';

describe('loadConfig → mjs-json', async () => {
  test('loadConfig', async () => {
    const config = await loadConfig();
    expect(config).toMatchSnapshot();
  });
});
