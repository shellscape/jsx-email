import { type Struct } from 'superstruct';

export enum Views {
  Desktop = 'desktop',
  Html = 'html',
  Jsx = 'jsx',
  Mobile = 'mobile',
  Plain = 'plain'
}

export interface TemplateExports {
  Name?: string;
  PreviewProps?: () => any;
  Template: React.ExoticComponent;
  TemplateStruct?: Struct;
}

export interface TemplateData extends TemplateExports {
  jsx: string;
  path?: string;
}

export interface TemplatePart {
  children?: TemplatePart[];
  name: string;
  path?: string;
  template?: TemplateData;
}
