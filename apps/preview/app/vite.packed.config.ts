import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const appRoot = resolve(import.meta.dirname);
const projectRoot = resolve(appRoot, '..');
const packedRoot = resolve(projectRoot, 'dist/packed');
const fixtureRoot = resolve(projectRoot, 'dev/fixtures');

export default defineConfig({
  clearScreen: false,
  define: {
    'import.meta.env.VITE_JSXEMAIL_TARGET_PATH': JSON.stringify(fixtureRoot)
  },
  optimizeDeps: {
    include: ['react-dom', 'react-dom/client']
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@jsxemailbuild': fixtureRoot
    }
  },
  root: packedRoot,
  server: {
    fs: { strict: false },
    host: '0.0.0.0',
    port: 8788
  }
});
