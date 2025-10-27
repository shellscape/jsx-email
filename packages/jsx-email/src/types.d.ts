import type { BuildOptions } from 'esbuild';
import type { HtmlToTextOptions } from 'html-to-text';
import type React from 'react';
export type BaseProps<TElement extends React.ElementType> = React.ComponentPropsWithoutRef<TElement> & {
    disableDefaultStyle?: boolean;
};
export interface ESBuildOptions {
    plugins: BuildOptions['plugins'];
}
export type JsxEmailComponent<TProps extends BaseProps<any>> = React.FC<Readonly<TProps>>;
export type PlainTextOptions = HtmlToTextOptions;
export interface RenderOptions {
    disableDefaultStyle?: boolean;
    inlineCss?: boolean;
    minify?: boolean;
    plainText?: boolean | PlainTextOptions;
    pretty?: boolean;
}
export interface ProcessOptions extends Required<Omit<RenderOptions, 'plainText'>> {
    html: string;
}
declare global {
    namespace globalThis {
        var isJsxEmailPreview: boolean;
    }
    interface ImportMeta {
        isJsxEmailPreview: boolean;
    }
}
//# sourceMappingURL=types.d.ts.map