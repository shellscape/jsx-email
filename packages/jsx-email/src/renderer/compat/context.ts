import type {Consumer, ConsumerProps, Context, ProviderExoticComponent, ProviderProps} from 'react';

type EmailContextValue<T> = T[]

interface EmailContext<T> extends Context<T> {
  _value: EmailContextValue<T>
}

function _Provider<T>(ctx: EmailContextValue<T>): ProviderExoticComponent<ProviderProps<T>> {
  const provider = ({ children, value }: ProviderProps<T>) => {
    ctx.push(value);
    return children;
  };
  provider.$$typeof = Symbol.for('react.provider');
  provider.context = ctx;
  return provider;
}

function _Consumer<T>(ctx: EmailContextValue<T>): Consumer<T> {
  const consumer = ({ children }: ConsumerProps<T>) => {
    return children(ctx[ctx.length - 1]);
  };
  consumer.$$typeof = Symbol.for('react.consumer');
  return consumer;
}

export function createContext<T>(defaultValue: T): Context<T> {

  let value = [
    defaultValue
  ]

  const context: EmailContext<T> = {
    Provider: _Provider(value),
    Consumer: _Consumer(value),
    _value: value,
  };

  return context;
}

export function useContext<T>(context: Context<T>) {
  const ctx = (context as EmailContext<T>)._value;
  return ctx[ctx.length - 1];
}
