export enum Views {
  Desktop = 'desktop',
  Html = 'html',
  Jsx = 'jsx',
  Mobile = 'mobile',
  Plain = 'plain'
}

export interface TemplateExports {
  Template: React.ExoticComponent;
  previewProps?: () => any;
  templateName?: string;
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
