import { existsSync } from 'fs';
import { readFile, symlink, unlink } from 'fs/promises';
import { join, resolve } from 'path';

import chalk from 'chalk';
import globby from 'globby';
import { assert, boolean, number, object, optional, Infer } from 'superstruct';
import { createServer } from 'vite';

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
  const templateSources = {} as Record<string, string>;

  for (const path of componentPaths) {
    templateSources[path.replace(targetPath, '').replace(/^\//, '')] =
      // eslint-disable-next-line no-await-in-loop
      await readFile(path, 'utf8');
  }

  if (existsSync(linkPath)) await unlink(linkPath);

  await symlink(targetPath, linkPath);

  const server = await createServer({
    configFile: false,
    ...config,
    define: {
      sǝɔɹnoslᴉɐɯǝxsɾ: JSON.stringify(templateSources),
      ...config.define
    },
    publicDir: targetPath,
    server: { port }
  });

  await server.listen();

  // TODO: bind CLI shortcuts. this hasn't landed in Vite yet, will be released with 5.0
  if (open) server.openBrowser();
  server.printUrls();
};
