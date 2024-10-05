import { access, readFile } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';

// Note: Keep the star here. There are environments (ahem, Stackblitz) which
// can't seem to handle the psuedo default export
import * as watcher from '@parcel/watcher';
import chalk from 'chalk';
import type { Metafile } from 'esbuild';
import { type ViteDevServer } from 'vite';

import { log } from '../log.js';

import { getTempPath, type BuildResult } from './commands/build.mjs';
import { type PreviewCommonParams } from './commands/types.mjs';
import { buildForPreview } from './helpers.mjs';

interface WatchArgs {
  common: PreviewCommonParams;
  htmlFiles: BuildResult[];
  server: ViteDevServer;
}

const exists = (path: string) =>
  access(path).then(
    () => true,
    () => false
  );
// Note: after server start we change the root directory to trick vite
const originalCwd = process.cwd();
// eslint-disable-next-line no-console
const newline = () => console.log('');
const removeChildPaths = (paths: string[]): string[] =>
  paths.filter(
    (p1) => !paths.some((p2) => p1 !== p2 && relative(p2, p1) && !relative(p2, p1).startsWith('..'))
  );

export const watch = async (args: WatchArgs) => {
  newline();
  log.info(chalk`{blue Starting watcher...}\n`);

  const { common, htmlFiles, server } = args;
  const { argv } = common;
  const extensions = ['.css', '.js', '.jsx', '.ts', '.tsx'];
  const metaReads = htmlFiles.map(async ({ metaPath }) => {
    if (!metaPath || !(await exists(metaPath))) return null;
    const contents = await readFile(metaPath, 'utf-8');
    const metafile = JSON.parse(contents) as Metafile;
    const { outputs } = metafile;
    const result = Object.entries(outputs).map(([, { inputs }]) => {
      const deps = Object.keys(inputs)
        .filter((input) => !input.includes('/node_modules'))
        .map((input) => resolve(originalCwd, input));
      return deps;
    });

    return result;
  });
  const metaDeps = (await Promise.all(metaReads)).filter(Boolean);
  const depsArr = metaDeps.filter(Boolean).flatMap((meta) => meta) as string[][];
  const templateDeps = new Map<string, Set<string>>();
  const depPaths = new Set<string>();

  const handler: watcher.SubscribeCallback = async (_, events) => {
    const files = events.map((e) => e.path).filter((path) => extensions.includes(extname(path)));
    const templates = files.flatMap((file) => [...(templateDeps.get(file) || [])]).filter(Boolean);

    log.debug('Changed Files:', files);
    log.debug('Target Templates:', templates);

    if (!templates.length) return;

    const suffix = templates.length === 1 ? '' : 's';
    log.info(chalk`{cyan Rebuilding}`, templates.length, `file${suffix}:`);
    log.info('  ', templates.join('\n  '), '\n');

    const buildPath = await getTempPath('preview');
    const { exclude } = argv;
    templates.forEach((path) =>
      buildForPreview({ buildPath, exclude, quiet: true, targetPath: path })
    );
  };

  for (const deps of depsArr) {
    if (deps.length) {
      const [templateFile] = deps;
      for (const dep of deps) {
        const set = templateDeps.get(dep) ?? new Set<string>();
        set.add(templateFile);
        templateDeps.set(dep, set);
        depPaths.add(dirname(dep));
      }
    }
  }

  const watchPaths = removeChildPaths([...depPaths]);

  log.debug('Watching Paths:', watchPaths);

  const subPromises = watchPaths.map((path) => watcher.subscribe(path, handler));
  const subscriptions = await Promise.all(subPromises);

  server.httpServer!.on('close', () => {
    subscriptions.forEach((sub) => sub.unsubscribe());
  });
};
