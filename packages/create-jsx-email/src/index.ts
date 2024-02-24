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

interface CreateEmailArgs {
  jsx: boolean;
  name: string;
  outputPath: string;
}

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
const typeDep = ',\n"@types/react": "^18.2.0",\n"typescript": "^5.2.2"';
const typeProps = `\nexport type TemplateProps = {
  email: string;
  name: string;
}`;

export const createEmail = async ({ jsx, name, outputPath }: CreateEmailArgs) => {
  const data = {
    name,
    propsType: jsx ? '' : ': TemplateProps',
    typeProps: jsx ? '' : typeProps
  };
  const templatePath = resolve(__dirname, '../generators/templates/email.mustache');
  const template = await readFile(templatePath, 'utf8');
  const contents = mustache.render(template, data);
  const fileName = basename(templatePath)
    .replace('_', '')
    .replace('.mustache', jsx ? '.jsx' : '.tsx');
  const outPath = join(outputPath, fileName);

  log('Creating a new template at', outPath);

  await writeFile(outPath, contents, 'utf8');

  return outPath;
};

const run = async () => {
  log(intro);

  const skip = process.argv.some((arg) => arg === '--yes');
  const argTargetDir = formatTargetDir(process.argv[2]);
  let targetPath = argTargetDir || defaultTargetDir;
  let result: prompts.Answers<'projectName' | 'projectType' | 'overwrite'>;
  const defaults: typeof result = {
    overwrite: true,
    projectName: defaultTargetDir,
    projectType: 'TypeScript'
  };

  try {
    result = skip
      ? defaults
      : await prompts(
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
              choices: [
                { title: 'TypeScript', value: 'TypeScript' },
                { title: 'JavaScript', value: 'JavaScript' }
              ],
              message: 'TypeScript or JavaScript:',
              name: 'projectType',
              type: 'select'
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
    log(cancelled.message);
    return;
  }

  const { overwrite, projectName, projectType } = result;
  const root = join(process.cwd(), targetPath);
  const generatorsPath = resolve(__dirname, '../generators');
  const jsx = projectType === 'JavaScript';
  const templates = await globby([normalizePath(join(generatorsPath, '/*.*'))]);
  const outputPath = join(root, 'templates');
  const templateData = { name: projectName, typeDep: jsx ? '' : typeDep };

  log(chalk`\n{blue Creating Project} at: {dim ${root}}`);

  if (overwrite && existsSync(root)) clearDirectory(root);

  await mkdir(outputPath, { recursive: true });

  for (const path of templates) {
    // eslint-disable-next-line no-continue
    if (path.endsWith('_tsconfig.json') && jsx) continue;
    const template = await readFile(path, 'utf8');
    const contents = mustache.render(template, templateData);
    const basePath = dirname(path);
    const fileName = basename(path).replace('_', '').replace('.mustache', '');
    const outPath = join(root, basePath.endsWith('templates') ? 'templates' : '', fileName);

    await writeFile(outPath, contents, 'utf8');
  }

  await createEmail({ jsx, name: projectName, outputPath });

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

{magenta Check out the docs!} {underline http://jsx.email/docs/quick-start}
`;

  log(footer);
};

run();
