import { jsx as _jsx } from "react/jsx-runtime";
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/graph' } : {};
export const Graph = ({ config, title, width, height, background, className }) => {
    const baseURL = 'https://quickchart.io/chart';
    let url = `${baseURL}?c=${encodeURIComponent(JSON.stringify(config))}`;
    if (width) {
        url += `&w=${width}`;
    }
    if (height) {
        url += `&h=${height}`;
    }
    if (background) {
        url += `&bkg=${background}`;
    }
    return (_jsx("img", { ...debugProps, className: className, src: url, alt: title, width: width, height: height }));
};
//# sourceMappingURL=graph.js.map