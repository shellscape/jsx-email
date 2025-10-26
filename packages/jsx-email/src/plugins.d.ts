import chalk from 'chalk';
import type { Plugin, Preset, Processor } from 'unified';
import type { JsxEmailConfig } from './config.js';
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
export type ProcessHookFn = (params: ProcessHookParams) => Plugin | Preset | Promise<Plugin> | Promise<Preset>;
export declare const pluginSymbol: unique symbol;
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
export declare const callHook: ({ config, hookType, html }: CallHookArgs) => Promise<string>;
export declare const callProcessHook: ({ config, processor }: CallProcessHookArgs) => Promise<void>;
export {};
//# sourceMappingURL=plugins.d.ts.map