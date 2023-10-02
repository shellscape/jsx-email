import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dynamicImport from 'vite-plugin-dynamic-import';

process.chdir(__dirname);

export default defineConfig({
  define: {
    'process.env': 'import.meta.env'
  },
  plugins: [dynamicImport(), react()],
  root: __dirname
});
