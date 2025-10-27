import { readFile, writeFile } from 'node:fs/promises';
import { dirname, basename, extname, join, resolve, isAbsolute } from 'path';

import esbuild from 'esbuild';

import { loadConfig } from '../config.js';
import { log } from '../log.js';

interface CompileOptions {
  /**
   * @desc an array of absolute paths for JSX/TSX template files to compile
   */
  files: string[];
  /**
   * @desc Default: true. If true, adds the build hash to compiled file names.
   */
  hashFiles?: boolean;
  /**
   * @desc the path to output the compiled file(s)
   */
  outDir: string;
  /**
   * @desc If true, writes the ESBuild metadata for the compiled file(s)
   */
  writeMeta?: boolean;
}

// Note: after server start we change the root directory to trick vite
const originalCwd = process.cwd();

const cssPlugin: esbuild.Plugin = {
  name: 'jsx-email/css-plugin',
  setup(builder) {
    builder.onLoad({ filter: /\.css$/ }, async (args) => {
      const buffer = await readFile(args.path);
      const css = await esbuild.transform(buffer, { loader: 'css', minify: false });
      return { contents: css.code, loader: 'text' };
    });
  }
};

interface CompileResult {
  entryPoint: string;
  path: string;
}

// Convert any path to POSIX-style slashes for consistent comparisons
const toPosix = (p: string) => p.replace(/\\/g, '/');

// Internal: resolve an esbuild metafile output key to an absolute file path
// Handles macOS quirk where keys may omit the leading '/'
export const _resolveOutputPath = (outDir: string, outKey: string): string => {
  const outDirPosix = toPosix(outDir);
  const keyPosix = toPosix(outKey);

  // If esbuild already provided an absolute path, use it as-is
  if (isAbsolute(keyPosix) || /^[A-Za-z]:\//.test(keyPosix)) return keyPosix;

  // macOS: sometimes keys look absolute but are missing the leading '/'
  // e.g. key: 'private/var/folders/.../T/jsx-email/build/file.js'
  // while outDir: '/private/var/folders/.../T/jsx-email/build'
  if (outDirPosix.startsWith('/')) {
    const outNoLead = outDirPosix.slice(1);
    if (keyPosix.startsWith(outNoLead + '/')) return `/${keyPosix}`;
  }

  // Fallback: treat key as relative to outDir
  return resolve(outDir, outKey);
};
/**
 * @desc Compiles a JSX/TSX template file using esbuild
 * @param options CompileOptions
 * @returns Promise<CompileResult[]> An array of files affected by the compilation
 */
export const compile = async (options: CompileOptions): Promise<CompileResult[]> => {
  const config = await loadConfig();

  const { files, hashFiles = true, outDir, writeMeta = false } = options;
  const { metafile } = await esbuild.build({
    bundle: true,
    define: {
      'import.meta.isJsxEmailPreview': JSON.stringify(globalThis.isJsxEmailPreview || false)
    },
    entryNames: hashFiles ? '[dir]/[name]-[hash]' : '[dir]/[name]',
    entryPoints: files,
    jsx: 'automatic',
    logLevel: 'error',
    metafile: true,
    outdir: outDir,
    platform: 'node',
    plugins: [cssPlugin],
    write: true,
    ...config.esbuild
  });

  const { outputs } = metafile;
  const outputPaths = Object.keys(outputs);
  const affectedFiles = outputPaths
    .map((key) => {
      const { entryPoint } = metafile.outputs[key];
      if (!entryPoint) return null;
      return {
        entryPoint,
        path: _resolveOutputPath(outDir, key)
      };
    })
    .filter((x): x is CompileResult => x !== null);

  // log.debug({ affectedFiles });

  if (metafile && writeMeta) {
    const ops = Object.keys(outputs).map(async (key) => {
      const outPath = _resolveOutputPath(outDir, key);
      const fileName = basename(outPath, extname(outPath));
      const metaPath = join(dirname(outPath), `${fileName}.meta.json`);
      const writePath = resolve(originalCwd, metaPath);
      const json = JSON.stringify(metafile);

      log.debug('meta writePath:', writePath);
      await writeFile(writePath, json, 'utf8');
    });
    await Promise.all(ops);
  }

  return affectedFiles;
};
