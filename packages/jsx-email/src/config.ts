import chalk from 'chalk';
import { lilconfig } from 'lilconfig';
import type { MethodFactoryLevels } from 'loglevelnext';

import { getPluginLog, log } from './log';
import { pluginSymbol, type JsxEmailPlugin, type PluginInternal } from './plugins';
import type { RenderOptions } from './types';

export interface JsxEmailConfig {
  logLevel?: MethodFactoryLevels;
  plugins: JsxEmailPlugin[];
  render: RenderOptions;
}
export type JsxEmailConfigFn = () => Promise<Partial<JsxEmailConfig>>;
export type DefineConfigOptions = Partial<JsxEmailConfig> | JsxEmailConfigFn;

const configSymbol = Symbol.for('jsx-email/config');
export const defaults: JsxEmailConfig = {
  logLevel: 'info',
  plugins: [],
  render: { disableDefaultStyle: false, minify: false, plainText: false, pretty: false }
};
export const globalConfigSymbol = Symbol.for('jsx-email/global/config');
export const current: JsxEmailConfig = (globalThis as any)[globalConfigSymbol];

const plugins = {
  inline: '@jsx-email/plugin-inline',
  minify: '@jsx-email/plugin-minify',
  pretty: '@jsx-email/plugin-pretty'
};

const checkSymbol = (plugin: JsxEmailPlugin, source?: string) => {
  const oops = `did not have the required 'symbol' property set correctly, and it can't be verified as a valid plugin`;
  const message = source
    ? chalk`{red jsx-email}: A plugin imported from '${source}' ${oops}`
    : chalk`{red jsx-email}: The plugin named '${plugin.name}' ${oops}`;

  if (plugin.symbol !== pluginSymbol) log.error(message);

  process.exit(1);
};

const checkName = (plugin: JsxEmailPlugin, source?: string) => {
  const oops = `did not have the required 'name' property`;
  const message = source
    ? chalk`{red jsx-email}: A plugin imported from '${source}' ${oops}`
    : chalk`{red jsx-email}: A plugin added to the config ${oops}`;

  if (!plugin.name) log.error(message);

  process.exit(1);
};

const importPlugin = async (name: string) => {
  try {
    const { plugin } = (await import(name)) as { plugin: JsxEmailPlugin };

    checkSymbol(plugin, name);
    checkName(plugin, name);

    return plugin;
  } catch (_) {
    log.error(chalk`{red jsx-email}: Tried to import a plugin '${name}' but it wasn't found`);
  }

  return null;
};

export const defineConfig = async (config: DefineConfigOptions): Promise<JsxEmailConfig> => {
  if (typeof config === 'function') {
    const intermediate = await config();
    return defineConfig(intermediate);
  }

  const { default: merge } = await import('defaults');
  const mods = structuredClone(defaults);

  if (!config.render?.plainText) {
    // Note: The order of plugins here actually matters for how the doc gets
    // transformed. Changing this ordering may produce undesirable html
    const inline = await importPlugin(plugins.inline);
    if (inline) mods.plugins.push(inline);

    if (config.render?.minify) {
      const minify = await importPlugin(plugins.minify);
      if (minify) mods.plugins.push(minify);
    }

    if (config.render?.pretty) {
      const pretty = await importPlugin(plugins.minify);
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

  const result = merge(config, mods as any) as JsxEmailConfig;

  for (const plugin of result.plugins) {
    (plugin as PluginInternal).log = getPluginLog(plugin.name);
  }

  (result as any).symbol = configSymbol;

  return result;
};

export const loadConfig = async (): Promise<JsxEmailConfig> => {
  if ((globalThis as any)[globalConfigSymbol]) return (globalThis as any)[globalConfigSymbol];

  const name = 'jsx-email';
  const result = await lilconfig(name, {
    searchPlaces: [
      `.${name}rc.js`,
      `.${name}rc.cjs`,
      `.${name}rc.mjs`,
      `.config/${name}rc.js`,
      `.config/${name}rc.cjs`,
      `.config/${name}rc.mjs`,
      `${name}.config.js`,
      `${name}.config.cjs`,
      `${name}.config.mjs`
    ]
  }).search();
  const { config: exports } = result || {};
  const { config } = exports || {};

  if (config.symbol === configSymbol) {
    (globalThis as any)[globalConfigSymbol] = config;
    return config;
  }

  const definedConfig = await defineConfig(config);

  process.env.DOT_LOG_LEVEL = definedConfig.logLevel || 'info';

  (globalThis as any)[globalConfigSymbol] = definedConfig;

  return definedConfig;
};
