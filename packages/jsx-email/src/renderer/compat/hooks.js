import chalk from 'chalk';
import { log } from '../../log.js';
const noop = () => { };
const logWarning = (hook) => log.warn(chalk `${hook} is present for React compatibility but is not fully supported. Email is not reactive.`);
export const useCallback = (fn) => {
    logWarning('useCallback');
    return fn;
};
export const useEffect = () => {
    logWarning('useEffect');
};
export const useLayoutEffect = () => {
    logWarning('useLayoutEffect');
};
export function useMemo(fn) {
    logWarning('useMemo');
    return fn();
}
export function useReducer(_, value, init) {
    logWarning('useReducer');
    let result = value;
    if (typeof init === 'function')
        result = init(value);
    return [result, noop];
}
export const useRef = (value) => {
    logWarning('useRef');
    return { current: value };
};
export const useState = (value) => [value, noop];
//# sourceMappingURL=hooks.js.map