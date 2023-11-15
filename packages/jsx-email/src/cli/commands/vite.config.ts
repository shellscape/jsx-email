import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
// @ts-ignore
// eslint-disable-next-line
import hypothetical from 'rollup-plugin-hypothetical';

process.chdir(resolve(__dirname, '../preview-app'));

const logger = createLogger();
const { warnOnce: og } = logger;

logger.warnOnce = (message, options) => {
  // Note: ignore `Sourcemap for "${file}" points to missing source files` errors
  if (message.includes('points to missing source files')) return;
  og(message, options);
};

export const viteConfig = defineConfig({
  clearScreen: false,
  customLogger: logger,
  define: {
    'process.env': 'import.meta.env'
  },
  optimizeDeps: {
    // Note: These are all CommonJS dependencies that don't implement an ESM compatible exports
    // strategy. Any packages which throws "does not provide an export named 'default'" needs to go
    // here.
    include: [
      'classnames',
      'deepmerge',
      'extend',
      'parse5',
      'pretty',
      'react-dom',
      'react-dom/client'
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
      path: 'path-browserify'
    }
  },
  root: __dirname
});
