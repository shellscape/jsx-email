import { StylesType, parseMarkdownToReactEmailJSX } from 'md-to-react-email';
import type React from 'react';

export interface MarkdownProps extends React.PropsWithChildren {
  children: string;
  markdownContainerStyles?: React.CSSProperties;
  markdownCustomStyles?: StylesType;
  showDataId?: boolean;
}

export const Markdown = ({
  children,
  markdownContainerStyles,
  markdownCustomStyles,
  showDataId = false,
  ...props
}: React.PropsWithChildren<MarkdownProps>) => {
  const parsedMarkdown = parseMarkdownToReactEmailJSX({
    customStyles: markdownCustomStyles,
    markdown: children,
    withDataAttr: showDataId
  });

  return (
    <div
      {...props}
      data-id="@jsx-email/markdown"
      style={markdownContainerStyles}
      dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
    />
  );
};

Markdown.displayName = 'Markdown';
