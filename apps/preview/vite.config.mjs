import childProcess from 'node:child_process';
import { promisify } from 'node:util';
import { dirname } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';
import hypothetical from 'rollup-plugin-hypothetical';
import { findUp } from 'find-up';

const exec = promisify(childProcess.exec);

const getGitRoot = async () => {
  let isGit = true;

  try {
    await exec('git rev-parse --is-inside-work-tree');
  } catch (_) {
    isGit = false;
  }

  if (isGit) {
    try {
      const { stdout: root } = await exec('git rev-parse --show-toplevel');
      return root;
    } catch (_) {
      // no-op
    }
  }

  return process.cwd();
};

const gitRoot = await getGitRoot();
const foundRoot = await findUp(['jsconfig.json', 'tsconfig.json'], {
  cwd: '/Users/powella/code/jsx-email/apps/demo/emails',
  stopAt: gitRoot
});
const tsConfigRoot = foundRoot ? dirname(foundRoot) : void 0;

export default defineConfig({
  build: {
    minify: false,
    outDir: '/tmp/jsxe',
    rollupOptions: {
      output: {
        manualChunks: {}
      }
    },
    target: 'esnext',
    watch: void 0
  },
  clearScreen: false,
  // customLogger: logger,
  define: {
    'process.env': 'import.meta.env'
    // Note: vite appears to use a bottom-up (or reverse) strategy for applying defines. If the
    // spread below is before the `process.env` define above, all of the keys we've defined in
    // `envDefine` are replaced with an `import.meta.env` prefix, and thus don't work
    // ...envDefine
  },
  mode: 'development',
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
      'parse5',
      'pretty',
      'react-dom',
      'react-dom/client',
      'source-map-js'
    ]
  },
  plugins: [
    tsconfigPaths({ loose: true, root: tsConfigRoot }),
    hypothetical({
      allowFallthrough: true,
      files: {
        'rehype-preset-minify/': `export default {};`
      }
    }),
    nodePolyfills({
      globals: {
        Buffer: true
      }
    }),
    react()
  ],
  resolve: {
    alias: {
      '@jsxe': '/Users/powella/code/jsx-email/apps/demo/emails',
      'node:fs/promises': 'node-stdlib-browser/mock/empty',
      path: 'path-browserify',
      postcss: 'https://jspm.dev/postcss@8.4.31',
      rehype: 'https://jspm.dev/rehype@13.0.1',
      'rehype-stringify': 'https://jspm.dev/rehype-stringify@10.0.0',
      'unist-util-visit': 'https://jspm.dev/unist-util-visit@5.0.0'
    }
  },
  root: './app',
  server: { fs: { strict: false } }
});
