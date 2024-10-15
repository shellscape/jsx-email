import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface SectionProps extends Omit<BaseProps<'table'>, 'cellPadding' | 'cellSpacing'> {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/section' } : {};

export const Section: JsxEmailComponent<SectionProps> = ({ children, style, ...props }) => (
  <table
    align="center"
    width="100%"
    {...props}
    {...debugProps}
    style={style}
    border={0}
    cellPadding="0"
    cellSpacing="0"
    role="presentation"
  >
    <tbody>
      <tr>
        <td>{children}</td>
      </tr>
    </tbody>
  </table>
);

Section.displayName = 'Section';
