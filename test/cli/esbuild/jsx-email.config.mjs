import { defineConfig } from 'jsx-email/config';

const { info } = console;

const testPlugin = {
  name: 'test',
  setup() {
    info('ESBUILD PLUGIN CONFIG TEST');
  }
};

const conf = {
  esbuild: {
    plugins: [testPlugin]
  },
  render: { minify: true }
};

export const config = defineConfig(conf);
