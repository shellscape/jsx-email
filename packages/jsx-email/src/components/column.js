import { jsx as _jsx } from "react/jsx-runtime";
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/column' } : {};
export const Column = ({ children, bgColor, bgImage, style, ...props }) => (_jsx("td", { 
    // @ts-expect-error: `background` and `bgcolor` not documented
    background: bgImage, bgcolor: bgColor, ...props, ...debugProps, style: style, children: children }));
Column.displayName = 'Column';
//# sourceMappingURL=column.js.map