/* eslint-disable no-use-before-define */
import { existsSync } from 'node:fs';
import { mkdir, rmdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import chalk from 'chalk';
import { parse as assert } from 'valibot';
// TODO: re-enable this plugin to provide multiple paths for template assets
// import { DynamicPublicDirectory } from 'vite-multiple-assets';
import { build as viteBuild, createServer, type InlineConfig } from 'vite';

import { log } from '../../log.js';
import { buildForPreview, writePreviewDataFiles } from '../helpers.mjs';
import { reloadPlugin } from '../vite-reload.mjs';
import { staticPlugin } from '../vite-static.mjs';
import { watch } from '../watcher.mjs';

import { getTempPath } from './build.mjs';
import {
  type CommandFn,
  type PreviewCommandOptions,
  type PreviewCommonParams,
  PreviewCommandOptionsStruct
} from './types.mjs';

// eslint-disable-next-line no-console
const newline = () => console.log('');

export const help = chalk`
{blue email preview}

Starts the preview server for a directory of email templates

{underline Usage}
  $ email preview <template dir path> [...options]

{underline Options}
  --build-path  An absolute path. When set, builds the preview as a deployable app and saves to disk
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

  const { basePath = './', buildPath } = argv;
  const common = { argv, targetPath };
  await prepareBuild(common);
  const config = await getConfig(common);

  await viteBuild({
    ...config,
    base: basePath,
    build: {
      minify: false,
      outDir: buildPath,
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
  // @ts-ignore
  const root = fileURLToPath(import.meta.resolve('../../../preview'));
  const { basePath = '/', host = false, port = 55420 } = argv;

  log.debug(`Vite Root: ${root}`);

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
