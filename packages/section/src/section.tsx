import type React from 'react';

type RootProps = React.ComponentPropsWithoutRef<'table'>;

export interface SectionProps extends RootProps {}

export const Section: React.FC<Readonly<SectionProps>> = ({ children, style, ...props }) => (
  <table
    align="center"
    width="100%"
    {...props}
    data-id="@jsx-email/section"
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
