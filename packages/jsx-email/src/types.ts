import type { HtmlToTextOptions } from 'html-to-text';
import type React from 'react';
import type { Plugin, Preset } from 'unified';

export type BaseProps<TElement extends React.ElementType> =
  React.ComponentPropsWithoutRef<TElement> & {
    disableDefaultStyle?: boolean;
  };

export type JsxEmailComponent<TProps extends BaseProps<any>> = React.FC<Readonly<TProps>>;

export type PlainTextOptions = HtmlToTextOptions;

export interface RenderOptions {
  disableDefaultStyle?: boolean;
  minify?: boolean;
  plainText?: boolean | PlainTextOptions;
  pretty?: boolean;
}

export interface ProcessOptions extends Required<Omit<RenderOptions, 'plainText'>> {
  html: string;
}

export type RenderHookFn = (html: string) => string | Promise<string>;
export type ProcessHookFn = () => Plugin;

export const pluginSymbol = Symbol.for('jsx-email/plugin');

export interface JsxEmailPlugin {
  afterRender?: RenderHookFn;
  beforeRender?: RenderHookFn;
  name: string;
  process?: () => Plugin | Preset | Promise<Plugin> | Promise<Preset>;
  symbol: typeof pluginSymbol;
}
