/**
  src: https://github.com/facebook/react/blob/3b009b4cd58d382cfde2a72232c87df1a34d56d5/packages/react/src/jsx/ReactJSXElement.js#L993
 */

const REACT_ELEMENT_TYPE = Symbol.for('react.element');

interface ReactElementLike {
  $$typeof: symbol;
  key: string | null;
  props: Record<string, unknown>;
  ref: any;
  type: string | Function | symbol | { render?: Function };
}

export function isValidElement(object: unknown): object is ReactElementLike {
  return (
    typeof object === 'object' &&
    object !== null &&
    (object as ReactElementLike).$$typeof === REACT_ELEMENT_TYPE
  );
}
