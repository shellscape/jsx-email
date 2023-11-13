import React from 'react';

type RootProps = React.ComponentPropsWithoutRef<'a'>;

export interface LinkProps extends RootProps {}

export const Link: React.FC<Readonly<LinkProps>> = ({ target = '_blank', style, ...props }) => (
  <a
    {...props}
    data-id="@jsx-email/link"
    target={target}
    style={{
      color: '#067df7',
      textDecoration: 'none',
      ...style
    }}
  />
);

Link.displayName = 'Link';
