import { Slot } from '@radix-ui/react-slot';
import React from 'react';

import { type As, type Margin, withMargin } from './utils';

export type HeadingAs = As<'h1', 'h2', 'h3', 'h4', 'h5', 'h6'>;
export type HeadingProps = HeadingAs & Margin;

export const Heading = ({
  as: Tag = 'h1',
  children,
  style,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  ...props
}: React.PropsWithChildren<Readonly<HeadingProps>>) => (
  <Slot
    {...props}
    data-id="@jsx-email/heading"
    style={{ ...withMargin({ m, mb, ml, mr, mt, mx, my }), ...style }}
  >
    <Tag>{children}</Tag>
  </Slot>
);

Heading.displayName = 'Heading';
