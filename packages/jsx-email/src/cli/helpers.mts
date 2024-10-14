import chalk from 'chalk';
import prettyBytes from 'pretty-bytes';

import { buildTemplates } from './commands/build.mjs';

interface BuildForPreviewParams {
  buildPath: string;
  exclude?: string;
  quiet?: boolean;
  targetPath: string;
}

// 102kb
export const gmailByteLimit = 102e3;
export const gmailBytesSafe = 102e3 - 20e3;

// Note: after server start we change the root directory to trick vite
export const originalCwd = process.cwd();

export const buildForPreview = async ({
  buildPath,
  exclude,
  quiet = false,
  targetPath
}: BuildForPreviewParams) => {
  const htmlBuild = buildTemplates({
    buildOptions: {
      exclude,
      minify: false,
      out: buildPath,
      pretty: true,
      showStats: !quiet,
      silent: quiet,
      usePreviewProps: true
    },
    targetPath
  });

  const plainBuild = buildTemplates({
    buildOptions: {
      exclude,
      minify: false,
      out: buildPath,
      plain: true,
      pretty: true,
      showStats: false,
      silent: true,
      usePreviewProps: true
    },
    targetPath
  });

  const [htmlFiles] = await Promise.all([htmlBuild, plainBuild]);

  return htmlFiles;
};

export const formatBytes = (bytes: number) => {
  const pretty = prettyBytes(bytes);

  if (bytes > gmailByteLimit) return chalk.red(pretty);
  else if (bytes > gmailBytesSafe - 20e3) return chalk.red(pretty);

  return chalk.green(pretty);
};
