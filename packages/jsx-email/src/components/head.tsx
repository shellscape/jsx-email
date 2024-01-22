import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

export interface HeadProps extends BaseProps<'head'> {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/head' } : {};

export const Head: JsxEmailComponent<HeadProps> = ({ children, ...props }) => (
  <head {...props} {...debugProps}>
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    {children}
  </head>
);

Head.displayName = 'Head';
