// import childProcess from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
// import { promisify } from 'node:util';

// import { getDeps } from '@jsx-email/app-preview';
import react from '@vitejs/plugin-react';
// import { findUp } from 'find-up';
import { createLogger, defineConfig } from 'vite';
// import { nodePolyfills } from 'vite-plugin-node-polyfills';
// import tsconfigPaths from 'vite-tsconfig-paths';

// @ts-ignore
// eslint-disable-next-line
import hypothetical from 'rollup-plugin-hypothetical';

// const exec = promisify(childProcess.exec);
const logger = createLogger();
const { warnOnce: og } = logger;

logger.warnOnce = (message, options) => {
  // Note: ignore `Sourcemap for "${file}" points to missing source files` errors
  if (message.includes('points to missing source files')) return;
  og(message, options);
};

// const getGitRoot = async () => {
//   let isGit = true;

//   try {
//     await exec('git rev-parse --is-inside-work-tree');
//   } catch (_) {
//     isGit = false;
//   }

//   if (isGit) {
//     try {
//       const { stdout: root } = await exec('git rev-parse --show-toplevel');
//       return root;
//     } catch (_) {
//       // no-op
//     }
//   }

//   return process.cwd();
// };

// Note: This prepares a `define` object to inject all of the process' envars into vite. Vite is weird
// in that it limits envars to those with a VITE_ prefix, but that's not a behavior that we need or
// want for shipping vite as a wrapped dev server
// const envDefine = Object.keys(process.env)
//   .sort()
//   .reduce((agg, key) => {
//     agg[`process.env.${key}`] = JSON.stringify(process.env[key]);
//     return agg;
//   }, {} as Record<string, string | null>);
// const previewDeps = getDeps();

export const getViteConfig = async (_templatesPath: string) => {
  const root = join(dirname(fileURLToPath(import.meta.resolve('@jsx-email/app-preview'))), 'app');

  process.chdir(root);

  // const gitRoot = await getGitRoot();
  // const foundRoot = await findUp(['jsconfig.json', 'tsconfig.json'], {
  //   cwd: templatesPath,
  //   stopAt: gitRoot
  // });
  // const tsConfigRoot = foundRoot ? dirname(foundRoot) : void 0;

  return defineConfig({
    clearScreen: false,
    customLogger: logger,
    // define: {
    //   'process.env': 'import.meta.env',
    //   // Note: vite appears to use a bottom-up (or reverse) strategy for applying defines. If the
    //   // spread below is before the `process.env` define above, all of the keys we've defined in
    //   // `envDefine` are replaced with an `import.meta.env` prefix, and thus don't work
    //   ...envDefine
    // },
    // optimizeDeps: {
    //   // Note: These are all CommonJS dependencies that don't implement an ESM compatible exports
    //   // strategy. Any packages which throws "does not provide an export named 'default'" needs to go
    //   // here.
    //   include: [
    //     '@jridgewell/sourcemap-codec',
    //     'balanced-match',
    //     'classnames',
    //     'debug',
    //     'deepmerge',
    //     'escape-string-regexp',
    //     'extend',
    //     'parse5',
    //     'pretty',
    //     'react-dom',
    //     'react-dom/client',
    //     'source-map-js',
    //     ...previewDeps
    //   ]
    // },
    plugins: [
      // tsconfigPaths({ loose: true, root: tsConfigRoot }),
      // hypothetical({
      //   allowFallthrough: true,
      //   files: {
      //     'rehype-preset-minify/': `export default {};`
      //   }
      // }),
      // nodePolyfills({
      //   globals: {
      //     Buffer: true
      //   }
      // }),
      react()
    ],
    // resolve: {
    //   alias: {
    //     'node:fs/promises': 'node-stdlib-browser/mock/empty',
    //     path: 'path-browserify',
    //     postcss: 'https://jspm.dev/postcss@8.4.31',
    //     rehype: 'https://jspm.dev/rehype@13.0.1',
    //     'rehype-stringify': 'https://jspm.dev/rehype-stringify@10.0.0',
    //     'unist-util-visit': 'https://jspm.dev/unist-util-visit@5.0.0'
    //   }
    // },
    root
  });
};
