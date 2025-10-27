import { jsx as _jsx } from "react/jsx-runtime";
import * as config from '../config.js';
import { debug } from '../debug.js';
import { log } from '../log.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/row' } : {};
export const Row = ({ children, disableDefaultStyle, style, ...props }) => {
    const configDds = config.current().render.disableDefaultStyle;
    if (props.cellPadding || props.cellSpacing) {
        log.warn('Use of the `cellPadding` and `cellSpacing` properties are discouraged due to inconsistencies between email clients');
    }
    return (_jsx("table", { align: "center", width: "100%", style: style, role: "presentation", cellSpacing: "0", cellPadding: "0", border: 0, ...props, ...debugProps, children: _jsx("tbody", { style: configDds || disableDefaultStyle ? {} : { width: '100%' }, children: _jsx("tr", { style: configDds || disableDefaultStyle ? {} : { width: '100%' }, children: children }) }) }));
};
Row.displayName = 'Row';
//# sourceMappingURL=row.js.map