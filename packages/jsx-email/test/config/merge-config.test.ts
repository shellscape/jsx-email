import { mergeConfig } from '../../src/config.js';

describe('defineConfig', async () => {
  test('baseline', async () => {
    const a = {
      logLevel: 'info',
      render: {
        disableDefaultStyle: false,
        minify: false,
        plainText: false,
        pretty: false
      }
    };
    const b = {
      render: {
        exclude: undefined,
        minify: false,
        out: '/private/var/folders/07/ywbfgwc57_z4yx4m8vzhr8580000gp/T/jsx-email/preview',
        pretty: true,
        showStats: true,
        silent: false,
        usePreviewProps: true
      }
    };
    expect(await mergeConfig(a as any, b)).toMatchSnapshot();
  });
});
