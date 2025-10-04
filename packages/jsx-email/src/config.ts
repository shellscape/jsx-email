import { AssertionError } from 'assert';
import { isAbsolute, resolve as resolvePath } from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

import chalk from 'chalk';
import { lilconfig } from 'lilconfig';
import type { MethodFactoryLevels } from '@dot/log';

import { getPluginLog, log } from './log.js';
// @ts-ignore
import { pluginSymbol, type JsxEmailPlugin, type PluginInternal } from './plugins.js';
import type { ESBuildOptions, RenderOptions } from './types.js';

export interface JsxEmailConfig {
  esbuild?: ESBuildOptions;
  logLevel?: MethodFactoryLevels;
  plugins: JsxEmailPlugin[];
  render: RenderOptions;
}
export type JsxEmailConfigFn = () => Promise<Partial<JsxEmailConfig>>;
export type DefineConfigOptions = Partial<JsxEmailConfig> | JsxEmailConfigFn;

interface ConfigExports {
  config: Promise<JsxEmailConfig> | Partial<JsxEmailConfig>;
}

const configSymbol = Symbol.for('jsx-email/config');
const require = createRequire(import.meta.url);

const toImportSpecifier = (id: string): string => {
  if (id.startsWith('file://')) return id;
  if (isAbsolute(id)) return pathToFileURL(id).href;
  if (id.startsWith('.')) return pathToFileURL(resolvePath(id)).href;
  return id;
};
export const defaults: JsxEmailConfig = {
  logLevel: 'info',
  plugins: [],
  render: {
    disableDefaultStyle: false,
    inlineCss: false,
    minify: false,
    plainText: false,
    pretty: false
  }
};
export const globalConfigSymbol = Symbol.for('jsx-email/global/config');
export const current = (): JsxEmailConfig => {
  let curr = (globalThis as any)[globalConfigSymbol];

  // eslint-disable-next-line no-multi-assign
  if (!curr) curr = (globalThis as any)[globalConfigSymbol] = { ...defaults };

  return curr;
};

const plugins = {
  inline: '@jsx-email/plugin-inline',
  minify: '@jsx-email/plugin-minify',
  pretty: '@jsx-email/plugin-pretty'
};

const checkSymbol = (plugin: JsxEmailPlugin, source?: string) => {
  if (!plugin) return;

  const oops = `did not have the required 'symbol' property set correctly, and it can't be verified as a valid plugin`;
  const message = source
    ? chalk`{red jsx-email}: A plugin imported from '${source}' ${oops}`
    : chalk`{red jsx-email}: The plugin named '${plugin.name}' ${oops}`;

  if (plugin.symbol !== pluginSymbol) {
    log.error(message);
    throw new AssertionError({ message });
  }
};

const checkName = (plugin: JsxEmailPlugin, source?: string) => {
  if (!plugin) return;

  const oops = `did not have the required 'name' property`;
  const message = source
    ? chalk`{red jsx-email}: A plugin imported from '${source}' ${oops}`
    : chalk`{red jsx-email}: A plugin added to the config ${oops}`;

  if (!plugin.name) {
    log.error(message);
    process.exit(1);
  }
};

interface PluginImport {
  plugin: JsxEmailPlugin;
}

const handleImportError = (error: any, name: string) => {
  if (error.code === 'ERR_MODULE_NOT_FOUND') {
    log.error(chalk`{red jsx-email}: Tried to import plugin '${name}' but it wasn't found`);
  } else {
    log.error(error);
  }
};

// Note: We have to be verbose here so that bundlers pick up on the imports.
// Most of them can't handle dynamically importing these plugins from variables containing
// their names without additional config, and we don't want that burden on users
const importInlinePlugin = async () => {
  try {
    // Note: tshy up to bullshit again with compile errors where there are none
    // @ts-ignore
    const { plugin } = (await import('@jsx-email/plugin-inline')) as unknown as PluginImport;
    return plugin;
  } catch (error) {
    handleImportError(error, '@jsx-email/plugin-inline');
  }

  return null;
};

const importMinifyPlugin = async () => {
  try {
    // @ts-ignore
    const { plugin } = (await import('@jsx-email/plugin-minify')) as unknown as PluginImport;
    return plugin;
  } catch (error) {
    handleImportError(error, '@jsx-email/plugin-minify');
  }

  return null;
};

const importPrettyPlugin = async () => {
  try {
    // @ts-ignore
    const { plugin } = (await import('@jsx-email/plugin-pretty')) as unknown as PluginImport;
    return plugin;
  } catch (error) {
    handleImportError(error, '@jsx-email/plugin-pretty');
  }

  return null;
};

