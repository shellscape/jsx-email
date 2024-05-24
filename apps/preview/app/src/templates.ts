import { config } from './config.js';
import { parseName } from './helpers';
import type { TemplatePart, TemplateData } from './types.ts';

export const gather = async () => {
  const relativePath = config.relativePath.endsWith('/')
    ? config.relativePath
    : `${config.relativePath}/`;

  const htmlFiles = import.meta.glob(`@jsxemailbuild/**/*.html`, { as: 'raw', eager: true });
  const plainFiles = import.meta.glob(`@jsxemailbuild/**/*.txt`, { as: 'raw', eager: true });
  const sourceFiles = import.meta.glob(`@jsxeemailsrc/**/*.{jsx,tsx}`, { as: 'raw', eager: true });

  const fileKeys = Object.keys(sourceFiles);
  const templateFiles: Record<string, TemplateData> = fileKeys.reduce((acc, path) => {
    const basePath = path.replace(/\.(jsx|tsx)$/, '');
    return {
      ...acc,
      [path]: {
        html: htmlFiles[`${basePath}.html`],
        path: pathLookup[path],
        place: plainFiles[`${basePath}.txt`],
        source: sourceFiles[path]
      }
    };
  }, {});

  const pathLookup = Object.keys(templateFiles).reduce((acc, path) => {
    acc[path] = path.replace(relativePath, '');
    return acc;
  }, {});

  const sortedPaths = Object.keys(templateFiles).sort((a, b) => {
    const aa = a.split('/').length;
    const bb = b.split('/').length;

    if (aa > bb) return -1;
    if (aa === bb) return 0;
    if (aa < bb) return 1;

    return 0;
  });

  const templates: Record<string, TemplateData> = sortedPaths.reduce((acc, path) => {
    return { ...acc, [path]: templateFiles[path] };
  }, {});

  return templates;
};

export const getNestedStructure = (templates: TemplateData[]) => {
  const templateParts: TemplatePart[] = templates.reduce((acc, template) => {
    const parts = template.path.split('/');

    let curr: TemplatePart = { children: acc, name: '' };
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      // Check if child with name exists
      let child = curr.children?.find((c) => c.name === parseName(part));
      if (!child) {
        // If not, create it
        child = { children: [], name: parseName(part), path: template.path.replace('.tsx', '') };
        curr.children.push(child);
      }

      // Descend into child
      curr = child;
    }

    // Add template data to leaf node
    curr.template = template;

    return acc;
  }, []);

  return templateParts;
};
