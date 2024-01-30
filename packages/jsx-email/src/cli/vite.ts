import { dirname, join } from 'path';

import { getDeps } from '@jsx-email/app-preview';
import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// @ts-ignore
// eslint-disable-next-line
import hypothetical from 'rollup-plugin-hypothetical';

const logger = createLogger();
const { warnOnce: og } = logger;
const root = join(dirname(require.resolve('@jsx-email/app-preview')), 'app');

process.chdir(root);

logger.warnOnce = (message, options) => {
  // Note: ignore `Sourcemap for "${file}" points to missing source files` errors
  if (message.includes('points to missing source files')) return;
  og(message, options);
};

// Note: This prepares a `define` object to inject all of the process' envars into vite. Vite is weird
// in that it limits envars to those with a VITE_ prefix, but that's not a behavior that we need or
// want for shipping vite as a wrapped dev server
const envDefine = Object.keys(process.env)
  .sort()
  .reduce((agg, key) => {
    agg[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return agg;
  }, {} as Record<string, string | null>);
const previewDeps = getDeps();

export const viteConfig = defineConfig({
  clearScreen: false,
  customLogger: logger,
  define: {
    'process.env': 'import.meta.env',
    // Note: vite appears to use a bottom-up (or reverse) strategy for applying defines. If the
    // spread below is before the `process.env` define above, all of the keys we've defined in
    // `envDefine` are replaced with an `import.meta.env` prefix, and thus don't work
    ...envDefine
  },
  optimizeDeps: {
    // Note: These are all CommonJS dependencies that don't implement an ESM compatible exports
    // strategy. Any packages which throws "does not provide an export named 'default'" needs to go
    // here.
    include: [
      '@jridgewell/sourcemap-codec',
      'balanced-match',
      'classnames',
      'debug',
      'deepmerge',
      'escape-string-regexp',
      'extend',
      'p-memoize',
      'parse5',
      'pretty',
      'react-dom',
      'react-dom/client',
      'source-map-js',
      ...previewDeps
    ]
  },
  plugins: [
    hypothetical({
      allowFallthrough: true,
      files: {
        'rehype-preset-minify/': `export default {};`
      }
    }),
    nodePolyfills(),
    react()
  ],
  resolve: {
    alias: {
      path: 'path-browserify',
      postcss: 'https://jspm.dev/postcss@8.4.31',
      rehype: 'https://jspm.dev/rehype@13.0.1',
      'rehype-stringify': 'https://jspm.dev/rehype-stringify@10.0.0',
      'unist-util-visit': 'https://jspm.dev/unist-util-visit@5.0.0'
    }
  },
  root
});
