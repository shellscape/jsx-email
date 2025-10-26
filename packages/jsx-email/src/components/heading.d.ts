import React from 'react';
import type { BaseProps, JsxEmailComponent } from '../types.js';
export type PresentAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type MarginCSSProperty = React.CSSProperties['margin' | 'marginLeft' | 'marginRight' | 'marginTop' | 'marginBottom'];
export interface Margin {
    m?: number | string;
    mb?: number | string;
    ml?: number | string;
    mr?: number | string;
    mt?: number | string;
    mx?: number | string;
    my?: number | string;
}
export type HeadingProps = BaseProps<PresentAs> & Margin & {
    as?: PresentAs;
};
export declare const withSpace: (value: number | string | undefined, properties: MarginCSSProperty[]) => {};
export declare const withMargin: (props: Margin) => {};
export declare const Heading: JsxEmailComponent<HeadingProps>;
export {};
//# sourceMappingURL=heading.d.ts.map