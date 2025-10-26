import { jsx as _jsx } from "react/jsx-runtime";
import * as config from '../config.js';
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/text' } : {};
export const Text = ({ disableDefaultStyle, style, ...props }) => {
    const configDds = config.current().render.disableDefaultStyle;
    return (_jsx("p", { ...props, ...debugProps, style: {
            ...(configDds || disableDefaultStyle
                ? {}
                : { fontSize: '14px', lineHeight: '24px', margin: '16px 0' }),
            ...style
        } }));
};
Text.displayName = 'Text';
//# sourceMappingURL=text.js.map