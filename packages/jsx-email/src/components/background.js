import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { debug } from '../debug.js';
import { jsxToString } from '../renderer/jsx-to-string.js';
import { useData } from '../renderer/suspense.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/background' } : {};
const Renderer = (props) => {
    const { children, width, height, bgColor, src, bgRepeat } = props;
    const html = useData(props, () => jsxToString(_jsx("div", { children: children })));
    const innerHtml = `
<!--[if gte mso 9]>
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="${!width ? 'mso-width-percent:1000;' : `width:${width}px;`}${height ? `height:${height}px;` : ''}"><v:fill type="${bgRepeat === 'repeat' ? 'tile' : 'frame'}" src="${src}" ${bgColor ? `color="${bgColor}"` : ''}/><v:textbox${!height ? ' style="mso-fit-shape-to-text:true"' : ''} inset="0,0,0,0"><![endif]-->
${html}
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->`;
    // @ts-ignore
    // Note: This is perfectly valid. TS just expects lowercase tag names to match a specific type
    return _jsx("jsx-email-cond", { dangerouslySetInnerHTML: { __html: innerHtml } });
};
export const Background = (props) => {
    const { src, bgColor, width, height, children, style, bgRepeat = 'no-repeat', ...rest } = props;
    return (_jsx("table", { ...debugProps, cellPadding: 0, cellSpacing: 0, border: 0, width: '100%', ...(height && { height }), role: "presentation", children: _jsx("tr", { children: _jsx("td", { valign: "top", ...(width && { width }), ...(height && width && { height }), 
                // @ts-expect-error
                background: src, style: { backgroundRepeat: bgRepeat, ...style }, ...(bgColor && { bgcolor: bgColor }), ...rest, children: _jsx(Suspense, { fallback: _jsx("div", { children: "waiting..." }), children: _jsx(Renderer, { ...props, children: children }) }) }) }) }));
};
//# sourceMappingURL=background.js.map