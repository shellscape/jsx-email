import React, { Suspense } from 'react';

import type { JsxEmailComponent } from '../types.js';

export interface ConditionalProps {
  children?: React.ReactNode;
  expression?: string;
  head?: boolean;
  mso?: boolean;
}

const Renderer = (props: ConditionalProps) => {
  const { children, head, expression, mso } = props;

  // We no longer serialize the children to a string at component render time.
  // Instead, we emit a marker element and let a rehype plugin wrap the contents
  // with the proper MSO conditional comment in the HTML pipeline. This preserves
  // child structure so the Raw plugin can lift <jsx-email-raw> first.

  const attrs: Record<string, string> = {};
  if (typeof mso !== 'undefined') attrs['data-mso'] = String(!!mso);
  if (expression) attrs['data-expression'] = expression;

  // @ts-ignore custom element tag is intentional
  const marker = <jsx-email-cond {...attrs}>{children}</jsx-email-cond>;

  return head ? <head>{marker}</head> : marker;
};

export const Conditional: JsxEmailComponent<ConditionalProps> = (props) => {
  const { children, expression, mso } = props;

  if (typeof expression === 'undefined' && typeof mso === 'undefined')
    throw new RangeError(
      'jsx-email: Conditional expects the `expression` or `mso` prop to be defined'
    );

  if (typeof expression !== 'undefined' && typeof mso !== 'undefined')
    throw new RangeError(
      'jsx-email: Conditional expects the `expression` or `mso` prop to be defined, not both'
    );

  return (
    <Suspense fallback={<div>waiting</div>}>
      <Renderer {...props}>{children}</Renderer>
    </Suspense>
  );
};

Conditional.displayName = 'Conditional';
