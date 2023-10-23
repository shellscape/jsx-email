/* eslint-disable import/no-extraneous-dependencies, import/no-default-export */
import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  keepNames: true,
  // Note: For tailwind, since tw-to-css doesn't have proper ESM compatibility
  noExternal: ['tw-to-css'],
  outDir: 'dist',
  sourcemap: true,
  target: ['es2022', 'node18']
});
