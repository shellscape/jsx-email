/* eslint-disable import/first */
import './globals.css';

import { render, renderPlainText } from 'jsx-email';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router-dom';
import { create } from 'superstruct';
import titleize from 'titleize';

import { Error } from './error.tsx';
import { Home } from './home.tsx';
import { Preview } from './preview.tsx';
import type { TemplatePart, TemplateData, TemplateExports } from './types.ts';

const { warn } = console;
const addSpacesForCamelCaseName = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1 $2');

// Note: Disables annoying key errors. We're static so we don't need to worry about this.
/* eslint-disable no-console */
const og = console.error;
const re =
  /^Warning: Each child in an array or iterator should have a unique "key" prop|^Warning: Each child in a list should have a unique "key" prop/;
console.error = (...args) => {
  const [line] = args;
  if (!re.test(line)) og(...args);
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-dark-bg text-dark-bg-text">
    <div>{children}</div>
  </div>
);

const parseName = (path: string) => {
  const chunks = path.replace('\\', '/').split('/');
  const segment = chunks.at(-1);
  const [basename] = segment!.split(/\.[^.]+$/);

  return titleize(addSpacesForCamelCaseName(basename));
};

// @ts-expect-error
const relativePath = `${__JSX_EMAIL_RELATIVE_PATH__}/`;
const modules = import.meta.glob('@/**/*.{jsx,tsx}', { eager: true });
const sources = import.meta.glob('@/**/*.{jsx,tsx}', { as: 'raw', eager: true });
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
      const Template = component.Template || (component as any).default;

      if (!Template) return null;

      const result: TemplateData = {
        jsx: sources[path],
        Name: component.Name || parseName(path),
        path: pathLookup[path],
        PreviewProps: component.PreviewProps || Template.PreviewProps,
        Template,
        TemplateStruct: component.TemplateStruct
      };
      return result;
    })
  )
).filter(Boolean);

const getPathParts = (path) => path.split('/');

const nestedTemplateParts: TemplatePart[] = templates.reduce((acc, template) => {
  const parts = getPathParts(template.path);

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

const templateRoutes = templates.map(async (template) => {
  const { Name, PreviewProps, Template, TemplateStruct } = template;
  let props: any;

  if (TemplateStruct) props = create({}, TemplateStruct);
  else if (typeof PreviewProps === 'function') props = PreviewProps();
  else if (PreviewProps) props = PreviewProps;
  else if ((Template as any).PreviewProps) {
    warn(
      `jsx-email: ${Name} → PreviewProps as a property of a component is deprecated. Please used a named export.`
    );
    props = (Template as any).PreviewProps;
  }

  const html = await render(<Template {...props} />, { pretty: true });
  const plainText = await renderPlainText(<Template {...props} />);
  const element = (
    <Layout>
      <Preview
        {...{
          html,
          jsx: template.jsx,
          plainText,
          templateParts: nestedTemplateParts,
          title: template.Name || template.path.replace('.tsx', '')
        }}
      />
    </Layout>
  );

  return { element, path: `/${template.path.replace('.tsx', '')}` } as RouteObject;
});

const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Home templateParts={nestedTemplateParts} />
      </Layout>
    ),
    errorElement: <Error />,
    path: '/'
  },
  ...(await Promise.all(templateRoutes))
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
