import React from 'react';

import type { JsxEmailComponent } from '../types.js';

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'jsx-email-cond': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'data-expression'?: string;
          'data-mso'?: 'true' | 'false';
        },
        HTMLElement
      >;
    }
  }
}

export interface ConditionalProps {
  children?: React.ReactNode;
  expression?: string;
  head?: boolean;
  mso?: boolean;
}

// Type alias for the intrinsic conditional marker element
// Avoid referencing the global `JSX` namespace directly to keep type
// resolution stable under different TS JSX settings.
type ConditionalElementProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    'data-expression'?: string;
    'data-mso'?: 'true' | 'false';
  },
  HTMLElement
>;

/**
 * Emits a marker element (<jsx-email-cond>) that the render pipeline transforms
 * into HTML conditional comments. Note: jsxToString() will output the marker
 * element as-is; use render() to produce final conditional comments.
 */
export const Conditional: JsxEmailComponent<ConditionalProps> = (props) => {
  const { children, head, mso } = props;
  const expression = props.expression?.trim();

  if (typeof expression === 'string' && expression.length === 0) {
    throw new RangeError('jsx-email: Conditional expects a non-empty `expression` when provided');
  }

  if (typeof expression === 'undefined' && typeof mso === 'undefined')
    throw new RangeError(
      'jsx-email: Conditional expects the `expression` or `mso` prop to be defined'
    );

  if (typeof expression !== 'undefined' && typeof mso !== 'undefined')
    throw new RangeError(
      'jsx-email: Conditional expects the `expression` or `mso` prop to be defined, not both'
    );

  // Build a lightweight marker element that the rehype plugin will transform
  // into a conditional comment block. We do not inline HTML here.
  const attrs: ConditionalElementProps = {};
  if (typeof mso === 'boolean') attrs['data-mso'] = mso ? 'true' : 'false';
  if (typeof expression === 'string') attrs['data-expression'] = expression;

  // Emit a marker element that the rehype plugin will transform.
  // - In <head>, use a <meta> marker because custom elements are not
  //   allowed in <head> in many HTML parsers. This ensures the marker stays
  //   in the head section through parsing.
  // - Elsewhere, emit a lightweight custom element.
  if (head) {
    return (
      <meta
        data-jsx-email-cond="true"
        {...(attrs['data-mso'] ? { 'data-mso': attrs['data-mso'] } : {})}
        {...(attrs['data-expression'] ? { 'data-expression': attrs['data-expression'] } : {})}
      />
    );
  }

  return <jsx-email-cond {...attrs}>{children}</jsx-email-cond>;
};

Conditional.displayName = 'Conditional';
