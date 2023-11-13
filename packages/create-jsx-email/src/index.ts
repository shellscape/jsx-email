#!/usr/bin/env node
import { copyFile, mkdir, readFile, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

import chalk from 'chalk';
import mustache from 'mustache';

import pkg from '../package.json';

const DEFAULT_PATH = 'email-project';
const { log } = console;

const intro = chalk`
{underline create-jsx-email v${pkg.version}}

${pkg.description}
`;

const footer = (name?: string) => chalk`
{green ✓ Email Project Created}

Next, run:

  $ cd ${name}
  $ pnpm install
  $ pnpm run dev

{blue Documentation: {underline http://jsx.email/docs/quick-start}}
`;

const run = async (name = DEFAULT_PATH) => {
  log(intro);

  const templatePath = resolve(__dirname, '../template');
  const projectPath = resolve(process.cwd(), name);
  const email = await readFile(join(templatePath, 'email.mustache'), 'utf8');
  const pkg = await readFile(join(templatePath, 'package.mustache'), 'utf8');
  const data = { name };

  log(chalk`Creating Project at: {dim ${projectPath}}`);

  await mkdir(join(projectPath, 'templates'), { recursive: true });

  await writeFile(join(projectPath, 'package.json'), mustache.render(pkg, data), 'utf8');
  await writeFile(join(projectPath, `templates/${name}.tsx`), mustache.render(email, data), 'utf8');

  await copyFile(join(templatePath, '_gitignore'), join(projectPath, '.gitignore'));
  await copyFile(join(templatePath, '_tsconfig.json'), join(projectPath, 'tsconfig.json'));

  log(footer(name));
};

run(process.argv[2]);
