import { Slot } from '@radix-ui/react-slot';
import React from 'react';

export type As<
  DefaultTag extends React.ElementType,
  T1 extends React.ElementType,
  T2 extends React.ElementType = T1,
  T3 extends React.ElementType = T1,
  T4 extends React.ElementType = T1,
  T5 extends React.ElementType = T1
> =
  | (React.ComponentPropsWithRef<DefaultTag> & {
      as?: DefaultTag;
    })
  | (React.ComponentPropsWithRef<T1> & {
      as: T1;
    })
  | (React.ComponentPropsWithRef<T2> & {
      as: T2;
    })
  | (React.ComponentPropsWithRef<T3> & {
      as: T3;
    })
  | (React.ComponentPropsWithRef<T4> & {
      as: T4;
    })
  | (React.ComponentPropsWithRef<T5> & {
      as: T5;
    });

type MarginCSSProperty = React.CSSProperties[
  | 'margin'
  | 'marginLeft'
  | 'marginRight'
  | 'marginTop'
  | 'marginBottom'];

export interface Margin {
  m?: number | string;
  mb?: number | string;
  ml?: number | string;
  mr?: number | string;
  mt?: number | string;
  mx?: number | string;
  my?: number | string;
}

export type HeadingAs = As<'h1', 'h2', 'h3', 'h4', 'h5', 'h6'>;
export type HeadingProps = HeadingAs & Margin;

export const withSpace = (value: number | string | undefined, properties: MarginCSSProperty[]) =>
  properties.reduce((styles, property) => {
    // Check to ensure string value is a valid number
    if (!isNaN(parseFloat(value as string))) {
      return { ...styles, [property as keyof MarginCSSProperty]: `${value}px` };
    }
    return styles;
  }, {});

export const withMargin = (props: Margin) => {
  const nonEmptyStyles = [
    withSpace(props.m, ['margin']),
    withSpace(props.mx, ['marginLeft', 'marginRight']),
    withSpace(props.my, ['marginTop', 'marginBottom']),
    withSpace(props.mt, ['marginTop']),
    withSpace(props.mr, ['marginRight']),
    withSpace(props.mb, ['marginBottom']),
    withSpace(props.ml, ['marginLeft'])
  ].filter((s) => Object.keys(s).length);

  const mergedStyles = nonEmptyStyles.reduce((acc, style) => {
    return { ...acc, ...style };
  }, {});
  return mergedStyles;
};

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
    data-id="jsx-email/heading"
    style={{ ...withMargin({ m, mb, ml, mr, mt, mx, my }), ...style }}
  >
    <Tag>{children}</Tag>
  </Slot>
);

Heading.displayName = 'Heading';
