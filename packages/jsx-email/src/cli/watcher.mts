import { access, readFile, unlink } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';

// Note: Keep the star here. There are environments (ahem, Stackblitz) which
// can't seem to handle the psuedo default export
import * as watcher from '@parcel/watcher';
import chalk from 'chalk';
import type { Metafile } from 'esbuild';
import { type ViteDevServer } from 'vite';

import { log } from '../log.js';

import { getTempPath, type BuildTempatesResult } from './commands/build.mjs';
import { type PreviewCommonParams } from './commands/types.mjs';
import { buildForPreview, originalCwd, writePreviewDataFiles } from './helpers.mjs';

interface WatchArgs {
  common: PreviewCommonParams;
  files: BuildTempatesResult[];
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

const getEntrypoints = async (files: BuildTempatesResult[]) => {
  const entrypoints: Set<string> = new Set();
  const promises = files.map(async ({ metaPath }) => {
    log.debug({ exists: await exists(metaPath ?? ''), metaPath });

    if (!metaPath || !(await exists(metaPath))) return null;
    const contents = await readFile(metaPath, 'utf-8');
    const metafile = JSON.parse(contents) as Metafile;

    Object.entries(metafile.outputs).forEach(([_, { entryPoint }]) => {
      entrypoints.add(resolve(originalCwd, entryPoint!));
    });

    return null;
  });

  await Promise.all(promises);

  log.debug({ entrypoints });

  return Array.from(entrypoints).filter(Boolean);
};

const getWatchDirectories = async (files: BuildTempatesResult[], depPaths: string[]) => {
  const entrypoints = await getEntrypoints(files);
  const paths = [
    ...entrypoints.map((path) => dirname(path)),
    ...depPaths.map((path) => dirname(path))
  ];
  const uniquePaths = Array.from(new Set(paths));
  const watchPaths = removeChildPaths(uniquePaths);

  log.debug({ watchPaths });

  return { entrypoints, watchPaths };
};

const mapDeps = async (files: BuildTempatesResult[]) => {
  const depPaths: string[] = [];
  const metaReads = files.map(async ({ metaPath }) => {
    log.debug({ exists: await exists(metaPath ?? ''), metaPath });

    if (!metaPath || !(await exists(metaPath))) return null;
    const contents = await readFile(metaPath, 'utf-8');
    const metafile = JSON.parse(contents) as Metafile;
    const { outputs } = metafile;
    const result = new Map<string, Set<string>>();

    Object.entries(outputs).forEach(([_, meat]) => {
      const { entryPoint, inputs } = meat;
      const resolvedEntry = resolve(originalCwd, entryPoint!);
      depPaths.push(resolvedEntry);

      for (const dep of Object.keys(inputs)) {
        const resolvedDepPath = resolve(originalCwd, dep);
        const set = result.get(resolvedDepPath) ?? new Set();

        depPaths.push(resolvedDepPath);
        set.add(resolvedEntry);
        result.set(resolvedDepPath, set);
      }
    });

    return result;
  });
  const deps = (await Promise.all(metaReads)).filter(Boolean);

  return { depPaths, deps };
};

export const watch = async (args: WatchArgs) => {
  newline();
  log.info(chalk`{blue Starting watcher...}\n`);

  const { common, files, server } = args;
  const { argv } = common;
  const extensions = ['.css', '.js', '.jsx', '.ts', '.tsx'];
  const { depPaths, deps: metaDeps } = await mapDeps(files);
  const dependencyPaths = depPaths.filter((path) => !path.includes('/node_modules/'));
  const { entrypoints, watchPaths: watchDirectories } = await getWatchDirectories(
    files,
    dependencyPaths
  );
  const templateDeps = new Map<string, Set<string>>();
  const validFiles = Array.from(new Set([...entrypoints, ...dependencyPaths]));

  for (const map of metaDeps) {
    map!.forEach((value, key) => templateDeps.set(key, value));
  }

  log.info({ validFiles });

  const handler: watcher.SubscribeCallback = async (_, incoming) => {
    // Note: We perform this filter in case someone has a dependency of a template,
    // or has templates, at a path that includes node_modules. We also don't any
    // non-template files having builds attempted on them, so check to make sure
    // the event path is in the set of files we want to watch, unless it's a create
    // event
    const events = incoming.filter((event) => {
      if (event.path.includes('/node_modules/')) return false;
      if (event.type !== 'create') return validFiles.includes(event.path);
      return true;
    });

    const changedFiles = events
      .filter((event) => event.type !== 'create' && event.type !== 'delete')
      .map((e) => e.path)
      .filter((path) => extensions.includes(extname(path)));
    const changedTemplates = changedFiles
      .flatMap((file) => [...(templateDeps.get(file) || [])])
      .filter(Boolean);
    const createdFiles = events
      .filter((event) => event.type === 'create')
      .map((e) => e.path)
      .filter((path) => extensions.includes(extname(path)));
    const deletedFiles = events
      .filter(({ type }) => type === 'delete')
      .map((e) => e.path)
      .filter((path) => extensions.includes(extname(path)));
    const buildPath = await getTempPath('preview');
    const { exclude } = argv;

    log.debug('Changed Files:', changedFiles);
    log.debug('Changed Templates:', changedTemplates);
    log.debug('Created Files:', createdFiles);
    log.debug('Deleted Files:', deletedFiles);

    if (deletedFiles.length) {
      log.info(
        chalk`{cyan Removed}`,
        deletedFiles.length,
        `file${deletedFiles.length === 1 ? '' : 's'}:\n `,
        deletedFiles.join('\n  '),
        '\n'
      );

      deletedFiles.forEach((path) => {
        let index: any = files.findIndex(({ fileName }) => path === fileName);
        if (index === -1) return;
        const file = files[index];
        files.splice(index, 1);
        // Note: Don't await either, we don't need to
        unlink(file.compiledPath);
        unlink(`${file.writePathBase}.js`);

        index = validFiles.find((fileName) => path === fileName);
        if (index > -1) validFiles.splice(index, 1);
      });
    }

    if (createdFiles.length) {
      log.info(
        chalk`{cyan Building}`,
        createdFiles.length,
        `file${createdFiles.length === 1 ? '' : 's'}:\n `,
        createdFiles.join('\n  '),
        '\n'
      );

      await Promise.all(
        createdFiles.map(async (path) => {
          const results = await buildForPreview({
            buildPath,
            exclude,
            quiet: true,
            targetPath: path
          });

          const mappedDeps = await mapDeps(results);
          files.push(...results);
          validFiles.push(
            ...[path, ...mappedDeps.depPaths.filter((p) => !p.includes('/node_modules/'))]
          );

          await writePreviewDataFiles(results);
        })
      );
    }

    if (!changedTemplates.length) return;

    log.info(
      chalk`{cyan Rebuilding}`,
      changedTemplates.length,
      `file${changedTemplates.length === 1 ? '' : 's'}:\n `,
      changedTemplates.join('\n  '),
      '\n'
    );

    changedTemplates.forEach(async (path) => {
      const results = await buildForPreview({ buildPath, exclude, quiet: true, targetPath: path });
      await writePreviewDataFiles(results);
    });
  };

  log.debug('Watching Paths:', watchDirectories.sort());

  const subPromises = watchDirectories.map((path) => watcher.subscribe(path, handler));
  const subscriptions = await Promise.all(subPromises);

  server.httpServer!.on('close', () => {
    subscriptions.forEach((sub) => sub.unsubscribe());
  });
};
