import type { BaseProps, JsxEmailComponent } from '../types';

export interface RowProps extends BaseProps<'table'> {}

export const Row: JsxEmailComponent<RowProps> = ({
  children,
  disableDefaultStyle,
  style,
  ...props
}) => (
  <table
    align="center"
    width="100%"
    {...props}
    data-id="jsx-email/row"
    style={style}
    role="presentation"
    cellSpacing="0"
    cellPadding="0"
    border={0}
  >
    <tbody style={disableDefaultStyle ? {} : { width: '100%' }}>
      <tr style={disableDefaultStyle ? {} : { width: '100%' }}>{children}</tr>
    </tbody>
  </table>
);

Row.displayName = 'Row';
