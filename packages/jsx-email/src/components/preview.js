import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/preview' } : {};
const maxLength = 150;
export const renderWhiteSpace = (text) => {
    if (text.length >= maxLength)
        return null;
    const whiteSpaceCodes = '\xa0\u200C\u200B\u200D\u200E\u200F\uFEFF';
    return _jsx("div", { children: whiteSpaceCodes.repeat(maxLength - text.length) });
};
export const Preview = ({ children = '', ...props }) => {
    const childText = Array.isArray(children) ? children.join('') : children;
    const text = String(childText ?? '').substring(0, maxLength);
    return (_jsxs("div", { ...debugProps, "data-skip": "true", style: {
            display: 'none',
            lineHeight: '1px',
            maxHeight: 0,
            maxWidth: 0,
            opacity: 0,
            overflow: 'hidden'
        }, ...props, children: [text, renderWhiteSpace(text)] }));
};
Preview.displayName = 'Preview';
//# sourceMappingURL=preview.js.map