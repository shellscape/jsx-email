import { lstat } from 'node:fs/promises';

import { doIUseEmail } from '@jsx-email/doiuse-email';
import chalk from 'chalk';
import { parse as assert, object, type Output as Infer } from 'valibot';

import { formatBytes, gmailByteLimit, gmailBytesSafe } from '../helpers.mjs';

import { buildTemplates } from './build.mjs';
import { type CommandFn } from './types.mjs';

const { error, log } = console;

const CheckOptionsStruct = object({});

type CheckOptions = Infer<typeof CheckOptionsStruct>;

const emailClients = [
  'apple-mail.*',
  'gmail.*',
  'outlook.*',
  'protonmail.*',
  'hey.*',
  'fastmail.*'
];

const formatSubject = (what: string) =>
  what.replace(/`([\s\w<>.-]+)`/g, (_, bit) => chalk`{bold ${bit}}`).trim();

const combine = (lines: string[]) => {
  const rePreamble = /(`([\s\w<>.-]+)`[\s\w]+)/;

  const result = lines.reduce<Record<string, string[]>>((prev, curr) => {
    const matches = curr.match(rePreamble);
    const [preamble] = matches!;

    prev[preamble] = (prev[preamble] || []).concat(curr.replace(rePreamble, '').replace(/`/g, ''));

    return prev;
  }, {});

  for (const key of Object.keys(result)) {
    result[key] = Array.from(new Set(result[key]));
  }

  return result;
};

export const help = chalk`
{blue email check}

Check jsx-email templates for client compatibility

{underline Usage}
  $ email check <template file name>

{underline Examples}
  $ email check ./emails/Batman.tsx
`;

const runCheck = (fileName: string, html: string) => {
  const bytes = Buffer.byteLength(html, 'utf8');
  const counts = { errors: 0, notes: 0, warnings: 0 };
  const htmlSize = formatBytes(bytes);
  const result = doIUseEmail(html, { emailClients });
  const { success } = result;

  if (success && !result.warnings) return;

  log(chalk`{underline ${fileName}} → HTML: ${htmlSize}\n`);

  if (!success && result.errors?.length) {
    const errors = combine(result.errors);
    const indent = '           ';
    for (const [preamble, clients] of Object.entries(errors)) {
      log(
        chalk`  {red error}  ${formatSubject(preamble)}:\n${indent}{dim ${clients.join(
          `\n${indent}`
        )}}\n`
      );

      counts.errors += 1;
    }
  }

  if (bytes >= gmailByteLimit) {
    log(chalk`  {red error}  HTML content is over the Gmail Clipping Limit: ${htmlSize}\n`);
    counts.errors += 1;
  }

  if (result.warnings?.length) {
    const warnings = combine(result.warnings);
    const indent = '          ';
    for (const [preamble, clients] of Object.entries(warnings)) {
      log(
        chalk`  {yellow warn}  ${formatSubject(preamble)}:\n${indent}{dim ${clients.join(
          `\n${indent}`
        )}}\n`
      );
      counts.warnings += 1;
    }
  }

  if (bytes > gmailBytesSafe && bytes < gmailByteLimit) {
    log(chalk`  {red warn}  HTML content is near the Gmail Clipping Limit: ${htmlSize}\n`);
    counts.warnings += 1;
  }

  const errors = counts.errors > 0 ? chalk.red(counts.errors) : chalk.green(counts.errors);
  const warnings =
    counts.warnings > 0 ? chalk.yellow(counts.warnings) : chalk.green(counts.warnings);

  log(chalk`{green Check Complete:} ${errors} error(s), ${warnings} warning(s)`);
};

export const command: CommandFn = async (argv: CheckOptions, input) => {
  if (input.length !== 1) return false;

  const noExists = () => error(chalk`{red '${input}' doesn't appear to be a file which exists}`);

  try {
    const stat = await lstat(input[0]);
    if (!stat.isFile()) noExists();
  } catch (_) {
    noExists();
    return false;
  }

  assert(CheckOptionsStruct, argv);

  log(chalk`{blue Checking email template for Client Compatibility...}\n`);

  const [file] = await buildTemplates({
    buildOptions: { showStats: false, writeToFile: false },
    targetPath: input[0]
  });

  log();

  runCheck(file.fileName, file.html!);

  return true;
};
