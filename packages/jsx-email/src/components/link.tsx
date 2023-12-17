import type { BaseProps, JsxEmailComponent } from '../types';

type RootProps = BaseProps<'a'>;

export interface LinkProps extends RootProps {}

export const Link: JsxEmailComponent<LinkProps> = ({
  disableDefaultStyle,
  style,
  target,
  ...props
}) => (
  <a
    {...props}
    data-id="jsx-email/link"
    target={target}
    style={{
      ...(disableDefaultStyle ? {} : { color: '#067df7', textDecoration: 'none' }),
      ...style
    }}
  />
);

Link.displayName = 'Link';