export const defineConfig = async (config: DefineConfigOptions = {}): Promise<JsxEmailConfig> => {
  if (typeof config === 'function') {
    const intermediate = await config();
    return defineConfig(intermediate);
  }

  const mods = structuredClone(defaults);

  if (!config.render?.plainText) {
    // Note: The order of plugins here actually matters for how the doc gets
    // transformed. Changing this ordering may produce undesirable html
    if (config.render?.inlineCss) {
      const inline = await importInlinePlugin();
      if (inline) mods.plugins.push(inline);
    }

    if (config.render?.minify) {
      const minify = await importMinifyPlugin();
      if (minify) mods.plugins.push(minify);
    }

    if (config.render?.pretty) {
      const pretty = await importPrettyPlugin();
      if (pretty) mods.plugins.push(pretty);
    }

    if (config.render?.minify && config.render.pretty) {
      log.warn(
        chalk`{yellow jsx-email}: Both minify and pretty options are true. Please choose only one.`
      );
    }
    if ((config.render?.minify || config.render?.pretty) && config.render?.plainText) {
      log.warn(
        chalk`{yellow jsx-email}: plaintText has been enabled, minify and pretty will have no effect.`
      );

      mods.plugins = mods.plugins.filter(
        ({ name }) => name !== plugins.minify && name !== plugins.pretty
      );
    }
  }

  const result = await mergeConfig(mods, config);
  const pluginMap = new Map<string, JsxEmailPlugin>();

  // Note: make sure we don't have duplicate plugins
  for (const plugin of result.plugins || []) pluginMap.set(plugin.name, plugin);

  result.plugins = Array.from(pluginMap, ([, value]) => value);

  for (const plugin of result.plugins || []) {
    checkName(plugin);
    checkSymbol(plugin);
    (plugin as PluginInternal).log = getPluginLog(plugin.name);
  }

  (result as any).symbol = configSymbol;

  return result;
};

const moduleImport = async (id: string) => {
  const specifier = toImportSpecifier(id);

  try {
    const mod = await import(specifier);
    return mod;
  } catch (e) {
    try {
      return require(id);
    } catch (error) {
      if (
        (error as any).code === 'ERR_REQUIRE_ESM' ||
        (error instanceof SyntaxError &&
          error.toString().includes('Cannot use import statement outside a module'))
      ) {
        throw e;
      }
      throw error;
    }
  }
};

export const loadConfig = async (startDir?: string): Promise<JsxEmailConfig> => {
  if ((globalThis as any)[globalConfigSymbol]) return (globalThis as any)[globalConfigSymbol];

  const name = 'jsx-email';
  const searchResult = await lilconfig(name, {
    loaders: {
      '.cjs': moduleImport,
      '.js': moduleImport,
      '.mjs': moduleImport
    },
    searchPlaces: [
      `.config/${name}rc.js`,
      `.config/${name}rc.cjs`,
      `.config/${name}rc.mjs`,
      `.config/${name}.config.js`,
      `.config/${name}.config.cjs`,
      `.config/${name}.config.mjs`,
      `.${name}rc.js`,
      `.${name}rc.cjs`,
      `.${name}rc.mjs`,
      `${name}.config.js`,
      `${name}.config.cjs`,
      `${name}.config.mjs`
    ]
  }).search(startDir);

  log.debug('loadConfig →', { cwd: process.cwd(), searchResult, startDir });

  const configExports: ConfigExports = searchResult?.config ?? {};
  const intermediate =
    configExports.config instanceof Promise ? await configExports.config : configExports.config;
  const config = intermediate ?? { ...defaults };

  if ((config as any).symbol === configSymbol) {
    (globalThis as any)[globalConfigSymbol] = config;
    return config as JsxEmailConfig;
  }

  const definedConfig = await defineConfig(config);

  process.env.DOT_LOG_LEVEL = definedConfig.logLevel || 'info';

  setConfig(definedConfig);

  return definedConfig;
};

export const setConfig = (config: JsxEmailConfig) =>
  ((globalThis as any)[globalConfigSymbol] = config);

// Note: This helps avoid issues with `merge ` because it uses structuredClone and doesn't play nice
// with complex objects'
// Keeping this async in case we need it for the future
export const mergeConfig = async (a: Partial<JsxEmailConfig>, b: Partial<JsxEmailConfig>) => {
  const aPlugins = a.plugins || [];
  const bPlugins = b.plugins || [];

  /* eslint-disable no-param-reassign */
  delete (a as any).plugins;
  delete (b as any).plugins;

  const result = {
    ...a,
    ...b,
    plugins: [...aPlugins, ...bPlugins],
    render: { ...a.render, ...b.render }
  } as JsxEmailConfig;

  return result;
};
