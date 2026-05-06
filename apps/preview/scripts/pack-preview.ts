import { mkdir, readFile, rm, unlink, writeFile } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import { build as viteBuild } from 'vite';

const previewRoot = resolve(import.meta.dirname, '..');
const appRoot = resolve(previewRoot, 'app');
const outRoot = resolve(previewRoot, 'dist/packed');
const cssBuildRoot = resolve(outRoot, '.css-build');
const cssEntry = resolve(appRoot, '.packed-css-entry.html');
const sourceIndex = resolve(appRoot, 'index.html');
const srcRoot = resolve(appRoot, 'src');
const packedEntry = resolve(outRoot, 'main.tsx');
const packedIndex = resolve(outRoot, 'index.html');
const entryScript = '<script type="module" src="/src/main.tsx"></script>';
const packedScript = '<script type="module" src="/main.tsx"></script>';
const importPattern = /^import[\s\S]*?;\n?/gm;
const sourceFiles = [
  'types/lab.ts',
  'types/templates.ts',
  'helpers/file.ts',
  'helpers/zoom.ts',
  'helpers/consts.ts',
  'helpers/presets.ts',
  'helpers/gmail-color.ts',
  'helpers/cn.ts',
  'helpers/file-tree.ts',
  'helpers/templates.ts',
  'helpers/color-inversion.ts',
  'helpers/canvas-positioning.ts',
  'stores/preview-store.ts',
  'components/ui/button.tsx',
  'components/plunk-logo.tsx',
  'components/code/code-block.tsx',
  'components/canvas/preview-iframe.tsx',
  'components/canvas/empty-card.tsx',
  'components/canvas/use-canvas-zoom.ts',
  'components/canvas/template-card.tsx',
  'components/canvas/canvas.tsx',
  'components/logo-wordmark.tsx',
  'components/lab-controls/switch-control.tsx',
  'components/lab-controls/send-email-section.tsx',
  'components/lab-controls/lab-controls-panel.tsx',
  'components/file-system/file-tree.tsx',
  'components/file-system/file-system-panel.tsx',
  'components/header.tsx',
  'app.tsx',
  'main.tsx'
];
const importHeader = `import React, {
  type ButtonHTMLAttributes,
  type FormEvent,
  type ReactNode,
  type RefObject,
  type SVGProps,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import ReactDOM from 'react-dom/client';
import {
  Check,
  Copy,
  Download,
  FolderMinus,
  FolderPlus,
  HalfMoon,
  MailOut,
  Minus,
  NavArrowDown,
  NavArrowLeft,
  NavArrowRight,
  NavArrowUp,
  Page,
  Plus,
  Refresh,
  Send,
  SmartphoneDevice,
  Xmark
} from 'iconoir-react';
import beautify from 'js-beautify';
import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import shikiHtmlLang from 'shiki/langs/html.mjs';
import shikiJsLang from 'shiki/langs/javascript.mjs';
import shikiTsxLang from 'shiki/langs/tsx.mjs';
import shikiGithubDarkHighContrastTheme from 'shiki/themes/github-dark-high-contrast.mjs';
import shikiGithubLightTheme from 'shiki/themes/github-light.mjs';
import tippy from 'tippy.js';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { create } from 'zustand';
`;

function assertIncludes(content: string, value: string, file: string) {
  if (!content.includes(value)) {
    throw new TypeError(`${relative(previewRoot, file)} does not include ${value}.`);
  }
}

function stripImports(source: string) {
  return source.replace(importPattern, '');
}

function stripExports(source: string) {
  return source
    .replace(/\bexport\s+(?=(?:interface|type|const|function)\b)/g, '')
    .replace(/\bexport\s+\{[^}]+};?\n?/g, '');
}

async function packSource() {
  const chunks = await Promise.all(
    sourceFiles.map(async (file) => {
      const filePath = resolve(srcRoot, file);
      let source = await readFile(filePath, 'utf8');
      source = stripExports(stripImports(source));

      return `// src/${file}\n${source.trim()}\n`;
    })
  );

  const packed = `${importHeader}\n${chunks.join('\n')}\n`;
  assertIncludes(packed, 'import.meta.glob', packedEntry);
  assertIncludes(packed, '@jsxemailbuild', packedEntry);

  if (/from\s+['"]\.{1,2}\//.test(packed)) {
    throw new TypeError('Packed source still contains local import declarations.');
  }

  await writeFile(packedEntry, packed, 'utf8');
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

  await packSource();
  const css = await buildCss();
  await writeFile(packedIndex, rewriteIndex(await readFile(sourceIndex, 'utf8'), css), 'utf8');

  const main = await readFile(packedEntry, 'utf8');
  const index = await readFile(packedIndex, 'utf8');

  assertIncludes(main, 'import.meta.glob', packedEntry);
  assertIncludes(main, '@jsxemailbuild', packedEntry);
  assertIncludes(index, 'src="/main.tsx"', packedIndex);
  assertIncludes(index, '<style>', packedIndex);

  if (index.includes('/src/main.tsx')) {
    throw new TypeError('Packed index still imports /src/main.tsx.');
  }

  if (index.includes('href="/main.css"')) {
    throw new TypeError('Packed index still imports /main.css.');
  }
}

await pack();
