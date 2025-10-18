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

/**
 * Emits a marker element (<jsx-email-cond>) that the render pipeline transforms
 * into HTML conditional comments. Note: jsxToString() will output the marker
 * element as-is; use render() to produce final conditional comments.
 */
export const Conditional: JsxEmailComponent<ConditionalProps> = (props) => {
  const { children, head, mso } = props;
  const expr = props.expression?.trim();

  if (typeof expr === 'string' && expr.length === 0) {
    throw new RangeError('jsx-email: Conditional expects a non-empty `expression` when provided');
  }

  if (typeof expr === 'undefined' && typeof mso === 'undefined')
    throw new RangeError(
      'jsx-email: Conditional expects the `expression` or `mso` prop to be defined'
    );

  if (typeof expr !== 'undefined' && typeof mso !== 'undefined')
    throw new RangeError(
      'jsx-email: Conditional expects the `expression` or `mso` prop to be defined, not both'
    );

  // Build a lightweight marker element that the rehype plugin will transform
  // into a conditional comment block. We do not inline HTML here.
  type CondElProps = JSX.IntrinsicElements['jsx-email-cond'];
  const attrs: CondElProps = {};
  if (typeof mso === 'boolean') attrs['data-mso'] = mso ? 'true' : 'false';
  if (typeof expr === 'string') attrs['data-expression'] = expr;

  const node = <jsx-email-cond {...attrs}>{children}</jsx-email-cond>;

  return head ? <head>{node}</head> : node;
};

Conditional.displayName = 'Conditional';
