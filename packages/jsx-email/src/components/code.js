import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Suspense } from 'react';
import { debug } from '../debug.js';
import { useData } from '../renderer/suspense.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/code' } : {};
const Renderer = (props) => {
    const { children, language, style, theme = 'nord', ...rest } = props;
    const code = children;
    const highlight = async () => {
        // Note: When building CJS with thsy, tsc thinks that this isn't already dynamic
        // @ts-ignore
        const { codeToHtml } = await import('shiki');
        const html = await codeToHtml(code, { lang: language, theme });
        return html;
    };
    const html = useData(props, highlight);
    return _jsx("div", { ...rest, ...debugProps, style: style, dangerouslySetInnerHTML: { __html: html } });
};
export const Code = ({ children, ...props }) => {
    if (typeof children !== 'string')
        throw new Error('Code: component children must be of type string');
    return (_jsx(_Fragment, { children: _jsx(Suspense, { fallback: _jsx("div", { children: "waiting" }), children: _jsx(Renderer, { ...props, children: children }) }) }));
};
Code.displayName = 'Code';
//# sourceMappingURL=code.js.map