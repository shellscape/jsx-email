import { existsSync } from 'node:fs';
import { mkdir, realpath, writeFile } from 'node:fs/promises';
import os from 'node:os';
import { dirname, basename, extname, join, resolve, win32, posix } from 'path';
import { pathToFileURL } from 'url';

import chalk from 'chalk';
import globby from 'globby';
import micromatch from 'micromatch';
import { isWindows } from 'std-env';
import type { Output as Infer } from 'valibot';
import { parse as assert, boolean, object, optional, string } from 'valibot';

import { log } from '../../log.js';
import { formatBytes, gmailByteLimit } from '../helpers.mjs';
import { compile } from '../../renderer/compile.js';
import { render } from '../../renderer/render.js';

import type { CommandFn, TemplateFn } from './types.mjs';

const BuildCommandOptionsStruct = object({
  exclude: optional(string()),
  inlineCss: optional(boolean()),
  minify: optional(boolean()),
  out: optional(string()),
  plain: optional(boolean()),
  pretty: optional(boolean()),
  props: optional(string()),
  silent: optional(boolean()),
  usePreviewProps: optional(boolean()),
  writeToFile: optional(boolean())
});

type BuildCommandOptions = Infer<typeof BuildCommandOptionsStruct>;

interface BuildCommandOptionsInternal extends BuildCommandOptions {
  showStats?: boolean;
}

interface BuildTemplateParams {
  buildOptions: BuildCommandOptionsInternal;
  targetPath: string;
}

interface BuildOptions {
  argv: BuildCommandOptions;
  outputBasePath?: string;
  path: string;
}

export interface BuildResult {
  compiledPath: string;
  html: string | null;
  metaPath?: string;
  plainText: string | null;
  templateName: string | null;
  writePath: string;
}

export const help = chalk`
{blue email build}

Builds a template and saves the result

{underline Usage}
  $ email build <template file or dir path> [...options]

{underline Options}
  --exclude     A micromatch glob pattern that specifies files to exclude from the build
  --inline-css  Inlines all CSS classes as style attributes on elements
  --minify      Minify the rendered template before saving
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
export const normalizePath = (filename: string) => filename.split(win32.sep).join(posix.sep);

export const getTempPath = async (type: 'build' | 'preview') => {
  const tmpdir = await realpath(os.tmpdir());
  const buildPath = join(tmpdir, `jsx-email/${type}`);

  return normalizePath(buildPath);
};

export const build = async (options: BuildOptions): Promise<BuildResult> => {
  const { argv, outputBasePath, path } = options;
  const { out, plain, props = '{}', usePreviewProps, writeToFile = true } = argv;
  const compiledPath = isWindows ? pathToFileURL(normalizePath(path)).toString() : path;
  const template = await import(compiledPath);
  // proper named export
  const componentExport: TemplateFn = template.Template;

  if (typeof componentExport !== 'function') {
    log.error(
      chalk`{red Template Export Problem:} ${path} doesn't have an export  of a JSX Element named \`Template\`. If you feel this is a bug, please open a new issue.`
    );
    process.exit(1);
  }

  const extension = plain ? '.txt' : '.html';
  const renderProps = usePreviewProps ? template.previewProps || {} : JSON.parse(props);
  const fileExt = extname(path);
  const templateName = basename(path, fileExt).replace(/-[^-]{8}$/, '');
  const component = componentExport(renderProps);
  const baseDir = dirname(path);
  const writePath = outputBasePath
    ? join(out!, baseDir.replace(outputBasePath, ''), templateName + extension)
    : join(out!, templateName + extension);

  await mkdir(dirname(writePath), { recursive: true });

  if (plain) {
    const plainText = await render(component, { plainText: plain });
    if (writeToFile) await writeFile(writePath, plainText, 'utf8');
    return { compiledPath, html: null, plainText, templateName: template.templateName, writePath };
  }

  const html = await render(component, argv as any);

  if (writeToFile) await writeFile(writePath, html, 'utf8');

  return {
    compiledPath,
    html,
    metaPath: compiledPath.replace(/(\.js)$/, '.meta.json'),
    plainText: null,
    templateName: template.templateName,
    writePath
  };
};

export const buildTemplates = async ({ targetPath, buildOptions }: BuildTemplateParams) => {
  const esbuildOutPath = await getTempPath('build');

  // Note: niave check that will probably get us into some edge cases
  const isFile = targetPath.endsWith('.tsx') || targetPath.endsWith('.jsx');
  const { exclude, out = '.rendered', showStats = true, silent, writeToFile = true } = buildOptions;
  const glob = isFile ? targetPath : join(targetPath, '**/*.{jsx,tsx}');
  const outputPath = resolve(out);
  let largeCount = 0;
  let targetFiles = await globby([normalizePath(glob)]);

  if (exclude) targetFiles = targetFiles.filter((path) => !micromatch.isMatch(path, exclude));

  if (!silent) {
    const suffix = targetFiles.length > 1 ? 's' : '';
    log.info(chalk`{cyan Found}`, targetFiles.length, `file${suffix}:`);
    log.info('  ', targetFiles.join('\n  '), '\n');
    log.info(chalk`{blue Starting build...}`);
  }

  const compiledFiles = await compile({
    files: targetFiles,
    outDir: esbuildOutPath,
    writeMeta: !buildOptions.plain
  });

  const result = await Promise.all(
    compiledFiles.map(async (filePath, index) => {
      const buildResult = await build({
        argv: { ...buildOptions, out: outputPath },
        outputBasePath: esbuildOutPath,
        path: filePath
      });
      const res = {
        fileName: targetFiles[index],
        ...buildResult
      };

      if (showStats) {
        const bytes = Buffer.byteLength(res.html ?? res.plainText!, 'utf8');
        const htmlSize = formatBytes(bytes);

        if (bytes > gmailByteLimit) largeCount += 1;

        log.info(`  ${res.fileName} → HTML: ${htmlSize}`);
      }

      return res;
    })
  );

  if (!silent) {
    if (showStats && largeCount > 0) {
      log.warn('');
      log.warn(chalk`${largeCount} template(s) exceed the 102kb Gmail Clipping limit`);
    }
    if (writeToFile) {
      log.info('');
      log.info(chalk`{green Build complete}. File(s) written to:`, outputPath);
    } else {
      log.info('');
      log.info(chalk`{green Build complete}`);
    }
  }

  return result;
};

export const command: CommandFn = async (argv: BuildCommandOptions, input) => {
  if (input.length < 1) return false;

  const [targetPath] = input;

  if (!existsSync(targetPath)) {
    log.error(chalk`{red The provided build target '${targetPath}' does not exist}`);
    process.exit(1);
  }

  assert(BuildCommandOptionsStruct, argv);

  await buildTemplates({ buildOptions: argv, targetPath });

  return true;
};
