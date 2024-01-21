/* eslint-disable import/first */
import './globals.css';

import { render, renderPlainText } from 'jsx-email';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, type RouteObject, RouterProvider } from 'react-router-dom';
import { create, type Struct } from 'superstruct';
import titleize from 'titleize';

import { Error } from './error.tsx';
import { Home } from './home.tsx';
import { Preview } from './preview.tsx';

interface TemplateExports {
  Name?: string;
  PreviewProps?: () => any;
  Template: React.ExoticComponent;
  TemplateStruct?: Struct;
}

interface TemplateData extends TemplateExports {
  jsx: string;
  path?: string;
}

const { warn } = console;
const addSpacesForCamelCaseName = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1 $2');

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-dark-bg text-dark-bg-text">
    <div>{children}</div>
  </div>
);

function getCommonRoot(paths) {
  const sortedPaths = paths.concat().sort();
  const [first] = sortedPaths;
  const last = sortedPaths[sortedPaths.length - 1];
  const firstLength = first.length;
  let i = 0;
  while (i < firstLength && first.charAt(i) === last.charAt(i)) {
    i += 1;
  }
  return first.substring(0, i);
}

const parseName = (path: string) => {
  const chunks = path.replace('\\', '/').split('/');
  const segment = chunks.at(-1);
  const basename = segment!.split(/\.[^.]+$/)[0];

  return titleize(addSpacesForCamelCaseName(basename));
};

const modules = import.meta.glob('@/**/*.{jsx,tsx}', { eager: true });
const sources = import.meta.glob('@/**/*.{jsx,tsx}', { as: 'raw', eager: true });
const root = getCommonRoot(Object.keys(modules));

const templates = (
  await Promise.all(
    Object.entries(modules).map<Promise<TemplateData>>(async ([path, mod]) => {
      const component = mod as TemplateExports;
      const Template = component.Template || (component as any).default;

      if (!Template) return null;

      const result: TemplateData = {
        jsx: sources[path],
        Name: component.Name || parseName(path),
        path: path.replace(root, ''),
        PreviewProps: component.PreviewProps || Template.PreviewProps,
        Template,
        TemplateStruct: component.TemplateStruct
      };
      return result;
    })
  )
).filter(Boolean);

const getPathParts = (path) => path.split('/');

const nestedTemplateParts = templates.reduce((acc, template) => {
  const parts = getPathParts(template.path);

  let curr = { children: acc };
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
          title: template.path.replace('.tsx', '')
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
