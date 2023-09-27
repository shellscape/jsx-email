// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    watch: false
  }
});
