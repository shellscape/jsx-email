import micromatch from 'micromatch';

import { config } from './config.js';
import { parseName } from './helpers';
import type { TemplatePart, TemplateData, TemplateExports } from './types.ts';

export const gather = async () => {
  const relativePath = config.relativePath.endsWith('/')
    ? config.relativePath
    : `${config.relativePath}/`;

  const allModules = import.meta.glob(`@jsxe/**/*.{jsx,tsx}`, { eager: true });
  const sources = import.meta.glob(`@jsxe/**/*.{jsx,tsx}`, { as: 'raw', eager: true });

  const modules = config.excludeGlob
    ? Object.keys(allModules).reduce((acc, path) => {
        if (!micromatch.isMatch(path.replace(relativePath, ''), config.excludeGlob))
          acc[path] = allModules[path];
        return acc;
      }, {})
    : allModules;

  const pathLookup = Object.keys(modules).reduce((acc, path) => {
    acc[path] = path.replace(relativePath, '');
    return acc;
  }, {});

  const sortedModules = Object.keys(modules)
    .sort((a, b) => {
      const aa = a.split('/').length;
      const bb = b.split('/').length;

      if (aa > bb) return -1;
      if (aa === bb) return 0;
      if (aa < bb) return 1;

      return 0;
    })
    .reduce((acc, curr) => {
      return { ...acc, [curr]: modules[curr] };
    }, {});

  const templates = (
    await Promise.all(
      Object.entries(sortedModules).map<Promise<TemplateData>>(async ([path, mod]) => {
        const component = mod as TemplateExports;
        const { previewProps, templateName, Template } = component;

        if (!Template) return null;

        const result: TemplateData = {
          jsx: sources[path],
          path: pathLookup[path],
          previewProps,
          Template,
          templateName
        };
        return result;
      })
    )
  ).filter(Boolean);

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
