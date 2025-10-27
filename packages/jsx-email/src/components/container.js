import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as config from '../config.js';
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/container' } : {};
export const Container = ({ alignment = 'center', children, disableDefaultStyle, style, containerWidth = 600, ...props }) => {
    const configDds = config.current().render.disableDefaultStyle;
    return (_jsx("div", { ...debugProps, style: { tableLayout: 'fixed', width: '100%' }, children: _jsxs("div", { style: { margin: '0 auto', maxWidth: containerWidth }, children: [_jsx("span", { dangerouslySetInnerHTML: {
                        __html: `<!--[if mso]><table align="${alignment}" width="${containerWidth}" style="border-spacing: 0; width:${containerWidth}px;" role="presentation"><tr><td><![endif]-->`
                    } }), _jsx("table", { align: alignment, width: "100%", role: "presentation", cellSpacing: "0", cellPadding: "0", border: 0, ...props, style: {
                        ...(configDds || disableDefaultStyle ? {} : { maxWidth: `${containerWidth}px` }),
                        ...style
                    }, children: _jsx("tbody", { children: _jsx("tr", { style: configDds || disableDefaultStyle ? {} : { width: '100%' }, children: _jsx("td", { align: alignment, children: children }) }) }) }), _jsx("span", { dangerouslySetInnerHTML: {
                        __html: `<!--[if mso]></td></tr></table><![endif]-->`
                    } })] }) }));
};
Container.displayName = 'Container';
//# sourceMappingURL=container.js.map