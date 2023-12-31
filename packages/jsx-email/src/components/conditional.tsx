import React, { Suspense } from 'react';

import { jsxToString, useData } from '../render/jsx-to-string';
import type { JsxEmailComponent } from '../types';

export interface ConditionalProps {
  children?: React.ReactNode;
  expression?: string;
  mso?: boolean;
}

const notMso = (html: string) => `<!--[if !mso]><!-->${html}<!--<![endif]-->`;

const comment = (expression: string, html: string) => `<!--[if ${expression}]>${html}<![endif]-->`;

const Renderer = (props: ConditionalProps) => {
  const { children, mso } = props;
  let { expression } = props;
  const html = useData(props, () => jsxToString(<>{children}</>));
  let innerHtml = '';

  if (mso === false) innerHtml = notMso(html);
  else if (mso === true && !expression) expression = 'mso';
  if (expression) innerHtml = comment(expression, html);

  // @ts-ignore
  // Note: This is perfectly valid. TS just expects lowercase tag names to match a specific type
  return <jsx-email-cond dangerouslySetInnerHTML={{ __html: innerHtml }} />;
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
    <>
      <Suspense fallback={<div>waiting</div>}>
        <Renderer {...props}>{children}</Renderer>
      </Suspense>
    </>
  );
};

Conditional.displayName = 'Conditional';
