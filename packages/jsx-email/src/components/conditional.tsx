import React, { Suspense } from 'react';

import { jsxToString } from '../renderer/jsx-to-string.js';
import { useData } from '../renderer/suspense.js';
import type { JsxEmailComponent } from '../types.js';

import { Raw } from './raw.js';

export interface ConditionalProps {
  children?: React.ReactNode;
  expression?: string;
  head?: boolean;
  mso?: boolean;
}

const notMso = (html: string) => `<!--[if !mso]><!-->${html}<!--<![endif]-->`;
const comment = (expression: string, html: string) => `<!--[if ${expression}]>${html}<![endif]-->`;

function hasRaw(node: React.ReactNode): boolean {
  if (
    node == null ||
    typeof node === 'boolean' ||
    typeof node === 'number' ||
    typeof node === 'string'
  )
    return false;
  if (Array.isArray(node)) return node.some(hasRaw);
  if (React.isValidElement(node)) {
    const { type } = node;
    if (
      type === Raw ||
      type?.displayName === 'Raw' ||
      (typeof type === 'string' && type === 'jsx-email-raw')
    )
      return true;
    // Recurse into children of composite elements
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return hasRaw((node.props as any)?.children);
  }
  return false;
}

const Renderer = (props: ConditionalProps) => {
  const { children, head, mso } = props;
  let { expression } = props;

  // If any <Raw> exists within the children, defer wrapping to the rehype plugin
  // by emitting a marker element. This preserves exact Raw casing and avoids
  // escaping.
  if (hasRaw(children)) {
    const attrs: Record<string, string> = {};
    if (typeof mso !== 'undefined') attrs['data-mso'] = String(!!mso);
    if (expression) attrs['data-expression'] = expression;
    // @ts-ignore: custom tag by design
    return <jsx-email-cond {...attrs}>{children}</jsx-email-cond>;
  }

  // Legacy path: stringify children now to preserve existing snapshots/output
  // for non-Raw content.
  const html = useData(props, () => jsxToString(<>{children}</>));
  let innerHtml = '';

  if (mso === false) innerHtml = notMso(html);
  else if (mso === true && !expression) expression = 'mso';
  if (expression) innerHtml = comment(expression, html);

  const Component = head ? 'head' : 'jsx-email-cond';

  // @ts-ignore lower-case tag name used intentionally
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
