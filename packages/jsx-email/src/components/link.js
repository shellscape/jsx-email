import { jsx as _jsx } from "react/jsx-runtime";
import * as config from '../config.js';
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/link' } : {};
export const Link = ({ disableDefaultStyle, style, target, ...props }) => {
    const configDds = config.current().render.disableDefaultStyle;
    return (_jsx("a", { ...props, ...debugProps, target: target, style: {
            ...(configDds || disableDefaultStyle ? {} : { color: '#067df7', textDecoration: 'none' }),
            ...style
        } }));
};
Link.displayName = 'Link';
//# sourceMappingURL=link.js.map