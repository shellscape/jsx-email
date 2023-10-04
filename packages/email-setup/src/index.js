#!/usr/bin/env node
import path from 'path';

import { Command } from 'commander';

import { copySync } from 'fs-extra';

import pkg from '../package.json';

const { log } = console;

const init = async (name) => {
  let projectPath = name;

  if (!projectPath) {
    projectPath = path.join(process.cwd(), 'jsx-email-starter');
  }

  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim();
  }

  log('Creating starter template at:', projectPath);

  const templatePath = path.resolve(__dirname, './starter');
  const resolvedProjectPath = path.resolve(projectPath);

  copySync(templatePath, resolvedProjectPath);

  log(`Starter template created`);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const program = new Command()
  .name(pkg.name)
  .version(pkg.version)
  .description(pkg.description)
  .argument('[dir]', 'path to initialize the project')
  .action(init)
  .parse(process.argv);
