import * as React from 'react';

type ColumnElement = React.ElementRef<'td'>;
type RootProps = React.ComponentPropsWithoutRef<'td'>;

export interface ColumnProps extends RootProps {}

export const Column = React.forwardRef<ColumnElement, Readonly<ColumnProps>>(
  ({ children, style, ...props }, forwardedRef) => (
    <td {...props} ref={forwardedRef} data-id="@jsx-email/column" style={style}>
      {children}
    </td>
  )
);

Column.displayName = 'Column';
