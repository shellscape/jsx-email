import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

process.chdir(__dirname);

export default defineConfig({
  define: {
    'process.env': 'import.meta.env'
  },
  optimizeDeps: {
    include: [
      'classnames',
      'deepmerge',
      'pretty',
      'react-dom',
      'react-dom/client',
      'react-dom/server'
    ]
  },
  plugins: [react()],
  root: __dirname
});
