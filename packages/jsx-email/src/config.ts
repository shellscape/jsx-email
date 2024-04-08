import chalk from 'chalk';
import { lilconfig } from 'lilconfig';

import { pluginSymbol, type JsxEmailPlugin, type RenderOptions } from './types';

export interface JsxEmailConfig {
  plugins: JsxEmailPlugin[];
  render: RenderOptions;
}
export type AnyPluginConfig = JsxEmailConfig & {
  plugins: Array<JsxEmailPlugin | string>;
};
export type JsxEmailConfigFn = () => Promise<Partial<AnyPluginConfig>>;
export type DefinedConfig = Partial<AnyPluginConfig> | JsxEmailConfigFn;

const { error, warn } = console;
const configSymbol = Symbol.for('jsx-email/config');
export const defaults: AnyPluginConfig = {
  plugins: [],
  render: { disableDefaultStyle: false, minify: false, plainText: false, pretty: false }
};
export const globalConfigSymbol = Symbol.for('jsx-email/global/config');
export const current: JsxEmailConfig = (globalThis as any)[globalConfigSymbol];

const plugins = {
  inline: '@jsx-email/plugin-inline',
  minify: '@jsx-email/plugin-minify',
  pretty: '@jsx-email/plugin-pretty',
  style: '@jsx-email/plugin-style'
};

const checkSymbol = (plugin: JsxEmailPlugin, source?: string) => {
  const oops = `did not have the required 'symbol' property set correctly, and it can't be verified as a valid plugin`;
  const message = source
    ? chalk`{red jsx-email}: A plugin imported from '${source}' ${oops}`
    : chalk`{red jsx-email}: The plugin named '${plugin.name}' ${oops}`;

  if (plugin.symbol !== pluginSymbol) error(message);

  process.exit(1);
};

const checkName = (plugin: JsxEmailPlugin, source?: string) => {
  const oops = `did not have the required 'name' property`;
  const message = source
    ? chalk`{red jsx-email}: A plugin imported from '${source}' ${oops}`
    : chalk`{red jsx-email}: A plugin added to the config ${oops}`;

  if (!plugin.name) error(message);

  process.exit(1);
};

export const defineConfig = async (config: DefinedConfig): Promise<JsxEmailConfig> => {
  if (typeof config === 'function') {
    const intermediate = await config();
    return defineConfig(intermediate);
  }

  const { default: merge } = await import('defaults');
  const mods = structuredClone(defaults);

  if (!config.render?.plainText) {
    // Note: The order of plugins here actually matters for how the doc gets
    // transformed. Changing this ordering may produce undesirable html
    mods.plugins.push(plugins.style, plugins.inline);

    if (config.render?.minify) mods.plugins.push(plugins.minify);
    if (config.render?.pretty) mods.plugins.push(plugins.pretty);
    if (config.render?.minify && config.render.pretty) {
      warn(
        chalk`{yellow jsx-email}: Both minify and pretty options are true. Please choose only one.`
      );
    }
    if ((config.render?.minify || config.render?.pretty) && config.render?.plainText) {
      warn(
        chalk`{yellow jsx-email}: plaintText has been enabled, minify and pretty will have no effect.`
      );

      mods.plugins = mods.plugins.filter(
        (plugin) =>
          (plugin as unknown as string) !== plugins.minify &&
          (plugin as unknown as string) !== plugins.pretty
      );
    }
  }

  const result = merge(config, mods as any) as JsxEmailConfig;
  const pairs = await Promise.all(
    result.plugins.map<Promise<[string, JsxEmailPlugin]>>(async (plugin) => {
      let assumed: JsxEmailPlugin = plugin as any;

      if (typeof plugin === 'string') {
        try {
          const { plugin: imports } = (await import(plugin)) as { plugin: JsxEmailPlugin };
          assumed = imports;

          checkSymbol(assumed, plugin);
          checkName(assumed, plugin);

          if (!assumed.name) {
            error(
              chalk`{red jsx-email}: A plugin imported from '${plugin}' did not have the required 'name' property`
            );
          }

          process.exit(1);
        } catch (err) {
          error(
            chalk`{red jsx-email}: Tried to import a plugin from '${plugin}' but it wasn't found`
          );
          process.exit(1);
        }
      } else {
        checkSymbol(assumed);
        checkName(assumed);
      }

      return [assumed.name, assumed];
    })
  );

  result.plugins = [...new Map(pairs.filter(Boolean)).values()];
  (result as any).symbol = configSymbol;

  return result;
};

export const loadConfig = async (): Promise<JsxEmailConfig> => {
  if ((globalThis as any)[globalConfigSymbol]) return (globalThis as any)[globalConfigSymbol];

  const result = await lilconfig('jsx-email').search();
  const { config } = result || {};

  if (config.symbol === configSymbol) {
    (globalThis as any)[globalConfigSymbol] = config;
    return config;
  }

  (globalThis as any)[globalConfigSymbol] = await defineConfig(config);

  return (globalThis as any)[globalConfigSymbol];
};
