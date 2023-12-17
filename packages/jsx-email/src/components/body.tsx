import type { BaseProps, JsxEmailComponent } from '../types';

type RootProps = BaseProps<'body'>;

export interface BodyProps extends RootProps {}

export const Body: JsxEmailComponent<BodyProps> = ({ children, style, ...props }) => (
  <body {...props} data-id="jsx-email/body" style={style}>
    {children}
  </body>
);

Body.displayName = 'Body';
