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
