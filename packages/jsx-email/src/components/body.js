import { jsx as _jsx } from "react/jsx-runtime";
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/body' } : {};
export const Body = ({ children, style, ...props }) => (_jsx("body", { ...props, ...debugProps, style: style, children: children }));
Body.displayName = 'Body';
//# sourceMappingURL=body.js.map