// Note: This script builds the preview app for deploy to https://samples.jsx.email against
// apps/demo/emails

import { join, resolve } from 'path';

import { build } from 'vite';

process.chdir(join(__dirname, '../app'));

(async () => {
  const { viteConfig } = await import('../packages/jsx-email/src/cli/commands/vite.config');
  await build({
    ...viteConfig,
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
        '@': resolve('../apps/demo/emails'),
        ...viteConfig.resolve?.alias
      }
    }
  });
})();
