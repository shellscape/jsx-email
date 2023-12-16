import type { BaseProps, JsxEmailComponent } from '../types';

export interface HeadProps extends BaseProps<'head'> {}

export const Head: JsxEmailComponent<HeadProps> = ({ children, ...props }) => (
  <head {...props} data-id="jsx-email/head">
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    {children}
  </head>
);

Head.displayName = 'Head';
