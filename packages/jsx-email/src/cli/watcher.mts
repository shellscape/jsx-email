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
import { buildForPreview, originalCwd } from './helpers.mjs';

interface WatchArgs {
  common: PreviewCommonParams;
  // htmlFiles: BuildResult[];
  files: BuildResult[];
  server: ViteDevServer;
}

const exists = (path: string) =>
  access(path).then(
    () => true,
    () => false
  );

// eslint-disable-next-line no-console
const newline = () => console.log('');
const removeChildPaths = (paths: string[]): string[] =>
  paths.filter(
    (p1) => !paths.some((p2) => p1 !== p2 && relative(p2, p1) && !relative(p2, p1).startsWith('..'))
  );

export const watch = async (args: WatchArgs) => {
  newline();
  log.info(chalk`{blue Starting watcher...}\n`);

  // const { common, htmlFiles, server } = args;
  const { common, files, server } = args;
  const { argv } = common;
  const extensions = ['.css', '.js', '.jsx', '.ts', '.tsx'];
  let watchPaths: string[] = [];

  // const metaReads = htmlFiles.map(async ({ metaPath }) => {
  const metaReads = files.map(async ({ metaPath }) => {
    // log.debug({ exists: await exists(metaPath ?? ''), metaPath });

    if (!metaPath || !(await exists(metaPath))) return null;
    const contents = await readFile(metaPath, 'utf-8');
    const metafile = JSON.parse(contents) as Metafile;
    const { outputs } = metafile;
    const result = new Map<string, Set<string>>();

    Object.entries(outputs).forEach(([_, meat]) => {
      const { entryPoint, inputs } = meat;
      const resolvedEntry = resolve(originalCwd, entryPoint!);
      watchPaths.push(resolvedEntry);

      for (const dep of Object.keys(inputs)) {
        const resolvedDepPath = resolve(originalCwd, dep);
        const set = result.get(resolvedDepPath) ?? new Set();

        watchPaths.push(resolvedDepPath);
        set.add(resolvedEntry);
        result.set(resolvedDepPath, set);
      }
    });

    return result;
  });
  const metaDeps = (await Promise.all(metaReads)).filter(Boolean);
  const templateDeps = new Map<string, Set<string>>();

  for (const map of metaDeps) {
    map!.forEach((value, key) => templateDeps.set(key, value));
  }

  const handler: watcher.SubscribeCallback = async (_, events) => {
    const changedFiles = events
      .filter((event) => event.type !== 'create' && event.type !== 'delete')
      .map((e) => e.path)
      .filter((path) => extensions.includes(extname(path)));
    const templates = changedFiles
      .flatMap((file) => [...(templateDeps.get(file) || [])])
      .filter(Boolean);

    if (events.some(({ type }) => type === 'create' || type === 'delete')) {
      log.warn(
        `Please restart the preview app for new or deleted files to take effect. This will be automatic in a future version`
      );
    }

    log.debug('Changed Files:', files);
    log.debug('Target Templates:', templates);

    if (!templates.length) return;

    const suffix = templates.length === 1 ? '' : 's';
    log.info(
      chalk`{cyan Rebuilding}`,
      templates.length,
      `file${suffix}:\n `,
      templates.join('\n  '),
      '\n'
    );

    const buildPath = await getTempPath('preview');
    const { exclude } = argv;
    templates.forEach((path) =>
      buildForPreview({ buildPath, exclude, quiet: true, targetPath: path })
    );
  };

  const watchPathSet = new Set([
    ...watchPaths.filter((path) => !path.includes('/node_modules/')).map((path) => dirname(path))
  ]);
  watchPaths = removeChildPaths([...watchPathSet]);

  log.debug('Watching Paths:', watchPaths.sort());

  const subPromises = watchPaths.map((path) => watcher.subscribe(path, handler));
  const subscriptions = await Promise.all(subPromises);

  server.httpServer!.on('close', () => {
    subscriptions.forEach((sub) => sub.unsubscribe());
  });
};
