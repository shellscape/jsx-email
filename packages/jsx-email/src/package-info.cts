// eslint-disable-next-line
const pkg = require('../package.json') as {
  engines: { node: string };
  name: string;
  peerDependencies: Record<string, string>;
  version: string;
};

export const { engines, name, peerDependencies, version } = pkg;
