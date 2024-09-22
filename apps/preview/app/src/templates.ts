import { config } from './config.js';
import { parseName } from './helpers';
import type { TemplatePart, TemplateData } from './types.ts';

export const gather = async () => {
  const relativePath = config.relativePath.endsWith('/')
    ? config.relativePath
    : `${config.relativePath}/`;
  const buildPath = config.buildPath.endsWith('/') ? config.buildPath : `${config.buildPath}/`;
  const absBuildPath = `/${buildPath.replace(/(\.\.\/)+/, '')}`;

  const htmlFiles = import.meta.glob(`@jsxemailbuild/**/*.html`, {
    eager: true,
    import: 'default',
    query: '?raw'
  });
  const plainFiles = import.meta.glob(`@jsxemailbuild/**/*.txt`, {
    eager: true,
    import: 'default',
    query: '?raw'
  });
  const sourceFiles = import.meta.glob(`@jsxemailsrc/**/*.{jsx,tsx}`, {
    eager: true,
    import: 'default',
    query: '?raw'
  });
  // @ts-ignore
  const { default: templateNameMap } = await import(`@jsxemailbuild/template-name-map.json`);

  const fileKeys = Object.keys(sourceFiles);
  const templateFiles: Record<string, TemplateData> = fileKeys.reduce((acc, path) => {
    const basePath = path.replace(relativePath, buildPath).replace(/\.(jsx|tsx)$/, '');
    const absHtmlPath = `${path
      .replace(relativePath, absBuildPath)
      .replace(/\.(jsx|tsx)$/, '')}.html`;
    const templateName = templateNameMap[absHtmlPath] || basePath.split('/').at(-1);
    return {
      ...acc,
      [path]: {
        html: htmlFiles[`${basePath}.html`],
        path: path.replace(relativePath, ''),
        plain: plainFiles[`${basePath}.txt`],
        source: sourceFiles[path],
        templateName
      }
    };
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
