/* eslint-disable import/no-extraneous-dependencies, import/no-default-export */
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';
import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/*.ts', 'src/*.tsx'],
  esbuildPlugins: [esbuildPluginFilePathExtensions()],
  format: ['cjs', 'esm'],
  keepNames: true,
  outDir: 'dist',
  sourcemap: true,
  target: ['es2022', 'node18']
});
