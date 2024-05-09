import chalk from 'chalk';
import prettyBytes from 'pretty-bytes';

// 102kb
export const gmailByteLimit = 102e3;
export const gmailBytesSafe = 102e3 - 20e3;

export const formatBytes = (bytes: number) => {
  const pretty = prettyBytes(bytes);

  if (bytes > gmailByteLimit) return chalk.red(pretty);
  else if (bytes > gmailBytesSafe - 20e3) return chalk.red(pretty);

  return chalk.green(pretty);
};
