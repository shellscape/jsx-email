import React from 'react';
import type { JsxEmailComponent } from '../types.js';
declare module 'react/jsx-runtime' {
    namespace JSX {
        interface IntrinsicElements {
            'jsx-email-cond': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                'data-expression'?: string;
                'data-head'?: boolean;
                'data-mso'?: boolean;
            }, HTMLElement>;
        }
    }
}
export interface ConditionalProps {
    children?: React.ReactNode;
    expression?: string;
    head?: boolean;
    mso?: boolean;
}
export declare const Conditional: JsxEmailComponent<ConditionalProps>;
//# sourceMappingURL=conditional.d.ts.map