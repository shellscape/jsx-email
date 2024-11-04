// Note: This is a workaround for Node v18 and Node v20 having different import assertion formats
// eslint-disable-next-line
const pkg = require('../package.json') as { description: string; name: string; version: string };

export const { description, name, version } = pkg;
