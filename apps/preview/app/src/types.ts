// Note: This should match the same declaration in jsx-email/src/cli/preview.mts
export interface PreviewImportContent {
  html: string;
  plain: string;
  source: string;
  sourceFile: string;
  templateName: string;
}

export enum Views {
  Desktop = 'desktop',
  Html = 'html',
  Jsx = 'jsx',
  Mobile = 'mobile',
  Plain = 'plain'
}

export interface TemplateData {
  html: string;
  path?: string;
  plain: string;
  source: string;
  templateName: string;
}

export interface TemplatePart {
  children?: TemplatePart[];
  name: string;
  path?: string;
  template?: TemplateData;
}
