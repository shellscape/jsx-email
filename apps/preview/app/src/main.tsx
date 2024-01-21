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
}

const { warn } = console;
const addSpacesForCamelCaseName = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1 $2');

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-dark-bg text-dark-bg-text">
    <div>{children}</div>
  </div>
);

const parseName = (path: string) => {
  const chunks = path.replace('\\', '/').split('/');
  const segment = chunks.at(-1);
  const basename = segment!.split(/\.[^.]+$/)[0];

  return titleize(addSpacesForCamelCaseName(basename));
};

const modules = import.meta.glob('@/**/*.{jsx,tsx}', { eager: true });
const sources = import.meta.glob('@/**/*.{jsx,tsx}', { as: 'raw', eager: true });

const templates = (
  await Promise.all(
    Object.entries(modules).map<Promise<TemplateData>>(async ([path, mod]) => {
      const component = mod as TemplateExports;
      const Template = component.Template || (component as any).default;

      if (!Template) return null;

      const result: TemplateData = {
        jsx: sources[path],
        Name: component.Name || parseName(path),
        PreviewProps: component.PreviewProps || Template.PreviewProps,
        Template,
        TemplateStruct: component.TemplateStruct
      };
      return result;
    })
  )
).filter(Boolean);

const templateNames = templates.map((template) => template.Name!);

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
      <Preview {...{ html, jsx: template.jsx, plainText, templateNames, title: Name! }} />
    </Layout>
  );
  return { element, path: `/${template.Name}` } as RouteObject;
});

const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Home templateNames={templateNames} />
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
