import { jsx as _jsx } from "react/jsx-runtime";
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/section' } : {};
export const Section = ({ children, style, ...props }) => (_jsx("table", { align: "center", width: "100%", ...props, ...debugProps, style: style, border: 0, cellPadding: "0", cellSpacing: "0", role: "presentation", children: _jsx("tbody", { children: _jsx("tr", { children: _jsx("td", { children: children }) }) }) }));
Section.displayName = 'Section';
//# sourceMappingURL=section.js.map