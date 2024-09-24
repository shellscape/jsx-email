import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import { createLogger, defineConfig } from 'vite';

const logger = createLogger();
const { warnOnce: og } = logger;

logger.warnOnce = (message, options) => {
  // Note: ignore `Sourcemap for "${file}" points to missing source files` errors
  if (message.includes('points to missing source files')) return;
  og(message, options);
};

export const getViteConfig = async (_templatesPath: string) => {
  const root = join(dirname(fileURLToPath(import.meta.resolve('@jsx-email/app-preview'))), 'app');

  process.chdir(root);

  return defineConfig({
    clearScreen: false,
    plugins: [react()],
    root
  });
};
