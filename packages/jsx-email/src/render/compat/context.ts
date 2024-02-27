import { FC, PropsWithChildren } from "react";

const ReactProviderSymbol = Symbol.for('react.provider');
export const ReactContextSymbol = Symbol.for('react.context');

interface ProviderProps extends PropsWithChildren {
  value: any;
}

interface ContextCompat {
  $$typeof: typeof ReactContextSymbol;
  currentValue: any;
  Consumer: any;
  Provider: ProviderProps;
}

// Note: hyperons and preact do a cool thing where they attach a reference to the context to children
// that avoids having crazy queues or stacks like fibers does

export function createContext<T>(defaultValue: any = {}) {

    const context: ContextCompat = {
      $$typeof: ReactContextSymbol,
      currentValue: defaultValue
    };
    context.Consumer = context;
    context.Provider = {
      $$typeof: ReactProviderSymbol,
      _context: context,
    };

    context.;

    if (__DEV__) {
      const Consumer: any = {
        $$typeof: REACT_CONTEXT_TYPE,
        _context: context,
      };
      Object.defineProperties(Consumer, {
        Provider: {
          get() {
            return context.Provider;
          },
          set(_Provider: any) {
            context.Provider = _Provider;
          },
        },
        _currentValue: {
          get() {
            return context._currentValue;
          },
          set(_currentValue: T) {
            context._currentValue = _currentValue;
          },
        },
        _currentValue2: {
          get() {
            return context._currentValue2;
          },
          set(_currentValue2: T) {
            context._currentValue2 = _currentValue2;
          },
        },
        _threadCount: {
          get() {
            return context._threadCount;
          },
          set(_threadCount: number) {
            context._threadCount = _threadCount;
          },
        },
        Consumer: {
          get() {
            return context.Consumer;
          },
        },
        displayName: {
          get() {
            return context.displayName;
          },
          set(displayName: void | string) {},
        },
      });
      (context: any).Consumer = Consumer;
    } else {
      (context: any)
    }


  if (__DEV__) {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}
