import { jsx as _jsx } from "react/jsx-runtime";
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/html' } : {};
export const Html = ({ children, lang = 'en', dir = 'ltr', enableVML = true, ...props }) => (_jsx("html", { ...props, ...debugProps, lang: lang, dir: dir, ...(enableVML
        ? {
            'xmlns:o': 'urn:schemas-microsoft-com:office:office',
            'xmlns:v': 'urn:schemas-microsoft-com:vml'
        }
        : {}), children: children }));
Html.displayName = 'Html';
//# sourceMappingURL=html.js.map