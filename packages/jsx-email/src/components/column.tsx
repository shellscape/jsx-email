import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface ColumnProps extends BaseProps<'td'> {
  bgColor?: string;
  bgImage?: string;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/column' } : {};

export const Column: JsxEmailComponent<ColumnProps> = ({
  children,
  bgColor,
  bgImage,
  style,
  ...props
}) => (
  <td
    // @ts-expect-error: `background` and `bgcolor` not documented
    background={bgImage}
    bgcolor={bgColor}
    {...props}
    {...debugProps}
    style={style}
  >
    {children}
  </td>
);

Column.displayName = 'Column';
