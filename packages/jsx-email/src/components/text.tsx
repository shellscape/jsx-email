import type { BaseProps, JsxEmailComponent } from '../types';

export interface TextProps extends BaseProps<'p'> {}

export const Text: JsxEmailComponent<TextProps> = ({ disableDefaultStyle, style, ...props }) => (
  <p
    {...props}
    data-id="jsx-email/text"
    style={{
      ...(disableDefaultStyle ? {} : { fontSize: '14px', lineHeight: '24px', margin: '16px 0' }),
      ...style
    }}
  />
);

Text.displayName = 'Text';
