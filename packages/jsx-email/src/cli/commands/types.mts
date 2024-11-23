import type React from 'react';
import { boolean, number, object, optional, string, union, type Output as Infer } from 'valibot';

export type Flags = Record<string, string | boolean | undefined>;

export type CommandFn = (flags: Flags, inputs: string[]) => Promise<boolean>;

export const PreviewCommandOptionsStruct = object({
  basePath: optional(string()),
  buildPath: optional(string()),
  exclude: optional(string()),
  host: optional(boolean()),
  open: optional(boolean()),
  port: optional(union([number(), string()]))
});

export type PreviewCommandOptions = Infer<typeof PreviewCommandOptionsStruct>;

export interface PreviewCommonParams {
  argv: PreviewCommandOptions;
  targetPath: string;
}

export type TemplateFn = (props: {}) => React.JSX.Element;
