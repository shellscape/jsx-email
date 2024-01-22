#!/usr/bin/env node
import 'source-map-support/register';

import importLocal from 'import-local';
import yargs from 'yargs-parser';

import pkg from '../../package.json';
import { debug } from '../debug';

import { command as build } from './commands/build';
import { command as check } from './commands/check';
import { command as create } from './commands/create';
import { command as help } from './commands/help';
import { command as preview } from './commands/preview';
import type { CommandFn } from './commands/types';

const commands: Record<string, CommandFn> = { build, check, create, help, preview };

const { log } = console;

const run = async () => {
  const argv = yargs(process.argv.slice(2), { configuration: { 'strip-dashed': true } });
  const { _: positionals, ...flags } = argv;
  const [commandName] = positionals;
  let command = commands[commandName];

  debug.cli(`Command Name: \`${commandName}\``);

  if (flags.version) {
    log(`${pkg.name} v${pkg.version}\n`);
    return;
  }

  if (!command) command = help;

  const input = (positionals.slice(1) as string[]) || [];
  const result = await command(flags, input);

  if (!result) {
    debug.cli(`Command \`${commandName}\` returned \`false\``);
    help({}, []);
  }
};

if (importLocal(__filename)) {
  debug.cli('Using local install of webpack-command');
} else {
  run();
}
