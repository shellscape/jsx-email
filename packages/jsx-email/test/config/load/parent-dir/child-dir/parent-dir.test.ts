import { loadConfig } from '../../../../../src/config.js';
import { sanitizeConfig } from '../../../../helpers/sanitize-config.js';

describe('loadConfig → parent dir', async () => {
  test('loadConfig', async () => {
    const config = await loadConfig(__dirname);
    expect(config).toBeDefined();
    expect(sanitizeConfig(config)).toMatchSnapshot();
  });
});
