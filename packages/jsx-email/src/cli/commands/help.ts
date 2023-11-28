import chalk from 'chalk';

import pkg from '../../../package.json';

import type { CommandFn } from './types';
import { help as build } from './build';
import { help as check } from './check';
import { help as create } from './create';
import { help as preview } from './preview';

const { log } = console;

export const helpMessage = chalk`
{blue ${pkg.name}} v${pkg.version}

The jsx-email CLI. Build, Check, Create and View email templates

{underline Usage}
  $ email [...options]

{underline Commands}
  build       {dim <template file or dir path>}
  check       {dim <template file path>}
  create      {dim <template name>}
  help        [{dim <command>}]
  preview     {dim <templates dir path>}

{underline Options}
  --help      Displays this message
  --version   Displays the current jsx-email version

{underline Examples}
  $ email
  $ email --help
  $ email build ./src/emails
  $ email check ./src/emails/Batman.tsx
  $ email create invite
  $ email preview ./src/emails
`;

const commands: Record<string, string> = { build, check, create, preview };

export const command: CommandFn = async (_, inputs) => {
  if ((inputs || []).length < 1) {
    log(helpMessage);
    return true;
  }

  const [command] = inputs;
  const commandHelp = commands[command] || helpMessage;

  log(commandHelp);

  return true;
};
