import * as config from '../config';
import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

export interface TextProps extends BaseProps<'p'> {}

const configDds = config.current.render.disableDefaultStyle;
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/text' } : {};

export const Text: JsxEmailComponent<TextProps> = ({ disableDefaultStyle, style, ...props }) => (
  <p
    {...props}
    {...debugProps}
    style={{
      ...(configDds || disableDefaultStyle
        ? {}
        : { fontSize: '14px', lineHeight: '24px', margin: '16px 0' }),
      ...style
    }}
  />
);

Text.displayName = 'Text';
