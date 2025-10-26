import React from 'react';
import type { JsxEmailComponent } from '../types.js';
declare module 'react/jsx-runtime' {
    namespace JSX {
        interface IntrinsicElements {
            'jsx-email-raw': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
                dangerouslySetInnerHTML?: {
                    __html: string;
                };
                'data-skip'?: string;
            }, HTMLElement>;
        }
    }
}
export interface RawProps {
    content: string;
    disablePlainTextOutput?: boolean;
}
export declare const Raw: JsxEmailComponent<RawProps>;
//# sourceMappingURL=raw.d.ts.map