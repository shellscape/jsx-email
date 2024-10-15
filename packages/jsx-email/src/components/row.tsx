import * as config from '../config.js';
import { debug } from '../debug.js';
import { log } from '../log.js';
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

  if (props.cellPadding || props.cellSpacing) {
    log.warn(
      'Use of the `cellPadding` and `cellSpacing` properties are discouraged due to inconsistencies between email clients'
    );
  }

  return (
    <table
      align="center"
      width="100%"
      style={style}
      role="presentation"
      cellSpacing="0"
      cellPadding="0"
      border={0}
      {...props}
      {...debugProps}
    >
      <tbody style={configDds || disableDefaultStyle ? {} : { width: '100%' }}>
        <tr style={configDds || disableDefaultStyle ? {} : { width: '100%' }}>{children}</tr>
      </tbody>
    </table>
  );
};

Row.displayName = 'Row';
