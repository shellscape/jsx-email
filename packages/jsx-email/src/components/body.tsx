import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface BodyProps extends BaseProps<'body'> {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/body' } : {};

export const Body: JsxEmailComponent<BodyProps> = ({ children, style, ...props }) => (
  <body {...props} {...debugProps} style={style}>
    {children}
  </body>
);

Body.displayName = 'Body';
