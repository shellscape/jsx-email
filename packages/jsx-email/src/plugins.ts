import chalk from 'chalk';
import sourceMapSupport from 'source-map-support';
// @ts-ignore
import type { Plugin, Preset, Processor } from 'unified';

import type { JsxEmailConfig } from './config.js';

sourceMapSupport.install();

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

interface CallHookArgs {
  config: JsxEmailConfig;
  hookType: HookType;
  html: string;
}

interface CallProcessHookArgs {
  config: JsxEmailConfig;
  processor: Processor<any, any, any, any, any>;
}

export const callHook = async ({ config, hookType, html }: CallHookArgs) => {
  for (const plugin of config.plugins as PluginInternal[]) {
    const { log } = plugin;
    const hookFn = plugin[hookType];
    // eslint-disable-next-line no-await-in-loop, no-param-reassign
    if (hookFn) html = await hookFn({ chalk, html, log });
  }

  return html;
};

export const callProcessHook = async ({ config, processor }: CallProcessHookArgs) => {
  for (const { log, process } of config.plugins as PluginInternal[]) {
    if (process) {
      // eslint-disable-next-line no-await-in-loop
      const pluggable = await process({ chalk, log });
      processor.use(pluggable as any);
    }
  }
};
