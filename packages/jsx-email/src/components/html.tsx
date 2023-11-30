import React from 'react';

type RootProps = React.ComponentPropsWithoutRef<'html'>;

export interface HtmlProps extends RootProps {}

export const Html = ({
  children,
  lang = 'en',
  dir = 'ltr',
  ...props
}: React.PropsWithChildren<Readonly<HtmlProps>>) => (
  <html {...props} data-id="jsx-email/html" lang={lang} dir={dir}>
    {children}
  </html>
);

Html.displayName = 'Html';
