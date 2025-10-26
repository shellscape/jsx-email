import { type StylesType } from 'md-to-react-email';
import React from 'react';
export interface MarkdownProps extends React.PropsWithChildren {
    children: string;
    markdownContainerStyles?: React.CSSProperties;
    markdownCustomStyles?: StylesType;
}
export declare const Markdown: {
    ({ children, markdownContainerStyles, markdownCustomStyles, ...props }: React.PropsWithChildren<MarkdownProps>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=markdown.d.ts.map