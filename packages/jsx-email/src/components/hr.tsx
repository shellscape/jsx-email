import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

export interface HrProps extends BaseProps<'hr'> {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/hr' } : {};

export const Hr: JsxEmailComponent<HrProps> = ({ disableDefaultStyle, style, ...props }) => (
  <hr
    {...props}
    {...debugProps}
    style={{
      ...(disableDefaultStyle
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

Hr.displayName = 'Hr';
