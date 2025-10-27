import type { MethodFactoryLevels } from '@dot/log';
import { type JsxEmailPlugin } from './plugins.js';
import type { ESBuildOptions, RenderOptions } from './types.js';
export interface JsxEmailConfig {
    esbuild?: ESBuildOptions;
    logLevel?: MethodFactoryLevels;
    plugins: JsxEmailPlugin[];
    render: RenderOptions;
}
export type JsxEmailConfigFn = () => Promise<Partial<JsxEmailConfig>>;
export type DefineConfigOptions = Partial<JsxEmailConfig> | JsxEmailConfigFn;
export declare const defaults: JsxEmailConfig;
export declare const globalConfigSymbol: unique symbol;
export declare const current: () => JsxEmailConfig;
export declare const defineConfig: (config?: DefineConfigOptions) => Promise<JsxEmailConfig>;
export declare const loadConfig: (startDir?: string) => Promise<JsxEmailConfig>;
export declare const setConfig: (config: JsxEmailConfig) => JsxEmailConfig;
export declare const mergeConfig: (a: Partial<JsxEmailConfig>, b: Partial<JsxEmailConfig>) => Promise<JsxEmailConfig>;
//# sourceMappingURL=config.d.ts.map