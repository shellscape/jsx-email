import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export const ColorScheme = ({ mode = 'normal' }) => {
    const style = `:root { color-scheme: ${mode}; supported-color-schemes: ${mode}; }`;
    return (_jsxs(_Fragment, { children: [_jsx("meta", { name: "color-scheme", content: mode }), _jsx("meta", { name: "supported-color-schemes", content: mode }), _jsx("style", { dangerouslySetInnerHTML: { __html: style } })] }));
};
ColorScheme.displayName = 'ColorScheme';
//# sourceMappingURL=color-scheme.js.map