import type { BaseProps, JsxEmailComponent } from '../types';

export interface BodyProps extends BaseProps<'body'> {}

export const Body: JsxEmailComponent<BodyProps> = ({ children, style, ...props }) => (
  <body {...props} data-id="jsx-email/body" style={style}>
    {children}
  </body>
);

Body.displayName = 'Body';
