import { parseName } from './helpers';
import type { PreviewImportContent, TemplatePart, TemplateData } from './types.ts';

export const gather = async () => {
  const imports = import.meta.glob<PreviewImportContent>(`@jsxemailbuild/**/*.js`, {
    import: 'default'
  });
  const builtFiles = await Promise.all(Object.values(imports).map((imp) => imp()));
  const targetPath = import.meta.env.VITE_JSXEMAIL_TARGET_PATH;
  const templateFiles: Record<string, TemplateData> = builtFiles.reduce((acc, file) => {
    const templateName = file.templateName || file.sourceFile.split('/').at(-1);

    return {
      ...acc,
      [file.sourceFile]: {
        html: file.html,
        path: file.sourcePath.replace(`${targetPath}/`, ''),
        plain: file.plain,
        source: file.source,
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
