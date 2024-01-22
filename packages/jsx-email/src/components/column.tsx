import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

export interface ColumnProps extends BaseProps<'td'> {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/column' } : {};

export const Column: JsxEmailComponent<ColumnProps> = ({ children, style, ...props }) => (
  <td {...props} {...debugProps} style={style}>
    {children}
  </td>
);

Column.displayName = 'Column';
