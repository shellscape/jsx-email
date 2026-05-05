import { mkdir, readFile, rm, unlink, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import { type Plugin, build as esbuild } from 'esbuild';
import { build as viteBuild } from 'vite';

const previewRoot = resolve(import.meta.dirname, '..');
const appRoot = resolve(previewRoot, 'app');
const outRoot = resolve(previewRoot, 'dist/packed');
const cssBuildRoot = resolve(outRoot, '.css-build');
const cssEntry = resolve(appRoot, '.packed-css-entry.html');
const sourceIndex = resolve(appRoot, 'index.html');
const sourceEntry = resolve(appRoot, 'src/main.tsx');
const packedEntry = resolve(outRoot, 'main.js');
const packedIndex = resolve(outRoot, 'index.html');
const entryScript = '<script type="module" src="/src/main.tsx"></script>';
const packedScript = '<script type="module" src="/main.js"></script>';

const rawTextPlugin: Plugin = {
  name: 'raw-text',
  setup(build) {
    build.onResolve({ filter: /\?raw$/ }, (args) => ({
      namespace: 'raw-text',
      path: resolve(args.resolveDir, args.path.replace(/\?raw$/, ''))
    }));

    build.onLoad({ filter: /.*/, namespace: 'raw-text' }, async (args) => ({
      contents: await readFile(args.path, 'utf8'),
      loader: 'text'
    }));
  }
};

const emptyCssPlugin: Plugin = {
  name: 'empty-css',
  setup(build) {
    build.onLoad({ filter: /\.css$/ }, () => ({
      contents: '',
      loader: 'js'
    }));
  }
};

function assertIncludes(content: string, value: string, file: string) {
  if (!content.includes(value)) {
    throw new TypeError(`${relative(previewRoot, file)} does not include ${value}.`);
  }
}

function rewriteIndex(html: string, css: string) {
  const count = html.split(entryScript).length - 1;
  if (count !== 1) {
    throw new TypeError(`Expected exactly one ${entryScript} tag, found ${count}.`);
  }

  const withScript = html.replace(entryScript, packedScript);
  return withScript.replace('</head>', `    <style>${css}</style>\n  </head>`);
}

async function buildCss() {
  await writeFile(
    cssEntry,
    '<!doctype html><html><head><link rel="stylesheet" href="/src/index.css" /></head></html>',
    'utf8'
  );

  await viteBuild({
    build: {
      assetsDir: 'assets',
      emptyOutDir: true,
      manifest: true,
      minify: false,
      outDir: cssBuildRoot,
      rollupOptions: { input: cssEntry }
    },
    clearScreen: false,
    configFile: false,
    plugins: [tailwindcss()],
    root: appRoot
  });
  await unlink(cssEntry).catch(() => {});

  const manifest = await readFile(resolve(cssBuildRoot, '.vite/manifest.json'), 'utf8').catch(
    () => null
  );
  if (!manifest) throw new TypeError('Vite CSS build did not write a manifest.');

  const parsed = JSON.parse(manifest) as Record<string, { css?: string[]; file?: string }>;
  const cssFile = Object.values(parsed).flatMap((entry) => {
    if (entry.css?.length) return entry.css;
    if (entry.file?.endsWith('.css')) return [entry.file];
    return [];
  })[0];
  if (!cssFile) throw new TypeError('Vite CSS build did not emit a CSS asset.');

  const css = await readFile(resolve(cssBuildRoot, cssFile), 'utf8');
  await rm(cssBuildRoot, { force: true, recursive: true });
  return css;
}

async function pack() {
  await rm(outRoot, { force: true, recursive: true });
  await mkdir(outRoot, { recursive: true });

  await esbuild({
    bundle: true,
    entryPoints: [sourceEntry],
    external: ['@jsxemailbuild/*'],
    format: 'esm',
    jsx: 'automatic',
    logLevel: 'warning',
    outfile: packedEntry,
    platform: 'browser',
    plugins: [rawTextPlugin, emptyCssPlugin],
    target: 'esnext'
  });

  const css = await buildCss();
  await writeFile(packedIndex, rewriteIndex(await readFile(sourceIndex, 'utf8'), css), 'utf8');

  const main = await readFile(packedEntry, 'utf8');
  const index = await readFile(packedIndex, 'utf8');

  assertIncludes(main, 'import.meta.glob', packedEntry);
  assertIncludes(main, '@jsxemailbuild', packedEntry);
  assertIncludes(index, 'src="/main.js"', packedIndex);
  assertIncludes(index, '<style>', packedIndex);

  if (index.includes('/src/main.tsx')) {
    throw new TypeError('Packed index still imports /src/main.tsx.');
  }

  if (index.includes('href="/main.css"')) {
    throw new TypeError('Packed index still imports /main.css.');
  }
}

await pack();
