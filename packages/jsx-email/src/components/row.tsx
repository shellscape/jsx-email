import * as config from '../config.js';
import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface RowProps extends BaseProps<'table'> {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/row' } : {};

export const Row: JsxEmailComponent<RowProps> = ({
  children,
  disableDefaultStyle,
  style,
  ...props
}) => {
  const configDds = config.current().render.disableDefaultStyle;

  return (
    <table
      align="center"
      width="100%"
      {...props}
      {...debugProps}
      style={style}
      role="presentation"
      cellSpacing="0"
      cellPadding="0"
      border={0}
    >
      <tbody style={configDds || disableDefaultStyle ? {} : { width: '100%' }}>
        <tr style={configDds || disableDefaultStyle ? {} : { width: '100%' }}>{children}</tr>
      </tbody>
    </table>
  );
};

Row.displayName = 'Row';
