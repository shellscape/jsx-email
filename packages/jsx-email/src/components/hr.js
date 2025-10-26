import { jsx as _jsx } from "react/jsx-runtime";
import * as config from '../config.js';
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/hr' } : {};
export const Hr = ({ disableDefaultStyle, style, ...props }) => {
    const configDds = config.current().render.disableDefaultStyle;
    return (_jsx("hr", { ...props, ...debugProps, style: {
            ...(configDds || disableDefaultStyle
                ? {}
                : {
                    border: 'none',
                    borderTop: '1px solid #eaeaea',
                    width: '100%'
                }),
            ...style
        } }));
};
Hr.displayName = 'Hr';
//# sourceMappingURL=hr.js.map