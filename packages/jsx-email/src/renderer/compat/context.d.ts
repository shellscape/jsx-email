import type { Context } from 'react';
type EmailContextValue<T> = T[];
export declare const createContext: <TValue>(defaultValue: TValue) => Context<TValue>;
export declare const useContext: <TValue>(context: Context<TValue>) => TValue;
export declare const readContext: <TValue>(context: Context<TValue>) => EmailContextValue<TValue>;
export {};
//# sourceMappingURL=context.d.ts.map