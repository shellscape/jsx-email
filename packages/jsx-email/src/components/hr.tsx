import React from 'react';

type RootProps = React.ComponentPropsWithoutRef<'hr'>;

export interface HrProps extends RootProps {}

export const Hr: React.FC<Readonly<HrProps>> = ({ style, ...props }) => (
  <hr
    {...props}
    data-id="@jsx-email/hr"
    style={{
      border: 'none',
      borderTop: '1px solid #eaeaea',
      width: '100%',
      ...style
    }}
  />
);

Hr.displayName = 'Hr';
