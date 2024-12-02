import micromatch from 'micromatch';
// Note: another tshy problem https://github.com/isaacs/tshy/issues/96
// @ts-ignore
import type { PluginOption, ViteDevServer } from 'vite';

import { normalizePath } from './commands/build.mjs';

interface ViteReloadOptions {
  globs: string[];
}

export const reloadPlugin = (options: ViteReloadOptions): PluginOption => {
  const globs = options.globs.map((path) => normalizePath(path));
  let timer: number | undefined;

  return {
    apply: 'serve',
    // Note: and yet another tshy problem
    // @ts-ignore
    config({ server }) {
      /* eslint-disable no-param-reassign */
      if (!server) server = {};
      if (!server.watch) server.watch = {};
      server.watch.disableGlobbing = false;
    },
    async configureServer(server: ViteDevServer) {
      server.watcher.add([...globs]);
      server.watcher.on('create', (file) => {
        if (micromatch.isMatch(file, globs)) {
          clearTimeout(timer);
          timer = setTimeout(() => {
            server.ws.send({ type: 'full-reload' });
          }, 500) as any as number;
        }
      });
    },
    // Note: another tshy problem https://github.com/isaacs/tshy/issues/96
    // @ts-ignore
    name: 'jsx-email-reload'
  };
};
