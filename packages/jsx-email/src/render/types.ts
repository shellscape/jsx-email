import type { HtmlToTextOptions } from 'html-to-text';

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
