// Note: This script builds the ./apps/web/docs/samples directory by compiling the preview app
// against apps/demo/emails

import { join } from 'path';

import globby from 'globby';
import { build } from 'vite';

process.chdir(join(__dirname, '../app'));

(async () => {
  const demoPath = join(__dirname, '../../../apps/demo/emails');
  const componentPaths = await globby(join(demoPath, '/*.{jsx,tsx}'));

  process.env.VITE_EMAIL_COMPONENTS = JSON.stringify(componentPaths);

  await build({
    base: '/samples/',
    build: { outDir: join(__dirname, '../../../apps/web/src/public/samples'), target: 'esnext' }
  });
})();
