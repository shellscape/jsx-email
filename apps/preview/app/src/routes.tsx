import { create } from 'superstruct';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import { render, renderPlainText } from 'jsx-email';

import { Error } from './error.tsx';
import { warn } from './helpers';
import { Home } from './home.tsx';
import { Preview } from './preview.tsx';
import { gather, getNestedStructure } from './templates';
import type { TemplateData } from './types';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-dark-bg text-dark-bg-text">
    <div>{children}</div>
  </div>
);

const getRoutes = async (templates: TemplateData[]) => {
  const templateParts = getNestedStructure(templates);

  const routes = templates.map(async (template) => {
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

    const [html, plainText] = await Promise.all([
      render(<Template {...props} />, { minify: false, pretty: true }),
      renderPlainText(<Template {...props} />)
    ]);
    const element = (
      <Layout>
        <Preview
          {...{
            html,
            jsx: template.jsx,
            plainText,
            templateParts,
            title: template.Name || template.path.replace('.tsx', '')
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
  const { routes, templateParts } = await getRoutes(templates);
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
