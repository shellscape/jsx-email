import type { BaseProps, JsxEmailComponent } from '../types';

export interface SectionProps extends BaseProps<'table'> {}

export const Section: JsxEmailComponent<SectionProps> = ({ children, style, ...props }) => (
  <table
    align="center"
    width="100%"
    {...props}
    data-id="jsx-email/section"
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
