import { mergeConfig, defineConfig } from 'vitest/config';

import sharedConfig from '../../shared/vitest.config';

// eslint-disable-next-line import/no-default-export
export default mergeConfig(
  sharedConfig,
  defineConfig({
    test: {
      environment: 'happy-dom'
    }
  })
);
