import type { ConfigBase } from '@unocss/core';
export interface TailwindProps {
    config?: Pick<ConfigBase, 'layers' | 'presets' | 'rules' | 'separators' | 'shortcuts' | 'theme' | 'variants'>;
    production?: boolean;
}
export declare const Tailwind: ({ children, ...props }: React.PropsWithChildren<TailwindProps>) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tailwind.d.ts.map