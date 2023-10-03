import { existsSync, symlinkSync, unlinkSync } from 'fs';
import { join, resolve } from 'path';

import chalk from 'chalk';
import globby from 'globby';
import { assert, boolean, number, object, optional, Infer } from 'superstruct';
import { createServer, normalizePath } from 'vite';

import { CommandFn } from './types';

const PreviewOptionsStruct = object({
  open: optional(boolean()),
  port: optional(number())
});

type PreviewOptions = Infer<typeof PreviewOptionsStruct>;

const { error } = console;

export const help = chalk`
{blue email preview}

Starts the preview server for a directory of email templates

{underline Usage}
  $ email preview <template dir path> [...options]

{underline Options}
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

  const { open = true, port = 55420 } = argv;
  const { default: config } = await import('../../app/vite.config');
  const componentPaths = await globby(join(targetPath, '/*.{jsx,tsx}'));
  const linkPath = join(config.root!, 'src/@templates');

  process.env.VITE_TARGET_PATH = JSON.stringify(normalizePath(targetPath));
  process.env.VITE_EMAIL_COMPONENTS = JSON.stringify(componentPaths);

  if (existsSync(linkPath)) unlinkSync(linkPath);

  symlinkSync(targetPath, linkPath);

  const server = await createServer({
    configFile: false,
    ...config,
    publicDir: targetPath,
    server: { port }
  });

  await server.listen();

  // TODO: bind CLI shortcuts. this hasn't landed in Vite yet, will be released with 5.0
  if (open) server.openBrowser();
  server.printUrls();
};
