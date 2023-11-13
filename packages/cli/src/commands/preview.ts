import { existsSync } from 'fs';
import { resolve } from 'path';

import chalk from 'chalk';
import type { Infer } from 'superstruct';
import { assert, boolean, number, object, optional, string, union } from 'superstruct';
import { type InlineConfig, createServer } from 'vite';

import type { CommandFn } from './types';

const PreviewOptionsStruct = object({
  host: optional(boolean()),
  open: optional(boolean()),
  port: optional(union([number(), string()]))
});

type PreviewOptions = Infer<typeof PreviewOptionsStruct>;

const { error, info } = console;

export const help = chalk`
{blue email preview}

Starts the preview server for a directory of email templates

{underline Usage}
  $ email preview <template dir path> [...options]

{underline Options}
  --host      Allow thew preview server to listen on all addresses (0.0.0.0)
  --no-open   Do not open a browser tab when the preview server starts
  --port      The local port number the preview server should run on. Default: 55420

{underline Examples}
  $ email preview ./src/templates --port 55420
`;

export const command: CommandFn = async (argv: PreviewOptions, input) => {
  if (input.length < 1) return false;

  assert(argv, PreviewOptionsStruct);

  const [target] = input;
  const targetPath = resolve(target);

  await start(targetPath, argv);
  return true;
};

export const start = async (targetPath: string, argv: PreviewOptions) => {
  if (!existsSync(targetPath)) {
    error(chalk`\n{red D'oh} The directory provided ({dim ${targetPath}}) doesn't exist`);
    return;
  }

  const { host = false, open = true, port = 55420 } = argv;
  const { default: config } = await import('../../app/vite.config');

  const mergedConfig = {
    configFile: false,
    ...config,
    resolve: {
      alias: {
        '@': targetPath,
        ...config.resolve?.alias
      }
    },
    server: { host, port: parseInt(port as any, 10) }
  } as InlineConfig;

  const server = await createServer(mergedConfig);

  info(chalk`\n  🚀 {yellow JSX email} Preview\n`);

  await server.listen();

  // TODO: bind CLI shortcuts. this hasn't landed in Vite yet, will be released with 5.0
  if (open) server.openBrowser();
  server.printUrls();
};
