import type { PreviewImportContent, TemplateData } from '../types/templates';
import { normalizePath, stripExtension } from './file';

const imports = import.meta.glob<PreviewImportContent>('@jsxemailbuild/**/*.js', {
  eager: true,
  import: 'default'
});

const previewAssetBaseUrl = `${(import.meta.env.VITE_JSXEMAIL_BASE_PATH || '/').replace(/\/?$/, '/')}static/`;

function parseTemplateName(path: string) {
  return stripExtension(path)
    .split('/')
    .at(-1)!
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function toRelativePath(file: PreviewImportContent, targetPath: string) {
  const sourcePath = normalizePath(file.sourcePath || file.sourceFile);
  const normalizedTarget = normalizePath(targetPath);

  if (sourcePath.startsWith(`${normalizedTarget}/`)) {
    return sourcePath.slice(normalizedTarget.length + 1);
  }

  const sourceFile = normalizePath(file.sourceFile);
  if (!sourceFile.startsWith('/')) {
    return sourceFile.replace(/^emails\//, '');
  }

  return sourcePath;
}

function normalizePreviewAssetUrls(value: string) {
  return value.replaceAll(/(["'(])\/static\//g, `$1${previewAssetBaseUrl}`);
}

export function gatherTemplates() {
  const targetPath = import.meta.env.VITE_JSXEMAIL_TARGET_PATH;
  if (!targetPath) {
    throw new TypeError('VITE_JSXEMAIL_TARGET_PATH is not set.');
  }

  return Object.values(imports)
    .map((file): TemplateData => {
      const relativePath = toRelativePath(file, targetPath);
      const routePath = stripExtension(relativePath);

      return {
        fileExtension: relativePath.match(/\.[^/.]+$/)?.[0] || '',
        fileName: routePath,
        html: normalizePreviewAssetUrls(file.html),
        id: `emails/${routePath}`,
        path: routePath,
        plain: file.plain,
        source: normalizePreviewAssetUrls(file.source),
        sourceFile: file.sourceFile,
        sourcePath: file.sourcePath || file.sourceFile,
        templateName: file.templateName || parseTemplateName(routePath)
      };
    })
    .sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));
}
