import React from 'react';
import type { JsxEmailComponent } from '../types.js';
type FallbackFont = 'Arial' | 'Helvetica' | 'Verdana' | 'Georgia' | 'Times New Roman' | 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'fantasy';
type FontFormat = 'woff' | 'woff2' | 'truetype' | 'opentype' | 'embedded-opentype' | 'svg';
type FontStyle = React.CSSProperties['fontStyle'];
type FontWeight = React.CSSProperties['fontWeight'];
export interface FontProps {
    /** An array is possible, but the order of the array is the priority order */
    fallbackFontFamily: FallbackFont | FallbackFont[];
    /** The font you want to use. NOTE: Do not insert multiple fonts here, use fallbackFontFamily for that */
    fontFamily: string;
    /** Default: 'normal' */
    fontStyle?: FontStyle;
    /** Default: 400 */
    fontWeight?: FontWeight;
    /** Not all clients support web fonts. For support check: https://www.caniemail.com/features/css-at-font-face/ */
    webFont?: {
        format: FontFormat;
        url: string;
    };
}
/** The component MUST be place inside the <head> tag */
export declare const Font: JsxEmailComponent<FontProps>;
export {};
//# sourceMappingURL=font.d.ts.map