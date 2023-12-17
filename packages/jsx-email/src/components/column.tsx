import type { BaseProps, JsxEmailComponent } from '../types';

export interface ColumnProps extends BaseProps<'td'> {}

export const Column: JsxEmailComponent<ColumnProps> = ({ children, style, ...props }) => (
  <td {...props} data-id="jsx-email/column" style={style}>
    {children}
  </td>
);

Column.displayName = 'Column';
