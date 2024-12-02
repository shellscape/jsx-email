// eslint-disable-next-line
const pkg = require('../package.json') as {
  name: string;
  peerDependencies: Record<string, string>;
  version: string;
};

export const { name, peerDependencies, version } = pkg;
