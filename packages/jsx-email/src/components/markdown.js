import { jsx as _jsx } from "react/jsx-runtime";
import { parseMarkdownToJSX } from 'md-to-react-email';
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/markdown' } : {};
export const Markdown = ({ children, markdownContainerStyles, markdownCustomStyles, ...props }) => {
    const parsedMarkdown = parseMarkdownToJSX({
        customStyles: markdownCustomStyles,
        markdown: children
    });
    return (_jsx("div", { ...props, ...debugProps, style: markdownContainerStyles, dangerouslySetInnerHTML: { __html: parsedMarkdown } }));
};
Markdown.displayName = 'Markdown';
//# sourceMappingURL=markdown.js.map