import { loadConfig } from '../../../../src/config';

describe('loadConfig → dotdir', async () => {
  test('loadConfig', async () => {
    const config = await loadConfig();
    expect(config).toMatchSnapshot();
  });
});
