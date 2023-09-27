import { Slot } from '@radix-ui/react-slot';
import type React from 'react';

import { As, Margin, withMargin } from './utils';

interface HeadingOwnProps {}

export type HeadingAs = As<'h1', 'h2', 'h3', 'h4', 'h5', 'h6'>;
export type HeadingProps = HeadingAs & HeadingOwnProps & Margin;

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
