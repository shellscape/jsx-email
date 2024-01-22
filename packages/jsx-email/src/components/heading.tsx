import { Slot } from '@radix-ui/react-slot';
import React from 'react';

import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

export type PresentAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

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

export type HeadingProps = BaseProps<PresentAs> & Margin & { as?: PresentAs };

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/heading' } : {};

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

export const Heading: JsxEmailComponent<HeadingProps> = ({
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
}) => (
  <Slot
    {...props}
    {...debugProps}
    style={{ ...withMargin({ m, mb, ml, mr, mt, mx, my }), ...style }}
  >
    <Tag>{children}</Tag>
  </Slot>
);

Heading.displayName = 'Heading';
