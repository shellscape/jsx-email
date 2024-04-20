import 'source-map-support/register';

import chalk from 'chalk';
import type { Plugin, Preset, Processor } from 'unified';

import { loadConfig } from './config';

export interface RenderHookParams {
  chalk: typeof chalk;
  html: string;
  log: any;
}

export interface ProcessHookParams {
  chalk: typeof chalk;
  log: any;
}

export type RenderHookFn = (params: RenderHookParams) => string | Promise<string>;
export type ProcessHookFn = (
  params: ProcessHookParams
) => Plugin | Preset | Promise<Plugin> | Promise<Preset>;

export const pluginSymbol = Symbol.for('jsx-email/plugin');

export interface JsxEmailPlugin {
  afterRender?: RenderHookFn;
  beforeRender?: RenderHookFn;
  name: string;
  process?: ProcessHookFn;
  symbol: typeof pluginSymbol;
}

/** @desc Internal use only */
export interface PluginInternal extends JsxEmailPlugin {
  log: any;
}

type HookType = 'afterRender' | 'beforeRender';

export const callHook = async (hookType: HookType, html: string) => {
  const config = await loadConfig();

  for (const plugin of config.plugins as PluginInternal[]) {
    const { log } = plugin;
    const hookFn = plugin[hookType];
    // eslint-disable-next-line no-await-in-loop, no-param-reassign
    if (hookFn) html = await hookFn({ chalk, html, log });
  }

  return html;
};

export const callProcessHook = async (processor: Processor<any, any, any, any, any>) => {
  const config = await loadConfig();

  for (const { log, process } of config.plugins as PluginInternal[]) {
    if (process) {
      // eslint-disable-next-line no-await-in-loop
      const pluggable = await process({ chalk, log });
      processor.use(pluggable as any);
    }
  }
};
