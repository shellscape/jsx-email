import { existsSync } from 'node:fs';
import { mkdir, realpath, writeFile } from 'node:fs/promises';
import os from 'node:os';
import { basename, extname, join, resolve, win32, posix } from 'path';

import { doIUseEmail } from '@jsx-email/doiuse-email';
import { render } from '@jsx-email/render';
import chalk from 'chalk';
import { load } from 'cheerio';
import esbuild from 'esbuild';
import globby from 'globby';
import { minify as terser } from 'html-minifier-terser';
import beautify from 'js-beautify';
import type { Infer } from 'superstruct';
import { assert, boolean, object, optional, string } from 'superstruct';

import type { CommandFn, TemplateFn } from './types';

const { error, log } = console;

const BuildOptionsStruct = object({
  check: optional(boolean()),
  minify: optional(boolean()),
  out: optional(string()),
  plain: optional(boolean()),
  pretty: optional(boolean()),
  props: optional(string()),
  strip: optional(boolean())
});

const emailClients = [
  'apple-mail.*',
  'gmail.*',
  'outlook.*',
  'protonmail.*',
  'hey.*',
  'fastmail.*'
];

type BuildOptions = Infer<typeof BuildOptionsStruct>;

export const help = chalk`
{blue email build}

Builds a template and saves the result

{underline Usage}
  $ email build <template path> [...options]

{underline Options}
  --check       Check built templates for client compatibility
  --minify      Minify the rendered template before saving
  --no-strip    Prevents stripping data-id attributes from output
  --out         File path to save the rendered template
  --plain       Emit template as plain text
  --pretty      Oututs HTML in a pretty-print format. Note: Don't use this for production.
  --props       A JSON string containing props to be passed to the email template
                This is usually only useful when building a single template, unless all of your
                templates share the same props.

{underline Examples}
  $ email build ./src/emails
  $ email build ./src/templates/Invite.tsx
  $ email build ./src/templates/Invite.tsx --props='\{"batman": "Bruce Wayne"\}'
`;

const prettify = (html: string) => {
  const defaults = {
    indent_char: ' ',
    indent_inner_html: true,
    indent_size: 2,
    sep: '\n',
    unformatted: ['code', 'pre', 'em', 'strong', 'span']
  };

  return beautify.html(html, defaults);
};

// Credit: https://github.com/rollup/plugins/blob/master/packages/pluginutils/src/normalizePath.ts#L5
const normalizePath = (filename: string) => filename.split(win32.sep).join(posix.sep);

const stripHtml = (html: string) => {
  const $ = load(html, { xml: { decodeEntities: false }, xmlMode: true });

  $('*').removeAttr('data-id');

  return $.html()!;
};

const build = async (path: string, argv: BuildOptions) => {
  const { minify, out, plain, pretty = false, props = '{}', strip = true } = argv;
  const template = await import(path);
  const componentExport: TemplateFn = template.Template || template.default;
  const extension = plain ? '.txt' : '.html';

  if (!componentExport) {
    error(`${path} does not contain a named \`Template\` or default export of a JSX Element`);
    process.exit(1);
  }

  const buildProps = JSON.parse(props);
  const component = componentExport(buildProps);
  const writePath = join(out!, basename(path).replace(extname(path), extension));

  if (plain) {
    const plainText = render(component, { plainText: plain });
    await writeFile(writePath, plainText, 'utf8');
    return plainText;
  }

  let html = render(component);

  if (strip) html = stripHtml(html);
  if (minify) html = await terser(html);
  if (pretty) html = prettify(html);

  await mkdir(out!, { recursive: true });
  await writeFile(writePath, html, 'utf8');

  return html;
};

const compile = async (files: string[], outDir: string) => {
  await esbuild.build({
    bundle: true,
    entryPoints: files,
    logLevel: 'error',
    outdir: outDir,
    platform: 'node',
    write: true
  });

  return globby([normalizePath(join(outDir, '*.js'))]);
};

const formatSubject = (what: string) =>
  what.replace(/`([\s\w<>.-]+)`/g, (_, bit) => chalk`{bold ${bit}}`).trim();

const combine = (lines: string[]) => {
  const rePreamble = /(`([\s\w<>.-]+)`[\s\w]+)/;

  const result = lines.reduce<Record<string, string[]>>((prev, curr) => {
    const matches = curr.match(rePreamble);
    const preamble = matches![0];

    prev[preamble] = (prev[preamble] || []).concat(curr.replace(rePreamble, '').replace(/`/g, ''));

    return prev;
  }, {});

  for (const key of Object.keys(result)) {
    result[key] = Array.from(new Set(result[key]));
  }

  return result;
};

export const command: CommandFn = async (argv: BuildOptions, input) => {
  if (input.length < 1) return false;

  const [target] = input;
  const tmpdir = await realpath(os.tmpdir());
  const esbuildOutPath = join(tmpdir, 'jsx-email', Date.now().toString());
  const { check = false, plain } = argv;

  if (!(await existsSync(target))) {
    error(chalk`{red The provided build target '${target}' does not exist}`);
    process.exit(1);
  }

  assert(argv, BuildOptionsStruct);

  // Note: niave check that will probably get us into some edge cases
  const isFile = target.endsWith('.tsx') || target.endsWith('.jsx');
  const { out = '.rendered' } = argv;
  const glob = isFile ? target : join(target, '*.{jsx,tsx}');
  const targetFiles = await globby([normalizePath(glob)]);
  const outputPath = resolve(out);

  log(chalk`{cyan Found}`, targetFiles.length, 'files:');
  log('  ', targetFiles.join('\n  '));
  log(chalk`\n{blue Starting build...}`);

  const compiledFiles = await compile(targetFiles, esbuildOutPath);

  const builtFiles = await Promise.all(
    compiledFiles.map(async (filePath, index) => {
      return {
        fileName: targetFiles[index],
        html: await build(filePath, { ...argv, out: outputPath })
      };
    })
  );

  if (check && !plain) {
    log(chalk`{blue Checking results for Client Compatibility...}\n`);

    const counts = { errors: 0, notes: 0, warnings: 0 };

    for (const file of builtFiles) {
      const result = doIUseEmail(file.html, { emailClients });
      const { success } = result;

      // eslint-disable-next-line no-continue
      if (success && !result.warnings) continue;

      log(chalk`{underline ${file.fileName}}\n`);

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

      // FIXME: Think about how to intelligently display notes, because they aren't always useful
      // if (result.notes?.length) {
      //   const notes = combine(result.notes);
      //   const indent = '          ';
      //   for (const [preamble, clients] of Object.entries(notes)) {
      //     log(
      //       chalk`  {green note}  ${formatSubject(preamble)}:\n${indent}{dim ${clients.join(
      //         `\n${indent}`
      //       )}}\n`
      //     );
      //     counts.notes += 1;
      //   }
      // }
    }

    const errors = counts.errors > 0 ? chalk.red(counts.errors) : chalk.green(counts.errors);
    const warnings =
      counts.warnings > 0 ? chalk.yellow(counts.warnings) : chalk.green(counts.warnings);

    log(chalk`{green Check Complete:} ${errors} error(s), ${warnings} warning(s)`);
  }

  log(chalk`\n{green Build complete}. File(s) written to:`, outputPath);

  return true;
};
