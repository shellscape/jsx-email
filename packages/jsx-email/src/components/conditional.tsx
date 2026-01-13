import React from 'react';

import type { JsxEmailComponent } from '../types.js';

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
  return React.createElement(
    'jsx-email-cond',
    { 'data-mso': mso, 'data-expression': expression, 'data-head': head },
    children
  );
};

Conditional.displayName = 'Conditional';
