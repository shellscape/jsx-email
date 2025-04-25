#!/usr/bin/env -S node --enable-source-maps --no-warnings=ExperimentalWarning

const { error: danger } = console;

const checkEngine = async () => {
  const { engines, name } = await import('./dist/package-info.cjs');
  const minRange = engines.node;
  const version = process.versions.node;
  const major = parseInt(version) || 0;

  if (major >= 22) return;

  const semver = await import('semver');

  if (semver.satisfies(version, minRange)) return;

  danger(`\
Node.js v${process.versions.node} is not supported by ${name}!
Please upgrade Node.js to a supported version: ${engines}\n`);

  process.exit(1);
};

(async () => {
  await checkEngine();
  const { run } = await import('./dist/cli/index.js');
  return run();
})()
  .then(() => process.exit(0))
  .catch((error) => {
    danger(error);
    process.exit(1);
  });
