import { existsSync } from 'fs';
import { relative, resolve, win32, posix } from 'path';

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
import { build as viteBuild, createServer, type InlineConfig } from 'vite';

import { log } from '../../log.js';
import { getViteConfig } from '../vite.mjs';

import type { CommandFn } from './types.mjs';

const PreviewOptionsStruct = object({
  buildPath: optional(string()),
  exclude: optional(string()),
  host: optional(boolean()),
  open: optional(boolean()),
  port: optional(union([number(), string()]))
});

type PreviewOptions = Infer<typeof PreviewOptionsStruct>;

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

const getConfig = async (targetPath: string, argv: PreviewOptions) => {
  const { exclude, host = false, port = 55420 } = argv;
  const viteConfig = await getViteConfig(targetPath);
  // Note: The trailing slash is required
  const relativePath = `${normalizePath(relative(viteConfig.root!, targetPath))}/`;

  process.env.VITE_JSXE_FILTER_GLOB = exclude;
  process.env.VITE_JSXE_RELATIVE_PATH = relativePath;

  const config = {
    configFile: false,
    ...viteConfig,
    resolve: {
      alias: {
        '@jsxe': targetPath,
        ...viteConfig.resolve?.alias
      }
    },
    server: { fs: { strict: false }, host, port: parseInt(port.toString(), 10) }
  } satisfies InlineConfig;

  return config;
};

const build = async (targetPath: string, argv: PreviewOptions) => {
  const { buildPath } = argv;
  const config = await getConfig(targetPath, argv);

  delete config.define!['process.env'];

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
      'process.env': '{}',
      ...config.define
    },
    mode: 'development'
  });
};

const start = async (targetPath: string, argv: PreviewOptions) => {
  const config = await getConfig(targetPath, argv);
  const { open = true } = argv;

  const server = await createServer(config);

  log.info(chalk`\n  🚀 {yellow jsx-email} Preview\n`);

  await server.listen();

  // TODO: bind CLI shortcuts. this hasn't landed in Vite yet, will be released with 5.0
  if (open) server.openBrowser();
  server.printUrls();
};

export const command: CommandFn = async (argv: PreviewOptions, input) => {
  if (input.length < 1) return false;

  assert(PreviewOptionsStruct, argv);

  const [target] = input;
  const targetPath = resolve(target);

  if (!existsSync(targetPath)) {
    log.error(chalk`\n{red D'oh} The directory provided ({dim ${targetPath}}) doesn't exist`);
    return true;
  }

  if (argv.buildPath) await build(targetPath, argv);
  else await start(targetPath, argv);
  return true;
};
