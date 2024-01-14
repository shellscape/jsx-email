/* eslint-disable import/no-extraneous-dependencies, import/no-default-export */
import { defineConfig, type Options } from 'tsup';

const base: Options = {
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  keepNames: true,
  outDir: 'dist',
  sourcemap: true,
  target: ['es2022', 'node18']
};

export default defineConfig([
  {
    ...base,
    entry: ['src/cli/index.ts'],
    format: ['cjs'],
    outDir: 'dist/cli'
  },
  base
]);
