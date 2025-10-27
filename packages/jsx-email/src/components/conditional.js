import { jsx as _jsx } from "react/jsx-runtime";
export const Conditional = (props) => {
    const { children, expression, mso, head } = props;
    if (typeof expression === 'undefined' && typeof mso === 'undefined')
        throw new RangeError('jsx-email: Conditional expects the `expression` or `mso` prop to be defined');
    if (typeof expression !== 'undefined' && typeof mso !== 'undefined')
        throw new RangeError('jsx-email: Conditional expects the `expression` or `mso` prop to be defined, not both');
    // Always render a JSX custom element with data-* markers.
    // A rehype plugin will replace this element with proper conditional comments.
    // @ts-ignore - lower-case custom element tag is valid
    return (_jsx("jsx-email-cond", { "data-mso": mso, "data-expression": expression, "data-head": head, children: children }));
};
Conditional.displayName = 'Conditional';
//# sourceMappingURL=conditional.js.map