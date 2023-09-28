import type React from 'react';

type RootProps = React.ComponentPropsWithoutRef<'td'>;

export interface ColumnProps extends RootProps {}

export const Column = ({
  children,
  style,
  ...props
}: React.PropsWithChildren<Readonly<ColumnProps>>) => (
  <td {...props} data-id="@jsx-email/column" style={style}>
    {children}
  </td>
);

Column.displayName = 'Column';
