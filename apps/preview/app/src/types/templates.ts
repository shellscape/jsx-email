export interface PreviewImportContent {
  html: string;
  plain: string;
  source: string;
  sourceFile: string;
  sourcePath?: string;
  templateName?: string;
}

export type TemplateTab = 'preview' | 'jsx' | 'html' | 'plain';

export interface TemplateData {
  fileExtension: string;
  fileName: string;
  html: string;
  id: string;
  path: string;
  plain: string;
  source: string;
  sourceFile: string;
  sourcePath: string;
  templateName: string;
}

export interface FileTreeNode {
  children: FileTreeNode[];
  name: string;
  path: string;
  template?: TemplateData;
  type: 'folder' | 'file';
}

export interface PreviewPreset {
  height?: number;
  label: string;
  name: string;
  width: number | null;
}
