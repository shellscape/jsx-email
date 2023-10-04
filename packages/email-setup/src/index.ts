#!/usr/bin/env node
import path from 'path';

import chalk from 'chalk';

import fse from 'fs-extra';

import pkg from '../package.json';

const DEFAULT_PATH = 'jsx-email-starter';
const { log } = console;

const intro = chalk`
{blue email-setup v${pkg.version}}

${pkg.description}
`;

const footer = (name?: string) => chalk`
{underline Starter template created}

Now run: 

  $ cd ${name ?? DEFAULT_PATH}
  $ pnpm install
  $ pnpm run dev
`;

const init = async (name: string) => {
  let projectPath = name;

  log(intro);

  if (!projectPath) {
    projectPath = path.join(process.cwd(), DEFAULT_PATH);
  }

  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim();
  }

  log('Creating starter template...\n\n');

  const templatePath = path.resolve(__dirname, '../starter');
  const resolvedProjectPath = path.resolve(projectPath);

  fse.copySync(templatePath, resolvedProjectPath);

  log(footer(name));
};

init(process.argv[2]);
