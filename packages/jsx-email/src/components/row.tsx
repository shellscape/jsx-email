import React from 'react';

type RootProps = React.ComponentPropsWithoutRef<'table'>;

export interface RowProps extends RootProps {}

export const Row = ({ children, style, ...props }: React.PropsWithChildren<Readonly<RowProps>>) => (
  <table
    align="center"
    width="100%"
    {...props}
    data-id="@jsx-email/row"
    style={style}
    role="presentation"
    cellSpacing="0"
    cellPadding="0"
    border={0}
  >
    <tbody style={{ width: '100%' }}>
      <tr style={{ width: '100%' }}>{children}</tr>
    </tbody>
  </table>
);

Row.displayName = 'Row';
