import type React from 'react';

type RootProps = React.ComponentPropsWithoutRef<'p'>;

export interface TextProps extends RootProps {}

export const Text: React.FC<Readonly<TextProps>> = ({ style, ...props }) => (
  <p
    {...props}
    data-id="@jsx-email/text"
    style={{
      fontSize: '14px',
      lineHeight: '24px',
      margin: '16px 0',
      ...style
    }}
  />
);

Text.displayName = 'Text';
