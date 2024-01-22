import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

export interface SectionProps extends BaseProps<'table'> {}

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
