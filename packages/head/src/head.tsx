import type React from 'react';

type RootProps = React.ComponentPropsWithoutRef<'head'>;

export interface HeadProps extends RootProps {}

export const Head = ({ children, ...props }: React.PropsWithChildren<Readonly<HeadProps>>) => (
  <head {...props} data-id="@jsx-email/head">
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    {children}
  </head>
);

Head.displayName = 'Head';
