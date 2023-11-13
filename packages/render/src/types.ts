export interface RenderOptions {
  minify?: boolean;
  plainText?: boolean;
  pretty?: boolean;
  strip?: boolean;
}

export interface ProcessOptions extends Required<Omit<RenderOptions, 'plainText'>> {
  html: string;
}
