import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const appRoot = resolve(import.meta.dirname);
const projectRoot = resolve(appRoot, '..');
const fixtureRoot = resolve(projectRoot, 'dev/fixtures');

export default defineConfig({
  clearScreen: false,
  define: {
    'import.meta.env.VITE_JSXEMAIL_TARGET_PATH': JSON.stringify(
      process.env.VITE_JSXEMAIL_TARGET_PATH || fixtureRoot
    )
  },
  optimizeDeps: {
    include: ['clsx', 'iconoir-react', 'react-dom', 'react-dom/client', 'zustand']
  },
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': resolve(appRoot, 'src'),
      '@jsxemailbuild': process.env.VITE_JSXEMAIL_BUILD_PATH || fixtureRoot
    }
  },
  root: appRoot,
  server: {
    fs: { strict: false },
    port: 8788
  }
});
