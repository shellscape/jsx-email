import { StylesType, parseMarkdownToJSX } from 'md-to-react-email';
import type React from 'react';

export interface MarkdownProps extends React.PropsWithChildren {
  children: string;
  markdownContainerStyles?: React.CSSProperties;
  markdownCustomStyles?: StylesType;
}

export const Markdown = ({
  children,
  markdownContainerStyles,
  markdownCustomStyles,
  ...props
}: React.PropsWithChildren<MarkdownProps>) => {
  const parsedMarkdown = parseMarkdownToJSX({
    customStyles: markdownCustomStyles,
    markdown: children
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
