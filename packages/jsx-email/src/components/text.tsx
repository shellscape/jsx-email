import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

export interface TextProps extends BaseProps<'p'> {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/text' } : {};

export const Text: JsxEmailComponent<TextProps> = ({ disableDefaultStyle, style, ...props }) => (
  <p
    {...props}
    {...debugProps}
    style={{
      ...(disableDefaultStyle ? {} : { fontSize: '14px', lineHeight: '24px', margin: '16px 0' }),
      ...style
    }}
  />
);

Text.displayName = 'Text';
