import { readFile, writeFile } from 'node:fs/promises';

import chalk from 'chalk';
import prettyBytes from 'pretty-bytes';

import { buildTemplates, normalizePath, type BuildTempatesResult } from './commands/build.mjs';

export { originalCwd } from '../helpers.js';

interface BuildForPreviewParams {
  buildPath: string;
  exclude?: string;
  quiet?: boolean;
  targetPath: string;
}

// Note: This should match the same declaration in @jsx-email/app-preview
interface PreviewDataContent {
  html: string;
  plain: string;
  source: string;
  sourceFile: string;
  sourcePath: string;
  templateName: string;
}

// 102kb
export const gmailByteLimit = 102e3;
export const gmailBytesSafe = 102e3 - 20e3;

export const buildForPreview = async ({
  buildPath,
  exclude,
  quiet = false,
  targetPath
}: BuildForPreviewParams) => {
  const files = await buildTemplates({
    buildOptions: {
      exclude,
      minify: false,
      out: buildPath,
      plain: true,
      pretty: true,
      showStats: false,
      silent: quiet,
      usePreviewProps: true,
      writeToFile: false
    },
    targetPath
  });

  return files;
};

export const formatBytes = (bytes: number) => {
  const pretty = prettyBytes(bytes);

  if (bytes > gmailByteLimit) return chalk.red(pretty);
  else if (bytes > gmailBytesSafe - 20e3) return chalk.red(pretty);

  return chalk.green(pretty);
};

export const writePreviewDataFiles = async (files: BuildTempatesResult[]) => {
  const writes = files.map(async (file) => {
    const content = JSON.stringify(
      {
        html: file.html,
        plain: file.plainText,
        source: await readFile(normalizePath(file.fileName), 'utf8'),
        sourceFile: file.sourceFile,
        sourcePath: file.fileName,
        templateName: file.templateName
      } as PreviewDataContent,
      null,
      2
    );
    const code = `export default ${content};`;
    await writeFile(`${file.writePathBase}.js`, code, 'utf8');
  });

  await Promise.all(writes);
};
