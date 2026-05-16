import { describe, expect, it } from 'vitest';

import { isChildPath, isNodeModulePath, normalizeWatcherPath } from '../../src/cli/watcher.js';

describe('watcher path helpers', () => {
  it('detects POSIX node_modules paths', () => {
    expect(isNodeModulePath('/repo/node_modules/pkg/file.js')).toBe(true);
  });

  it('detects Windows node_modules paths', () => {
    expect(isNodeModulePath('C:\\repo\\node_modules\\pkg\\file.js')).toBe(true);
  });

  it('does not match node_modules as part of another path segment', () => {
    expect(isNodeModulePath('/repo/not_node_modules/pkg/file.js')).toBe(false);
  });

  it('normalizes Windows drive paths for watcher lookups', () => {
    expect(normalizeWatcherPath('C:\\Repo\\Templates\\Base.tsx')).toBe(
      'c:/repo/templates/base.tsx'
    );
  });

  it('normalizes Windows UNC paths for watcher lookups', () => {
    expect(normalizeWatcherPath('\\\\Server\\Share\\Templates\\Base.tsx')).toBe(
      '//server/share/templates/base.tsx'
    );
  });

  it('preserves POSIX path casing for watcher lookups', () => {
    expect(normalizeWatcherPath('/Repo/Templates/Base.tsx')).toBe('/Repo/Templates/Base.tsx');
  });

  it('detects child paths', () => {
    expect(isChildPath('/repo/templates', '/repo/templates/nested')).toBe(true);
  });

  it('does not treat sibling directories that start with two dots as child paths', () => {
    expect(isChildPath('/repo/templates', '/repo/..templates')).toBe(false);
  });

  it('does not treat Windows cross-drive paths as child paths', () => {
    expect(isChildPath('C:\\repo\\templates', 'D:\\repo\\templates\\nested')).toBe(false);
  });
});
