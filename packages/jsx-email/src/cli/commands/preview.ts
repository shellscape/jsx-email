/* eslint-disable no-use-before-define */
import { AssertionError } from 'node:assert';
import { existsSync } from 'node:fs';
import { mkdir, rmdir } from 'node:fs/promises';
import os from 'node:os';
import { isAbsolute, join, resolve, win32 } from 'node:path';

import react from '@vitejs/plugin-react';
import chalk from 'chalk-template';
import { parse as assert } from 'valibot';
// TODO: re-enable this plugin to provide multiple paths for template assets
// import { DynamicPublicDirectory } from 'vite-multiple-assets';
import { type InlineConfig, createServer, build as viteBuild } from 'vite';

import { log } from '../../log.js';
import { buildForPreview, originalCwd, writePreviewDataFiles } from '../helpers.js';
import { reloadPlugin } from '../vite-reload.js';
import { staticPlugin } from '../vite-static.js';
import { watch } from '../watcher.js';

import { getTempPath } from './build.js';
import {
  type CommandFn,
  type PreviewCommandOptions,
  PreviewCommandOptionsStruct,
  type PreviewCommonParams
} from './types.js';

// eslint-disable-next-line no-console
const newline = () => console.log('');
const { JSX_DEV_LOCAL = false } = process.env;

export const help = chalk`
{blue email preview}

Starts the preview server for a directory of email templates

{underline Usage}
  $ email preview <template dir path> [...options]

{underline Options}
  --build-path  When set, builds the preview as a deployable app and saves to disk. Defaults to .deploy
  --exclude     A micromatch glob pattern that specifies files to exclude from the preview
  --host        Allow thew preview server to listen on all addresses (0.0.0.0)
  --no-open     Do not open a browser tab when the preview server starts
  --port        The local port number the preview server should run on. Default: 55420

{underline Examples}
  $ email preview ./src/templates --port 55420
  $ email preview ./src/templates --build-path /tmp/email-preview
`;

const buildDeployable = async ({ argv, targetPath }: PreviewCommonParams) => {
  if (argv.basePath) {
    log.warn(
      chalk`The {yellow basePath} flag is depcrecated. The preview now deploys to a relative root by default. This flag is no longer needed`
    );
  }

  const { basePath = './', buildPath = './.deploy' } = argv;
  const common = { argv, targetPath };
  await prepareBuild(common);
  const config = await getConfig(common);
  const outDir = isAbsolute(buildPath) ? buildPath : resolve(join(originalCwd, buildPath));

  await viteBuild({
    ...config,
    base: basePath,
    build: {
      minify: false,
      outDir,
      rollupOptions: {
        output: {
          manualChunks: {}
        }
      },
      target: 'esnext',
      watch: void 0
    },
    define: {
      'process.env': '{}'
    },
    mode: 'development'
  });
};

const getConfig = async ({ argv, targetPath }: PreviewCommonParams) => {
  const buildPath = await getTempPath('preview');
  const root = JSX_DEV_LOCAL
    ? resolve(import.meta.dirname, '../../../../../apps/preview/app')
    : resolve(import.meta.dirname, '../../preview');
  const { basePath = '/', host = false, port = 55420 } = argv;

  if (JSX_DEV_LOCAL)
    log.warn(chalk`{yellow JSX_DEV_LOCAL is set}. using preview source from ${root}`);

  log.debug(`Vite Root: ${root}`);

  // On Windows, Vite's import.meta.glob cannot cross drive letters. If the
  // preview app root and the temporary build directory are on different
  // drives (e.g., D: vs C:), fail fast with a helpful error.
  if (os.platform() === 'win32') {
    const rootDrive = getDriveLetter(root);
    const buildDrive = getDriveLetter(buildPath);
    if (rootDrive && buildDrive && rootDrive !== buildDrive) {
      log.error(
        `jsx-email preview cannot run on Windows when the application root directory and the system temporary directory are on different drive letters. Please consider using WSL`
      );
      throw new AssertionError({
        message: `Temporary directory drive letter different than root directory drive letter`
      });
    }
  }

  newline();
  log.info(chalk`{blue Starting build...}`);

  process.env.VITE_JSXEMAIL_BASE_PATH = basePath;
  process.env.VITE_JSXEMAIL_TARGET_PATH = targetPath;

  // Note: If we don't do this, vite won't know where to run from.
  // And apparently there's a tailwind bug if we set the `root` config property
  process.chdir(root);

  const config = {
    clearScreen: false,
    configFile: false,
    optimizeDeps: {
      include: ['classnames', 'cookie', 'react-dom', 'react-dom/client', 'set-cookie-parser']
    },
    // plugins: [DynamicPublicDirectory([join(targetPath, '**')], { ssr: false }), react()],
    plugins: [
      reloadPlugin({ globs: [join(buildPath, '**/*.js')] }),
      staticPlugin({ paths: [join(targetPath, '**')] }),
      react()
    ],
    resolve: {
      alias: {
        '@jsxemailbuild': buildPath
      }
    },
    server: { fs: { strict: false }, host, port: parseInt(port.toString(), 10) }
  } satisfies InlineConfig;

  return config;
};

const getDriveLetter = (path: string) => {
  if (os.platform() !== 'win32') return null;
  return win32.parse(path).root.slice(0, 2).toUpperCase();
};

const prepareBuild = async ({ targetPath, argv }: PreviewCommonParams) => {
  const buildPath = await getTempPath('preview');
  const { exclude } = argv;

  if (existsSync(buildPath)) await rmdir(buildPath, { recursive: true });
  await mkdir(buildPath, { recursive: true });
  const files = await buildForPreview({ buildPath, exclude, targetPath });
  await writePreviewDataFiles(files);
  return files;
};

const start = async ({ targetPath, argv }: PreviewCommonParams) => {
  const common = { argv, targetPath };
  const files = await prepareBuild(common);
  const config = await getConfig(common);
  const { open = true } = argv;
  const server = await createServer(config);

  newline();
  log.info(chalk` 🚀 {yellow jsx-email} Preview\n`);

  await server.listen();
  server.bindCLIShortcuts();
  if (open) server.openBrowser();
  server.printUrls();

  return { files, server };
};

export const command: CommandFn = async (argv: PreviewCommandOptions, input) => {
  if (input.length < 1) return false;

  assert(PreviewCommandOptionsStruct, argv);

  const [target] = input;
  const targetPath = resolve(target);

  if (!existsSync(targetPath)) {
    newline();
    log.error(chalk`{red D'oh} The directory provided ({dim ${targetPath}}) doesn't exist`);
    return true;
  }

  const common = { argv, targetPath };

  if (argv.buildPath) {
    await buildDeployable(common);
    return true;
  }

  globalThis.isJsxEmailPreview = true;

  const { files, server } = await start(common);
  await watch({ common, files, server });

  return true;
};
