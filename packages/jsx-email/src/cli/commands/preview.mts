import { existsSync } from 'node:fs';
import { mkdir, realpath, rmdir } from 'node:fs/promises';
import os from 'node:os';
import { dirname, join, relative, resolve, win32, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

import watcher from '@parcel/watcher';
import react from '@vitejs/plugin-react-swc';
import chalk from 'chalk';
import {
  parse as assert,
  boolean,
  number,
  object,
  optional,
  string,
  union,
  type Output as Infer
} from 'valibot';
import { build as viteBuild, createServer, type InlineConfig, type ViteDevServer } from 'vite';

import { log } from '../../log.js';

import { buildTemplates } from './build.mjs';
import type { CommandFn } from './types.mjs';

const PreviewCommandOptionsStruct = object({
  buildPath: optional(string()),
  exclude: optional(string()),
  host: optional(boolean()),
  open: optional(boolean()),
  port: optional(union([number(), string()]))
});

type PreviewCommandOptions = Infer<typeof PreviewCommandOptionsStruct>;

interface PreviewCommonParams {
  argv: PreviewCommandOptions;
  targetPath: string;
}

interface BuildForPreviewParams {
  buildPath: string;
  exclude?: string;
  quiet?: boolean;
  targetPath: string;
}

// eslint-disable-next-line no-console
const newline = () => console.log('');
const normalizePath = (filename: string) => filename.split(win32.sep).join(posix.sep);

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

const buildForPreview = async ({
  buildPath,
  exclude,
  quiet = false,
  targetPath
}: BuildForPreviewParams) => {
  await Promise.all([
    buildTemplates({
      buildOptions: {
        exclude,
        internalForPreview: true,
        minify: false,
        out: buildPath,
        pretty: true,
        showStats: !quiet,
        silent: quiet,
        usePreviewProps: true
      },
      targetPath
    }),
    buildTemplates({
      buildOptions: {
        exclude,
        minify: false,
        out: buildPath,
        plain: true,
        showStats: false,
        silent: true,
        usePreviewProps: true
      },
      targetPath
    })
  ]);
};

const getTempBuildPath = async () => {
  const tmpdir = await realpath(os.tmpdir());
  const buildPath = join(tmpdir, 'jsx-email-preview');

  return buildPath;
};

const getConfig = async ({ targetPath, argv }: PreviewCommonParams) => {
  // @ts-ignore
  const root = join(dirname(fileURLToPath(import.meta.resolve('@jsx-email/app-preview'))), 'app');
  const buildPath = await getTempBuildPath();
  const { exclude, host = false, port = 55420 } = argv;
  // const viteConfig = await getViteConfig(targetPath);
  // Note: The trailing slash is required
  const relativePath = `${normalizePath(relative(root, targetPath))}/`;

  newline();
  log.info(chalk`{blue Starting build...}`);

  if (existsSync(buildPath)) await rmdir(buildPath, { recursive: true });
  await mkdir(buildPath, { recursive: true });
  await buildForPreview({ buildPath, exclude, targetPath });

  process.env.VITE_JSXEMAIL_BUILD_PATH = `${normalizePath(relative(root, buildPath))}/`;
  process.env.VITE_JSXEMAIL_RELATIVE_PATH = relativePath;

  // Note: If we don't do this, vite won't know where to run from.
  // And apparently there's a tailwind bug if we set the `root` config property
  process.chdir(root);

  const config = {
    clearScreen: false,
    configFile: false,
    plugins: [react()],
    resolve: {
      alias: {
        '@jsxemailbuild': buildPath,
        '@jsxemailsrc': targetPath
      }
    },
    server: { fs: { strict: false }, host, port: parseInt(port.toString(), 10) }
  } satisfies InlineConfig;

  return config;
};

const buildDeployable = async ({ targetPath, argv }: PreviewCommonParams) => {
  const { buildPath } = argv;
  const config = await getConfig({ argv, targetPath });

  await viteBuild({
    ...config,
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

const start = async ({ targetPath, argv }: PreviewCommonParams) => {
  const config = await getConfig({ argv, targetPath });
  const { open = true } = argv;
  const server = await createServer(config);

  newline();
  log.info(chalk` 🚀 {yellow jsx-email} Preview\n`);

  await server.listen();
  server.bindCLIShortcuts();
  if (open) server.openBrowser();
  server.printUrls();

  return server;
};

const watch = async (server: ViteDevServer, { argv, targetPath }: PreviewCommonParams) => {
  newline();
  log.info(chalk`{blue Starting watcher...}\n`);

  const subscription = await watcher.subscribe(targetPath, async (_, events) => {
    const templates = events
      .map((e) => e.path)
      .filter((path) => path.endsWith('.tsx') || path.endsWith('.jsx'));

    if (!templates.length) return;

    log.info(chalk`{cyan Rebuilding}`, templates.length, 'files:');
    log.info('  ', templates.join('\n  '), '\n');

    const buildPath = await getTempBuildPath();
    const { exclude } = argv;
    templates.forEach((path) =>
      buildForPreview({ buildPath, exclude, quiet: true, targetPath: path })
    );
  });

  server.httpServer!.on('close', () => subscription.unsubscribe);
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

  const params = { argv, targetPath };

  if (argv.buildPath) await buildDeployable(params);
  else {
    const server = await start(params);
    await watch(server, params);
  }
  return true;
};
