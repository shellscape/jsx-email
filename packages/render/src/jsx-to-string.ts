/**
 * Note: Parts of this file are derived from [Hyperons](https://github.com/i-like-robots/hyperons).
 * @license MIT
 */

import type { FC, ReactNode } from 'react';

import { escapeString } from './escape-string';
import { stringifyStyles } from './stringify-styles';

const ATTR_ALIASES = {
  acceptCharset: 'acceptcharset',
  accessKey: 'accesskey',
  allowFullScreen: 'allowfullscreen',
  autoCapitalize: 'autocapitalize',
  autoComplete: 'autocomplete',
  autoCorrect: 'autocorrect',
  autoFocus: 'autofocus',
  autoPlay: 'autoplay',
  charSet: 'charset',
  className: 'class',
  colSpan: 'colspan',
  contentEditable: 'contenteditable',
  crossOrigin: 'crossorigin',
  dateTime: 'datetime',
  defaultChecked: 'checked',
  defaultSelected: 'selected',
  defaultValue: 'value',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
  longDesc: 'longdesc',
  maxLength: 'maxlength',
  minLength: 'minlength',
  noModule: 'nomodule',
  noValidate: 'novalidate',
  readOnly: 'readonly',
  referrerPolicy: 'referrerpolicy',
  rowSpan: 'rowspan',
  spellCheck: 'spellcheck',
  tabIndex: 'tabindex',
  useMap: 'usemap'
};

// <https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes>
const BOOLEAN_ATTRS = new Set([
  'async',
  'allowfullscreen',
  'allowpaymentrequest',
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'default',
  'defer',
  'disabled',
  'formnovalidate',
  'hidden',
  'ismap',
  'multiple',
  'muted',
  'novalidate',
  'nowrap',
  'open',
  'readonly',
  'required',
  'reversed',
  'selected'
]);

// https://www.w3.org/TR/html/syntax.html#void-elements
const VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]);

const EMPTY_OBJECT = Object.freeze({});

/**
 * Convert a JSX element to a string.
 * This is a slightly modified version of Hyperons's
 * [`renderToString`](https://github.com/i-like-robots/hyperons/blob/main/src/render-to-string.js) function.
 *
 * @param element The JSX element to convert to a string
 * @returns The string representation of the JSX element
 */
export function jsxToString(element: ReactNode): string {
  if (element == null) {
    return '';
  }
  if (typeof element === 'string') {
    return escapeString(element);
  } else if (typeof element === 'number') {
    return String(element);
  } else if (typeof element === 'boolean' || element == null) {
    return '';
  } else if (isIterable(element)) {
    let html = '';
    for (const child of element) {
      html += jsxToString(child);
    }
    return html;
  }

  if (typeof (element as { $$typeof?: symbol }).$$typeof !== 'symbol') {
    throw new Error('Unsupported JSX element:', element as any);
  }

  const { type } = element;
  const props = element.props || EMPTY_OBJECT;

  if (typeof type === 'string') {
    let html = `<${type}`;

    let innerHTML = '';

    for (const prop of Object.keys(props) as ReadonlyArray<keyof typeof props & string>) {
      const value = props[prop];

      if (prop === 'children' || prop === 'key' || prop === 'ref' || value == null) {
        // Why not use a continue statement? It's slower ¯\_(ツ)_/¯
      } else if (prop === 'class' || prop === 'className') {
        // This condition is here because it is the most common attribute
        // and short-circuiting results in a ~5% performance boost.
        html += value ? ` class="${escapeString(value)}"` : '';
      } else if (prop === 'style') {
        html += ` style="${stringifyStyles(value)}"`;
      } else if (prop === 'dangerouslySetInnerHTML') {
        // eslint-disable-next-line no-underscore-dangle
        innerHTML = value.__html;
      } else {
        const name = ATTR_ALIASES[prop as keyof typeof ATTR_ALIASES] || prop;

        if (BOOLEAN_ATTRS.has(name)) {
          html += value ? ` ${name}` : '';
        } else if (typeof value === 'string') {
          html += ` ${name}="${escapeString(value)}"`;
        } else if (typeof value === 'number') {
          html += ` ${name}="${String(value)}"`;
        } else if (typeof value === 'boolean') {
          html += ` ${name}="${value}"`;
        }
      }
    }

    if (VOID_ELEMENTS.has(type)) {
      html += '/>';
    } else {
      html += '>';

      if (innerHTML) {
        html += innerHTML;
      } else {
        html += jsxToString(props.children);
      }

      html += `</${type}>`;
    }

    return html;
  } else if (type) {
    if (typeof type === 'function') {
      return jsxToString((type as FC)(props));
    } else if (typeof type === 'symbol') {
      // is this react fragment?
      if (Symbol.keyFor(type) === 'react.fragment') {
        return jsxToString(props.children);
      }
    } else if (isReactForwardRef(type)) {
      return jsxToString(
        (type as { render: (props: unknown, ref: unknown) => ReactNode }).render(props, props.ref)
      );
    }
    throw new Error(`Unsupported JSX element type: ${String(type)}`);
  }
  return '';
}

function isIterable(node: unknown): node is Iterable<unknown> {
  return typeof node === 'object' && node !== null && Symbol.iterator in node;
}

function isReactForwardRef(
  type: unknown
): type is { $$typeof: symbol; render: (props: unknown, ref: unknown) => ReactNode } {
  return (
    typeof type === 'object' &&
    type !== null &&
    'render' in type &&
    '$$typeof' in type &&
    typeof type.$$typeof === 'symbol' &&
    Symbol.keyFor(type.$$typeof) === 'react.forward_ref'
  );
}
