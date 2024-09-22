import * as config from '../config.js';
import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

type RootProps = BaseProps<'a'>;

export interface LinkProps extends RootProps {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/link' } : {};

export const Link: JsxEmailComponent<LinkProps> = ({
  disableDefaultStyle,
  style,
  target,
  ...props
}) => {
  const configDds = config.current().render.disableDefaultStyle;

  return (
    <a
      {...props}
      {...debugProps}
      target={target}
      style={{
        ...(configDds || disableDefaultStyle ? {} : { color: '#067df7', textDecoration: 'none' }),
        ...style
      }}
    />
  );
};

Link.displayName = 'Link';
