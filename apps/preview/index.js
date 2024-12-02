const pkg = require('./package.json');

const getDeps = () => pkg.optimizeDeps;

module.exports = { getDeps, version: pkg.version };
