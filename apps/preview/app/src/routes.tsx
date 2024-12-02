import { createHashRouter, type RouteObject } from 'react-router-dom';

import { Error } from './error.tsx';
import { Home } from './home.tsx';
import { Preview } from './preview.tsx';
import { getNestedStructure } from './templates';
import type { TemplateData } from './types.js';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-dark-bg text-dark-bg-text">
    <div>{children}</div>
  </div>
);

const getRoutes = (templates: TemplateData[]) => {
  const templateParts = getNestedStructure(templates);

  const routes = templates.map((template) => {
    const { html, path, plain, source } = template;

    const element = (
      <Layout>
        <Preview
          {...{
            html,
            jsx: source,
            plainText: plain,
            templateParts,
            title: path.replace('.tsx', '')
          }}
        />
      </Layout>
    );

    return { element, path: `/${template.path.replace('.tsx', '')}` } as RouteObject;
  });

  return { routes, templateParts };
};

export const getRouter = (templates: Record<string, TemplateData>) => {
  const { routes, templateParts } = getRoutes(Object.values(templates));
  const router = createHashRouter([
    {
      element: (
        <Layout>
          <Home templateParts={templateParts} />
        </Layout>
      ),
      errorElement: <Error />,
      path: import.meta.env.VITE_JSXEMAIL_BASE_PATH || '/'
    },
    ...routes
  ]);

  return router;
};
