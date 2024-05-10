import * as config from '../config.js';
import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface TextProps extends BaseProps<'p'> {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/text' } : {};

export const Text: JsxEmailComponent<TextProps> = ({ disableDefaultStyle, style, ...props }) => {
  const configDds = config.current().render.disableDefaultStyle;

  return (
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
};

Text.displayName = 'Text';
