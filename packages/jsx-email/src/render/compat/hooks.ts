import { dispatcher } from './react';

const noop = () => {};

export function useCallback(fn: Function) {
  return fn;
}

export function useContext(instance: any) {
  return instance.getChildContext(dispatcher.context);
}

export function useEffect() {}

export function useLayoutEffect() {}

export function useMemo(fn: any) {
  return fn();
}

export function useReducer(_: any, value: any, init: any) {
  if (typeof init === 'function') {
    value = init(value);
  }

  return [value, noop];
}

export function useRef(value: any) {
  return { current: value };
}

export function useState(value: any) {
  return [value, noop];
}
