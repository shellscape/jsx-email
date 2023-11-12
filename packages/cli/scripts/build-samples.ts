// Note: This script builds the preview app for deploy to https://samples.jsx.email against
// apps/demo/emails

import { join, resolve } from 'path';

import { build } from 'vite';

process.chdir(join(__dirname, '../app'));

(async () => {
  const { default: config } = await import('../app/vite.config');
  await build({
    ...config,
    build: {
      outDir: '/tmp/samples.jsx.email',
      target: 'esnext'
    },
    configFile: false,
    define: {
      'process.platform': null,
      'process.version': null
    },
    resolve: {
      alias: {
        '@': resolve('../../../apps/demo/emails')
      }
    }
  });
})();
