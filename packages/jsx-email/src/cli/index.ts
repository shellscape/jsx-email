import yargs from 'yargs-parser';

import { name, version } from '../package-info.cjs';

import { debug } from '../debug.js';

import { command as build } from './commands/build.js';
import { command as check } from './commands/check.js';
import { command as create } from './commands/create.js';
import { command as help } from './commands/help.js';
import { command as preview } from './commands/preview.js';
import type { CommandFn } from './commands/types.js';

// Note: I'm not a huge fan of importing this here, but it guarantees that we capture
// the cwd before anything else futzes with it
// @ts-expect-error
// eslint-disable-next-line
import { originalCwd } from './helpers.js';
import { loadConfig } from '../config.js';

const commands: Record<string, CommandFn> = { build, check, create, help, preview };

const { log } = console;

export const run = async () => {
  const argv = yargs(process.argv.slice(2), { configuration: { 'strip-dashed': true } });
  const { _: positionals, ...flags } = argv;
  const [commandName] = positionals;
  let command = commands[commandName];

  globalThis.isJsxEmailPreview = false;

  debug.cli(`Command Name: \`${commandName}\``);

  if (flags.version) {
    log(`${name} v${version}\n`);
    return;
  }

  if (!command) command = help;

  await loadConfig();
  const input = (positionals.slice(1) as string[]) || [];
  const result = await command(flags, input);

  if (!result) {
    debug.cli(`Command \`${commandName}\` returned \`false\``);
    help({}, []);
  }
};
