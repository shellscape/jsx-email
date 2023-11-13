#!/usr/bin/env node
/* eslint-disable no-await-in-loop */
import { existsSync, readdirSync, rmSync } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { basename, dirname, join, resolve, win32, posix } from 'path';

import chalk from 'chalk';
import { detect } from 'detect-package-manager';
import globby from 'globby';
import mustache from 'mustache';
import prompts from 'prompts';

import pkg from '../package.json';

const cancelled = () => {
  throw new Error(chalk`{red ✖} Operation cancelled`);
};
const defaultTargetDir = 'email-project';
const clearDirectory = (path: string) => {
  for (const file of readdirSync(path)) {
    // eslint-disable-next-line no-continue
    if (file === '.git') continue;
    rmSync(resolve(path, file), { force: true, recursive: true });
  }
};
const formatTargetDir = (targetPath?: string) => targetPath?.trim().replace(/\/+$/g, '');
const intro = chalk`
{underline create-jsx-email v${pkg.version}}

${pkg.description}
`;
const isEmpty = (path: string) => {
  const files = readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
};
const { log } = console;
const normalizePath = (filename: string) => filename.split(win32.sep).join(posix.sep);

const run = async () => {
  log(intro);

  const argTargetDir = formatTargetDir(process.argv[2]);
  let targetPath = argTargetDir || defaultTargetDir;
  let result: prompts.Answers<'projectName' | 'overwrite'>;

  try {
    result = await prompts(
      [
        {
          initial: defaultTargetDir,
          message: 'Project name:',
          name: 'projectName',
          onState: (state) => {
            targetPath = formatTargetDir(state.value) || defaultTargetDir;
          },
          type: argTargetDir ? null : 'text'
        },
        {
          message: () =>
            targetPath === '.'
              ? 'Current directory'
              : `Target directory "${targetPath}" is not empty. Remove existing files and continue?`,
          name: 'overwrite',
          type: () => (!existsSync(targetPath) || isEmpty(targetPath) ? null : 'confirm')
        },
        {
          name: 'overwriteChecker',
          type: (_, { overwrite }: { overwrite?: boolean }) => {
            if (overwrite === false) cancelled();
            return null;
          }
        }
      ],
      { onCancel: cancelled }
    );
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  const { overwrite, projectName } = result;
  const root = join(process.cwd(), targetPath);

  log(chalk`{blue Creating Project} at: {dim ${root}}`);

  const templatesPath = resolve(__dirname, '../generators');
  const templates = await globby([normalizePath(join(templatesPath, '*.*'))]);
  const templdateData = { name: projectName };

  if (overwrite && existsSync(root)) clearDirectory(root);

  await mkdir(join(root, 'templates'), { recursive: true });

  for (const path of templates) {
    const template = await readFile(path, 'utf8');
    const contents = mustache.render(template, templdateData);
    const basePath = dirname(path);
    const fileName = basename(path).replace('_', '.');
    const outPath = join(root, basePath.endsWith('templates') ? 'templates' : '', fileName);

    await writeFile(outPath, contents, 'utf8');
  }

  const packageManager = await detect();
  const install =
    packageManager === 'yarn'
      ? `  $ yarn\n  $ yarn dev`
      : `  $ ${packageManager} install\n  $ ${packageManager} run dev`;
  const footer = chalk`
{green ✓} {bold jsx-email} Project Created

Next, run:

  $ cd ${projectName}
  ${install}

{blue Check out the docs! {underline http://jsx.email/docs/quick-start}}
`;

  log(footer);
};

run();
