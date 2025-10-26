import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { debug } from '../debug.js';
import { Conditional } from './conditional.js';
import { Raw } from './raw.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/head' } : {};
export const Head = ({ children, enableFormatDetection = false, ...props }) => (_jsxs("head", { ...props, ...debugProps, children: [_jsx("meta", { httpEquiv: "Content-Type", content: "text/html; charset=UTF-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1, user-scalable=yes" }), _jsx("meta", { name: "x-apple-disable-message-reformatting" }), !enableFormatDetection && (_jsx("meta", { name: "format-detection", content: "telephone=no, date=no, address=no, email=no, url=no" })), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1, user-scalable=yes" }), _jsx("meta", { name: "x-apple-disable-message-reformatting" }), !enableFormatDetection && (_jsx("meta", { name: "format-detection", content: "telephone=no, date=no, address=no, email=no, url=no" })), children, _jsx(Conditional, { head: true, mso: true, children: _jsx(Raw, { content: "<xml><o:OfficeDocumentSettings><o:AllowPNG /><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>" }) })] }));
Head.displayName = 'Head';
//# sourceMappingURL=head.js.map
