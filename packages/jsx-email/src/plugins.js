import chalk from 'chalk';
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
export const pluginSymbol = Symbol.for('jsx-email/plugin');
export const callHook = async ({ config, hookType, html }) => {
    for (const plugin of config.plugins) {
        const { log } = plugin;
        const hookFn = plugin[hookType];
        // eslint-disable-next-line no-await-in-loop, no-param-reassign
        if (hookFn)
            html = await hookFn({ chalk, html, log });
    }
    return html;
};
export const callProcessHook = async ({ config, processor }) => {
    for (const { log, process } of config.plugins) {
        if (process) {
            // eslint-disable-next-line no-await-in-loop
            const pluggable = await process({ chalk, log });
            processor.use(pluggable);
        }
    }
};
//# sourceMappingURL=plugins.js.map