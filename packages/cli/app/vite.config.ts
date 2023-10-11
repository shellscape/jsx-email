import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

process.chdir(__dirname);

const logger = createLogger();
const { warnOnce: og } = logger;

logger.warnOnce = (message, options) => {
  // Note: ignore `Sourcemap for "${file}" points to missing source files` errors
  if (message.includes('points to missing source files')) return;
  og(message, options);
};

export default defineConfig({
  clearScreen: false,
  customLogger: logger,
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
