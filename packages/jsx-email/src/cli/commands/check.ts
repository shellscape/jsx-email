import { lstat } from 'node:fs/promises';

import { type IssueGroup, caniemail, groupIssues, sortIssues } from 'caniemail';
import chalk from 'chalk';
import chalkTmpl from 'chalk-template';
import stripAnsi from 'strip-ansi';
import { type InferOutput as Infer, parse as assert, boolean, object, optional } from 'valibot';

import { formatBytes, gmailByteLimit, gmailBytesSafe } from '../helpers.js';

import { buildTemplates } from './build.js';
import { type CommandFn } from './types.js';

const { error, log } = console;

const CheckOptionsStruct = object({
  usePreviewProps: optional(boolean())
});

type CheckOptions = Infer<typeof CheckOptionsStruct>;

const emailClients = [
  'apple-mail.*',
  'gmail.*',
  'outlook.*',
  'protonmail.*',
  'hey.*',
  'fastmail.*'
];

export const help = chalkTmpl`
{blue email check}

Check jsx-email templates for client compatibility

{underline Usage}
  $ email check <template file name>

{underline Options}
  --use-preview-props
                When set, use the \`previewProps\` exported by the template file (if present).

{underline Examples}
  $ email check ./emails/Batman.tsx
`;

export const formatNotes = (notes: string[], indent: string) => {
  if (!notes.length) return '';
  const noteIndent = `${indent}  `;
  const noteLines = notes.join(`\n${noteIndent}`);

  return chalkTmpl`\n${indent}{cyan Notes}:\n${noteIndent}{dim ${noteLines}}`;
};

export const formatIssue = (group: IssueGroup): string => {
  const { issue, clients } = group;
  const { position, support, title } = issue;
  const positionTuple = chalkTmpl`{dim ${position!.start.line}:${position!.start.column}}`;
  const notes = issue.notes.length ? issue.notes.map((note, index) => `${index + 1}. ${note}`) : [];
  let lineType = '';

  if (support === 'none') {
    lineType = chalkTmpl`  {red error}`;
  } else {
    lineType = chalkTmpl`  {yellow warn} `;
  }

  const preamble = `${lineType}  ${positionTuple} `;
  const indent = ' '.repeat(stripAnsi(preamble).length + 2);
  const footnotes = formatNotes(notes, indent);

  return chalkTmpl`${preamble}${title}:${footnotes}\n${indent}{dim ${clients.join(`\n${indent}`)}}\n`;
};

const runCheck = (fileName: string, html: string) => {
  const bytes = Buffer.byteLength(html, 'utf8');
  const htmlSize = formatBytes(bytes);
  const result = caniemail({ clients: emailClients as any, html });
  const { issues, success } = result;
  const { errors, warnings } = issues;
  const counts = {
    errors: 0,
    notes: 0,
    warnings: 0
  };

  if (success && !issues.warnings) return;

  log(chalkTmpl`{underline ${fileName}} → HTML: ${htmlSize}\n`);

  if (bytes >= gmailByteLimit) {
    log(chalkTmpl`  {red error}  HTML content is over the Gmail Clipping Limit: ${htmlSize}\n`);
    counts.errors += 1;
  } else if (bytes > gmailBytesSafe && bytes < gmailByteLimit) {
    log(chalkTmpl`  {red warn}  HTML content is near the Gmail Clipping Limit: ${htmlSize}\n`);
    counts.warnings += 1;
  }

  if (errors?.size || warnings?.size) {
    const groupedErrors = groupIssues(errors);
    const groupedWarnings = groupIssues(warnings);
    const sorted = sortIssues([...groupedErrors, ...groupedWarnings]);

    for (const group of sorted) {
      if (group.issue.support === 'none') counts.errors += 1;
      if (group.issue.support === 'partial') counts.warnings += 1;
      log(formatIssue(group));
    }
  }

  const errorCount = counts.errors > 0 ? chalk.red(counts.errors) : chalk.green(counts.errors);
  const warningCount =
    counts.warnings > 0 ? chalk.yellow(counts.warnings) : chalk.green(counts.warnings);

  log(
    chalkTmpl` {green {bold ✓}} {dim Check Complete}: ${errorCount} error(s), ${warningCount} warning(s)`
  );
};

export const command: CommandFn = async (argv: CheckOptions, input) => {
  if (input.length !== 1) return false;

  const noExists = () =>
    error(chalkTmpl`{red '${input}' doesn't appear to be a file which exists}`);

  try {
    const stat = await lstat(input[0]);
    if (!stat.isFile()) noExists();
  } catch (_) {
    noExists();
    return false;
  }

  assert(CheckOptionsStruct, argv);

  log(chalkTmpl`{blue Checking email template for Client Compatibility...}\n`);

  const [file] = await buildTemplates({
    buildOptions: { showStats: false, usePreviewProps: argv.usePreviewProps, writeToFile: false },
    targetPath: input[0]
  });

  log();

  runCheck(file.fileName, file.html!);

  return true;
};
