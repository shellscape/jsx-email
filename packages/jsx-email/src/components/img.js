import { jsx as _jsx } from "react/jsx-runtime";
import * as config from '../config.js';
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/img' } : {};
export const Img = ({ alt, disableDefaultStyle, height, src, style, width, ...props }) => {
    const configDds = config.current().render.disableDefaultStyle;
    return (_jsx("img", { ...props, ...debugProps, alt: alt, src: src, width: width, height: height, style: {
            ...(configDds || disableDefaultStyle
                ? {}
                : { border: 'none', display: 'block', outline: 'none', textDecoration: 'none' }),
            ...style
        } }));
};
Img.displayName = 'Img';
//# sourceMappingURL=img.js.map