import * as React from 'react';

type HrElement = React.ElementRef<'hr'>;
type RootProps = React.ComponentPropsWithoutRef<'hr'>;

export interface HrProps extends RootProps {}

export const Hr = React.forwardRef<HrElement, Readonly<HrProps>>(
  ({ style, ...props }, forwardedRef) => (
    <hr
      {...props}
      ref={forwardedRef}
      data-id="@jsx-email/hr"
      style={{
        border: 'none',
        borderTop: '1px solid #eaeaea',
        width: '100%',
        ...style
      }}
    />
  )
);

Hr.displayName = 'Hr';
