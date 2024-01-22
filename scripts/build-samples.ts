// Note: This script builds the preview app for deploy to https://samples.jsx.email against
// apps/demo/emails

import { resolve } from 'path';

import { build } from 'vite';

(async () => {
  const { viteConfig } = await import('../packages/jsx-email/src/cli/commands/vite');
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
