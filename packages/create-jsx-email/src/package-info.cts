// Note: This is a workaround due to Node v20 and Node v22 having different
// import assertions. `with 'json'` vs `assert 'json'`

// eslint-disable-next-line
const pkg = require('../package.json') as {
  description: string;
  engines: { node: string };
  name: string;
  peerDependencies: Record<string, string>;
  version: string;
};

export const { description, engines, name, peerDependencies, version } = pkg;
