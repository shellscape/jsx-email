import { describe, expect, it } from 'vitest';

import { isNodeModulePath } from '../../src/cli/watcher.js';

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
});
