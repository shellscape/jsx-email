import { loadConfig } from '../../src/config';

describe('loadConfig → none', async () => {
  test('loadConfig', async () => {
    const config = await loadConfig();
    expect(config).toMatchSnapshot();
  });
});
