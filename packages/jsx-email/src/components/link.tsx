import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

type RootProps = BaseProps<'a'>;

export interface LinkProps extends RootProps {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/link' } : {};

export const Link: JsxEmailComponent<LinkProps> = ({
  disableDefaultStyle,
  style,
  target,
  ...props
}) => (
  <a
    {...props}
    {...debugProps}
    target={target}
    style={{
      ...(disableDefaultStyle ? {} : { color: '#067df7', textDecoration: 'none' }),
      ...style
    }}
  />
);

Link.displayName = 'Link';
