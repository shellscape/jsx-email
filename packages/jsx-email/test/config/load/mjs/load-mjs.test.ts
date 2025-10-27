import { loadConfig } from '../../../../src/config.js';
import { sanitizeConfig } from '../../../helpers/sanitize-config.js';

describe('loadConfig → mjs', async () => {
  test('loadConfig', async () => {
    const config = await loadConfig(__dirname);
    expect(sanitizeConfig(config)).toMatchSnapshot();
  });
});
