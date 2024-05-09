import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface ColumnProps extends BaseProps<'td'> {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/column' } : {};

export const Column: JsxEmailComponent<ColumnProps> = ({ children, style, ...props }) => (
  <td {...props} {...debugProps} style={style}>
    {children}
  </td>
);

Column.displayName = 'Column';
