import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

export interface ContainerProps extends BaseProps<'table'> {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/container' } : {};

export const Container: JsxEmailComponent<ContainerProps> = ({
  children,
  disableDefaultStyle,
  style,
  ...props
}) => (
  <table
    align="center"
    width="100%"
    {...props}
    {...debugProps}
    role="presentation"
    cellSpacing="0"
    cellPadding="0"
    border={0}
    style={{ ...(disableDefaultStyle ? {} : { maxWidth: '37.5em' }), ...style }}
  >
    <tbody>
      <tr style={disableDefaultStyle ? {} : { width: '100%' }}>
        <td>{children}</td>
      </tr>
    </tbody>
  </table>
);

Container.displayName = 'Container';
