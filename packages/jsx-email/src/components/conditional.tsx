import React, { Suspense } from 'react';

import type { JsxEmailComponent } from '../types.js';
import { useContext } from '../renderer/compat/context.js';
import { RenderModeContext } from '../renderer/mode.js';
import { jsxToString } from '../renderer/jsx-to-string.js';
import { useData } from '../renderer/suspense.js';

export interface ConditionalProps {
  children?: React.ReactNode;
  expression?: string;
  head?: boolean;
  mso?: boolean;
}

const Renderer = (props: ConditionalProps) => {
  const { children, head, expression, mso } = props;
  const mode = useContext(RenderModeContext);

  if (mode === 'render') {
    const attrs: Record<string, string> = {};
    if (typeof mso !== 'undefined') attrs['data-mso'] = String(!!mso);
    if (expression) attrs['data-expression'] = expression;

    // @ts-ignore custom element tag is intentional
    const marker = <jsx-email-cond {...attrs}>{children}</jsx-email-cond>;
    return head ? marker : marker;
  }

  const notMso = (html: string) => `<!--[if !mso]><!-->${html}<!--<![endif]-->`;
  const comment = (expr: string, html: string) => `<!--[if ${expr}]>${html}<![endif]-->`;

  let expr = expression;
  const html = useData(props, () => jsxToString(<>{children}</>));
  let innerHtml = '';

  if (mso === false) innerHtml = notMso(html);
  else if (mso === true && !expr) expr = 'mso';
  if (expr) innerHtml = comment(expr, html);

  const Component = head ? 'head' : 'jsx-email-cond';
  // @ts-ignore: lowercase custom tag is intentional
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
