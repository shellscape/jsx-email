import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'path';

import chalk from 'chalk';
import mustache from 'mustache';
import { parse as assert, boolean, object, optional, string, type Output as Infer } from 'valibot';

import { type CommandFn } from './types.mjs';

const { log } = console;

const CreateOptionsStruct = object({
  jsx: optional(boolean()),
  out: optional(string())
});

type CreateOptions = Infer<typeof CreateOptionsStruct>;

export const help = chalk`
{blue email create}

Creates a new jsx-email template

{underline Usage}
  $ email create <template name> [...options]

{underline Options}
  --jsx   Use a JSX template instead of TSX. TSX is the default
  --out   The directory to create the new template in. Defaults to the current directory.

{underline Examples}
  $ email create invite
  $ email create invite --out=src/assets
`;

export const command: CommandFn = async (argv: CreateOptions, input) => {
  if (input.length < 1) return false;

  assert(CreateOptionsStruct, argv);

  const [name] = input;
  const { jsx, out } = argv;
  const template = await readFile(join(__dirname, '../templates/email.mustache'), 'utf8');
  const data = {
    name,
    propsType: jsx ? '' : ': TemplateProps',
    typeInfer: jsx ? '' : ', type Infer',
    typeProps: jsx ? '' : '\nexport type TemplateProps = Infer<typeof TemplateStruct>;'
  };
  const newContent = mustache.render(template, data);
  const outPath = resolve(out || process.cwd());
  const outFile = `${name}.tsx`;

  log('Creating a new template at', outPath);

  await mkdir(outPath, { recursive: true });
  await writeFile(join(outPath, outFile), newContent);

  log(`Template ${outFile} created`);

  return true;
};
