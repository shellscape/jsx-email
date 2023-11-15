import React from 'react';

type RootProps = React.ComponentPropsWithoutRef<'table'>;

export interface ContainerProps extends RootProps {}

export const Container: React.FC<Readonly<ContainerProps>> = ({ children, style, ...props }) => (
  <table
    align="center"
    width="100%"
    {...props}
    data-id="jsx-email/container"
    role="presentation"
    cellSpacing="0"
    cellPadding="0"
    border={0}
    style={{ maxWidth: '37.5em', ...style }}
  >
    <tbody>
      <tr style={{ width: '100%' }}>
        <td>{children}</td>
      </tr>
    </tbody>
  </table>
);

Container.displayName = 'Container';
