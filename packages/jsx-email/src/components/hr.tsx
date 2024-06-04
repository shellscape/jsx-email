import * as config from '../config.js';
import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface HrProps extends BaseProps<'hr'> {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/hr' } : {};

export const Hr: JsxEmailComponent<HrProps> = ({ disableDefaultStyle, style, ...props }) => {
  const configDds = config.current().render.disableDefaultStyle;
  return (
    <hr
      {...props}
      {...debugProps}
      style={{
        ...(configDds || disableDefaultStyle
          ? {}
          : {
              border: 'none',
              borderTop: '1px solid #eaeaea',
              width: '100%'
            }),
        ...style
      }}
    />
  );
};

Hr.displayName = 'Hr';
