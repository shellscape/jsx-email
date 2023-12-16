import type { BaseProps, JsxEmailComponent } from '../types';

export interface HrProps extends BaseProps<'hr'> {}

export const Hr: JsxEmailComponent<HrProps> = ({ disableDefaultStyle, style, ...props }) => (
  <hr
    {...props}
    data-id="jsx-email/hr"
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
