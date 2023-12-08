import { existsSync } from 'node:fs';
import { mkdir, realpath, writeFile } from 'node:fs/promises';
import os from 'node:os';
import { basename, extname, join, resolve, win32, posix } from 'path';
import { pathToFileURL } from 'url';

import chalk from 'chalk';
import esbuild from 'esbuild';
import globby from 'globby';
import { isWindows } from 'std-env';
import type { Infer } from 'superstruct';
import { assert, boolean, object, optional, string } from 'superstruct';

import { formatBytes, gmailByteLimit } from '../helpers';

import type { CommandFn, TemplateFn } from './types';

const { error, log } = console;

const BuildOptionsStruct = object({
  minify: optional(boolean()),
  'no-strip': optional(boolean()),
  out: optional(string()),
  plain: optional(boolean()),
  pretty: optional(boolean()),
  props: optional(string()),
  strip: optional(boolean()),
  writeToFile: optional(boolean())
});

type BuildOptions = Infer<typeof BuildOptionsStruct>;

interface BuildOptionsInternal extends BuildOptions {
  showStats?: boolean;
}

export const help = chalk`
{blue email build}

Builds a template and saves the result

{underline Usage}
  $ email build <template file or dir path> [...options]

{underline Options}
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

// Credit: https://github.com/rollup/plugins/blob/master/packages/pluginutils/src/normalizePath.ts#L5
const normalizePath = (filename: string) => filename.split(win32.sep).join(posix.sep);

export const build = async (path: string, argv: BuildOptions) => {
  const { out, plain, props = '{}', writeToFile = true } = argv;
  const platformPath = isWindows ? pathToFileURL(normalizePath(path)).toString() : path;
  const template = await import(platformPath);
  // proper named export
  let componentExport: TemplateFn = template.Template;

  // Note: This is silly, but necessary to parse all the whacky ways things may be exported
  if (!componentExport) {
    if (typeof template.default === 'function') {
      // export default Template
      componentExport = template.default;
    } else if (typeof template.default.Template === 'function') {
      // weird CJS edge case for export default Template
      componentExport = template.default.Template;
    } else if (typeof template.default.default === 'function') {
      // super weird edge case for CJS as ESM default exports I ran into with ts-node
      componentExport = template.default.default;
    }
  }

  if (typeof componentExport !== 'function')
    error(
      chalk`{red Template Export Problem:} ${basename(
        path
      )} doesn't export Template or export a Template as default. If you feel this is a bug, please open a new issue.`
    );

  const extension = plain ? '.txt' : '.html';
  const renderImport = 'jsx-email';
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { render } = await import(renderImport);

  if (!componentExport) {
    error(`${path} does not contain a named \`Template\` or default export of a JSX Element`);
    process.exit(1);
  }

  const buildProps = JSON.parse(props);
  const component = componentExport(buildProps);
  const writePath = join(out!, basename(path).replace(extname(path), extension));

  if (plain) {
    const plainText = await render(component, { plainText: plain });
    if (writeToFile) await writeFile(writePath, plainText, 'utf8');
    return plainText;
  }

  const html = await render(component, argv as any);

  await mkdir(out!, { recursive: true });
  if (writeToFile) await writeFile(writePath, html, 'utf8');

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

export const buildTemplates = async (target: string, options: BuildOptionsInternal) => {
  const tmpdir = await realpath(os.tmpdir());
  const esbuildOutPath = join(tmpdir, 'jsx-email', Date.now().toString());

  // Note: niave check that will probably get us into some edge cases
  const isFile = target.endsWith('.tsx') || target.endsWith('.jsx');
  const { out = '.rendered', showStats = true, writeToFile = true } = options;
  const glob = isFile ? target : join(target, '*.{jsx,tsx}');
  const targetFiles = await globby([normalizePath(glob)]);
  const outputPath = resolve(out);
  let largeCount = 0;

  log(chalk`{cyan Found}`, targetFiles.length, 'files:');
  log('  ', targetFiles.join('\n  '));
  log(chalk`\n{blue Starting build...}`);

  const compiledFiles = await compile(targetFiles, esbuildOutPath);

  const result = await Promise.all(
    compiledFiles.map(async (filePath, index) => {
      const result = {
        fileName: targetFiles[index],
        html: await build(filePath, { ...options, out: outputPath })
      };

      if (showStats) {
        const bytes = Buffer.byteLength(result.html, 'utf8');
        const htmlSize = formatBytes(bytes);

        if (bytes > gmailByteLimit) largeCount += 1;

        log(`  ${result.fileName} → HTML: ${htmlSize}`);
      }

      return result;
    })
  );

  if (showStats && largeCount > 0)
    log(chalk`\n{yellow Warning:} ${largeCount} template(s) exceed the 102kb Gmail Clipping limit`);
  if (writeToFile) log(chalk`\n{green Build complete}. File(s) written to:`, outputPath);
  else log(chalk`\n{green Build complete}`);

  return result;
};

export const command: CommandFn = async (argv: BuildOptions, input) => {
  if (input.length < 1) return false;

  const [target] = input;

  if (!(await existsSync(target))) {
    error(chalk`{red The provided build target '${target}' does not exist}`);
    process.exit(1);
  }

  assert(argv, BuildOptionsStruct);

  await buildTemplates(target, argv);

  return true;
};
