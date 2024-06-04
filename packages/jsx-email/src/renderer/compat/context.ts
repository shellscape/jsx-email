import type {
  Consumer,
  ConsumerProps,
  Context,
  ProviderExoticComponent,
  ProviderProps
} from 'react';

type EmailContextValue<T> = T[];

interface JsxEmailContext<TValue> extends Context<TValue> {
  internalValue: EmailContextValue<TValue>;
}

function InternalProvider<TValue>(
  ctx: EmailContextValue<TValue>
): ProviderExoticComponent<ProviderProps<TValue>> {
  const provider = ({ children, value }: ProviderProps<TValue>) => {
    ctx.push(value);
    return children;
  };
  provider.$$typeof = Symbol.for('react.provider');
  provider.context = ctx;
  return provider;
}

const InternalConsumer = <TValue>(ctx: EmailContextValue<TValue>): Consumer<TValue> => {
  const consumer = ({ children }: ConsumerProps<TValue>) => children(ctx[ctx.length - 1]);
  consumer.$$typeof = Symbol.for('react.consumer');
  return consumer;
};

export const createContext = <TValue>(defaultValue: TValue): Context<TValue> => {
  const value = [defaultValue];

  const context: JsxEmailContext<TValue> = {
    Consumer: InternalConsumer(value),
    internalValue: value,
    Provider: InternalProvider(value)
  };

  return context;
};

export const useContext = <TValue>(context: Context<TValue>) => {
  const ctx = (context as JsxEmailContext<TValue>).internalValue;
  return ctx[ctx.length - 1];
};

export const readContext = <TValue>(context: Context<TValue>) =>
  (context as JsxEmailContext<TValue>).internalValue;
