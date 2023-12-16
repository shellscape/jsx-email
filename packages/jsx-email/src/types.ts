import type { HtmlToTextOptions } from 'html-to-text';
import type React from 'react';

export type BaseProps<TElement extends React.ElementType> =
  React.ComponentPropsWithoutRef<TElement> & {
    disableDefaultStyle?: boolean;
  };

// export type BaseParentProps<TElement extends React.ElementType> = BaseProps<TElement> & {
//   children?: React.ReactNode | undefined;
// };

export type JsxEmailComponent<TProps extends BaseProps<any>> = React.FC<Readonly<TProps>>;

// export type JsxEmailParentComponent<TProps extends BaseParentProps<any> = {}> = React.FC<
//   Readonly<TProps>
// >;

export type PlainTextOptions = HtmlToTextOptions;

export interface RenderOptions {
  minify?: boolean;
  plainText?: boolean | PlainTextOptions;
  pretty?: boolean;
  strip?: boolean;
}

export interface ProcessOptions extends Required<Omit<RenderOptions, 'plainText'>> {
  html: string;
}
