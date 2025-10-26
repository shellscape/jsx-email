import React from 'react';
import type { JsxEmailComponent } from '../types.js';

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'jsx-email-cond': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'data-expression'?: string;
          'data-head'?: boolean;
          'data-mso'?: boolean;
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

export const Conditional: JsxEmailComponent<ConditionalProps> = (props) => {
  const { children, expression, mso, head } = props;

  if (typeof expression === 'undefined' && typeof mso === 'undefined')
    throw new RangeError(
      'jsx-email: Conditional expects the `expression` or `mso` prop to be defined'
    );

  if (typeof expression !== 'undefined' && typeof mso !== 'undefined')
    throw new RangeError(
      'jsx-email: Conditional expects the `expression` or `mso` prop to be defined, not both'
    );

  // Always render a JSX custom element with data-* markers.
  // A rehype plugin will replace this element with proper conditional comments.
  // @ts-ignore - lower-case custom element tag is valid
  return (
    <jsx-email-cond data-mso={mso} data-expression={expression} data-head={head}>
      {children}
    </jsx-email-cond>
  );
};

Conditional.displayName = 'Conditional';
