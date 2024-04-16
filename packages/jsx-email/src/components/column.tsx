import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

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
