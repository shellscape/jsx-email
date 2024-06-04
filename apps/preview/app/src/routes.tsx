import { createBrowserRouter, type RouteObject } from 'react-router-dom';

import { Error } from './error.tsx';
import { Home } from './home.tsx';
import { Preview } from './preview.tsx';
import { gather, getNestedStructure } from './templates';
import type { TemplateData } from './types.js';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-dark-bg text-dark-bg-text">
    <div>{children}</div>
  </div>
);

const getRoutes = async (templates: TemplateData[]) => {
  const templateParts = getNestedStructure(templates);

  const routes = templates.map(async (template) => {
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

export const getRouter = async () => {
  const templates = await gather();
  const { routes, templateParts } = await getRoutes(Object.values(templates));
  const router = createBrowserRouter([
    {
      element: (
        <Layout>
          <Home templateParts={templateParts} />
        </Layout>
      ),
      errorElement: <Error />,
      path: '/'
    },
    ...(await Promise.all(routes))
  ]);

  return router;
};
