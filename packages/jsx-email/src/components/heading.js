import { jsx as _jsx } from "react/jsx-runtime";
import { Slot } from '@radix-ui/react-slot';
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/heading' } : {};
export const withSpace = (value, properties) => properties.reduce((styles, property) => {
    // Check to ensure string value is a valid number
    if (!isNaN(parseFloat(value))) {
        return { ...styles, [property]: `${value}px` };
    }
    return styles;
}, {});
export const withMargin = (props) => {
    const nonEmptyStyles = [
        withSpace(props.m, ['margin']),
        withSpace(props.mx, ['marginLeft', 'marginRight']),
        withSpace(props.my, ['marginTop', 'marginBottom']),
        withSpace(props.mt, ['marginTop']),
        withSpace(props.mr, ['marginRight']),
        withSpace(props.mb, ['marginBottom']),
        withSpace(props.ml, ['marginLeft'])
    ].filter((s) => Object.keys(s).length);
    const mergedStyles = nonEmptyStyles.reduce((acc, style) => {
        return { ...acc, ...style };
    }, {});
    return mergedStyles;
};
export const Heading = ({ as: Tag = 'h1', children, style, m, mx, my, mt, mr, mb, ml, ...props }) => (_jsx(Slot, { ...props, ...debugProps, style: { ...withMargin({ m, mb, ml, mr, mt, mx, my }), ...style }, children: _jsx(Tag, { children: children }) }));
Heading.displayName = 'Heading';
//# sourceMappingURL=heading.js.map