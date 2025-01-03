/**
 * Note: Parts of this file are derived from [Hyperons](https://github.com/i-like-robots/hyperons).
 * @license MIT
 */
import chalk from 'chalk';
import { isValidElement, type FC, type ReactNode } from 'react';

import { log } from '../log.js';

import { AttributeAliases, BooleanAttributes, EmptyObject, VoidElements } from './constants.js';
import { escapeString } from './escape-string.js';
import { stringifyStyles } from './stringify-styles.js';

const renderSuspense = async (children: ReactNode[]): ReturnType<typeof jsxToString> => {
  try {
    const result = await jsxToString(children);
    return result;
  } catch (error) {
    if (error instanceof Promise) {
      await error;
      return renderSuspense(children);
    }
    throw error;
  }
};

/**
 * Convert a JSX element to a string.
 * This is a slightly modified version of Hyperons's
 * [`renderToString`](https://github.com/i-like-robots/hyperons/blob/main/src/render-to-string.js) function.
 *
 * @param element The JSX element to convert to a string
 * @returns The string representation of the JSX element
 */
export async function jsxToString(element: ReactNode): Promise<string> {
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
      // eslint-disable-next-line no-await-in-loop
      html += await jsxToString(child);
    }
    return html;
  }

  // if (typeof (element as { $$typeof?: symbol }).$$typeof !== 'symbol') {
  //   log.error(chalk`{red Unsupported JSX element}:`, element);
  //   throw new Error(`Unsupported JSX element`);
  // }

  // Handle Promise case
  if (element instanceof Promise) {
    const resolvedElement = await element;
    return jsxToString(resolvedElement);
  }

  // Use isValidElement for proper type checking
  if (!isValidElement(element)) {
    log.error(chalk`{red Unsupported JSX element}:`, element);
    throw new Error(`Unsupported JSX element`);
  }

  const { type } = element;
  const props = element.props || EmptyObject;

  if (typeof type === 'string') {
    let html = `<${type}`;

    let innerHTML = '';

    for (const prop of Object.keys(props) as unknown as ReadonlyArray<
      keyof typeof props & string
    >) {
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
        innerHTML = (value as { __html: string }).__html;
      } else {
        const name = AttributeAliases[prop as keyof typeof AttributeAliases] || prop;

        if (BooleanAttributes.has(name)) {
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

    if (VoidElements.has(type)) {
      html += '/>';
    } else {
      html += '>';

      if (innerHTML) {
        html += innerHTML;
      } else {
        html += await jsxToString((props as { children?: ReactNode }).children);
      }

      html += `</${type}>`;
    }

    return html;
  } else if (type) {
    if (typeof type === 'function') {
      // const renderedFC = await jsxToString((type as FC)(props));
      const result = (type as FC)(props);
      const renderedFC = await (result instanceof Promise
        ? result.then(jsxToString)
        : jsxToString(result));
      const sym = (type as { $$typeof?: symbol }).$$typeof;

      if (sym && Symbol.keyFor(sym) === 'react.provider') {
        (type as any as { context: any[] }).context.pop();
      }

      return renderedFC;
    } else if (typeof type === 'symbol') {
      const key = Symbol.keyFor(type);
      // is this react fragment?
      if (key === 'react.fragment') {
        return jsxToString((props as { children?: ReactNode }).children);
      } else if (key === 'react.suspense') {
        const suspenseResult = await renderSuspense((props as { children: ReactNode[] }).children);
        return suspenseResult;
      }
    } else if (isReactForwardRef(type)) {
      return jsxToString(
        (type as { render: (props: unknown, ref: unknown) => ReactNode }).render(
          props,
          (props as { ref: unknown }).ref
        )
      );
    } else if ((type as { $$typeof?: symbol }).$$typeof) {
      const key = Symbol.keyFor((type as { $$typeof: symbol }).$$typeof);
      if (key === 'react.provider') {
        (type as any as { context: any[] }).context.pop();
      } else if (key === 'react.context') {
        return jsxToString((props as { children?: ReactNode }).children);
      }
    }

    log.error(chalk`{red Unsupported JSX element}:`, type);
    throw new Error(`Unsupported JSX element type ${JSON.stringify(type)}`);
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
