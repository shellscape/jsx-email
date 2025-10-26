import { readFile, writeFile } from 'node:fs/promises';
import { dirname, basename, extname, join, resolve } from 'path';
import esbuild from 'esbuild';
import { loadConfig } from '../config.js';
import { log } from '../log.js';
// Note: after server start we change the root directory to trick vite
const originalCwd = process.cwd();
const cssPlugin = {
    name: 'jsx-email/css-plugin',
    setup(builder) {
        builder.onLoad({ filter: /\.css$/ }, async (args) => {
            const buffer = await readFile(args.path);
            const css = await esbuild.transform(buffer, { loader: 'css', minify: false });
            return { contents: css.code, loader: 'text' };
        });
    }
};
/**
 * @desc Compiles a JSX/TSX template file using esbuild
 * @param options CompileOptions
 * @returns Promise<CompileResult[]> An array of files affected by the compilation
 */
export const compile = async (options) => {
    const config = await loadConfig();
    const { files, hashFiles = true, outDir, writeMeta = false } = options;
    const { metafile } = await esbuild.build({
        bundle: true,
        define: {
            'import.meta.isJsxEmailPreview': JSON.stringify(globalThis.isJsxEmailPreview || false)
        },
        entryNames: hashFiles ? '[dir]/[name]-[hash]' : '[dir]/[name]',
        entryPoints: files,
        jsx: 'automatic',
        logLevel: 'error',
        metafile: true,
        outdir: outDir,
        platform: 'node',
        plugins: [cssPlugin],
        write: true,
        ...config.esbuild
    });
    const { outputs } = metafile;
    const outputPaths = Object.keys(outputs);
    const affectedFiles = outputPaths
        .map((path) => {
        const { entryPoint } = metafile.outputs[path];
        if (!entryPoint)
            return null;
        return {
            entryPoint,
            path: resolve(outDir, path)
        };
    })
        .filter(Boolean);
    // log.debug({ affectedFiles });
    if (metafile && writeMeta) {
        const ops = Object.entries(outputs).map(async ([path]) => {
            const fileName = basename(path, extname(path));
            const metaPath = join(dirname(path), `${fileName}.meta.json`);
            const writePath = resolve(originalCwd, metaPath);
            const json = JSON.stringify(metafile);
            log.debug('meta writePath:', writePath);
            await writeFile(writePath, json, 'utf8');
        });
        await Promise.all(ops);
    }
    return affectedFiles;
};
//# sourceMappingURL=compile.js.map