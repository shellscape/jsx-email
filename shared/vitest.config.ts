import { basename, dirname, join } from 'path';

// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  test: {
    // environment: 'happy-dom',
    globals: true,
    resolveSnapshotPath: (testPath: string, snapExtension: string) =>
      join(dirname(testPath), '.snapshots', basename(testPath) + snapExtension),
    watch: false
  }
});
