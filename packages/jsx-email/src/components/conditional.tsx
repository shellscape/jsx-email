import React, { Suspense } from 'react';

import { jsxToString } from '../renderer/jsx-to-string.js';
import { useData } from '../renderer/suspense.js';
import type { JsxEmailComponent } from '../types.js';

// Note: no need to import Raw here; Conditional now always follows the legacy
// jsxToString path so that behavior matches previous snapshots across the
// codebase. This is in response to review feedback to remove Raw-detection.

export interface ConditionalProps {
  children?: React.ReactNode;
  expression?: string;
  head?: boolean;
  mso?: boolean;
}

const notMso = (html: string) => `<!--[if !mso]><!-->${html}<!--<![endif]-->`;
const comment = (expression: string, html: string) => `<!--[if ${expression}]>${html}<![endif]-->`;

const Renderer = (props: ConditionalProps) => {
  const { children, head, mso } = props;
  let { expression } = props;

  // Legacy path: stringify children now to preserve existing snapshots/output
  // for non-Raw content.
  const html = useData(props, () => jsxToString(<>{children}</>));
  let innerHtml = '';

  if (mso === false) innerHtml = notMso(html);
  else if (mso === true && !expression) expression = 'mso';
  if (expression) innerHtml = comment(expression, html);

  const Component = head ? 'head' : 'jsx-email-cond';

  // @ts-ignore
  // Note: This is perfectly valid. TS just expects lowercase tag names to match a specific type
  return <Component dangerouslySetInnerHTML={{ __html: innerHtml }} />;
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
