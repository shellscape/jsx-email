interface CompileOptions {
    /**
     * @desc an array of absolute paths for JSX/TSX template files to compile
     */
    files: string[];
    /**
     * @desc Default: true. If true, adds the build hash to compiled file names.
     */
    hashFiles?: boolean;
    /**
     * @desc the path to output the compiled file(s)
     */
    outDir: string;
    /**
     * @desc If true, writes the ESBuild metadata for the compiled file(s)
     */
    writeMeta?: boolean;
}
interface CompileResult {
    entryPoint: string;
    path: string;
}
/**
 * @desc Compiles a JSX/TSX template file using esbuild
 * @param options CompileOptions
 * @returns Promise<CompileResult[]> An array of files affected by the compilation
 */
export declare const compile: (options: CompileOptions) => Promise<CompileResult[]>;
export {};
//# sourceMappingURL=compile.d.ts.map