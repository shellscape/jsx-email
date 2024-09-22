import chalk from 'chalk';

import { log } from '../../log.js';

const noop = () => {};
const logWarning = (hook: string) =>
  log.warn(
    chalk`${hook} is present for React compatibility but is not fully supported. Email is not reactive.`
  );

export const useCallback = (fn: Function) => {
  logWarning('useCallback');
  return fn;
};

export const useEffect = () => {
  logWarning('useEffect');
};

export const useLayoutEffect = () => {
  logWarning('useLayoutEffect');
};

export function useMemo(fn: Function) {
  logWarning('useMemo');
  return fn();
}

export function useReducer(_: any, value: any, init: Function) {
  logWarning('useReducer');

  let result = value;
  if (typeof init === 'function') result = init(value);

  return [result, noop];
}

export const useRef = (value: any) => {
  logWarning('useRef');

  return { current: value };
};

export const useState = (value: any) => [value, noop];
