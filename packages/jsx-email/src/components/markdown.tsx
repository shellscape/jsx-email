import { type StylesType, parseMarkdownToJSX } from 'md-to-react-email';
import React from 'react';

import { debug } from '../debug';

export interface MarkdownProps extends React.PropsWithChildren {
  children: string;
  markdownContainerStyles?: React.CSSProperties;
  markdownCustomStyles?: StylesType;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/markdown' } : {};

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
      {...debugProps}
      style={markdownContainerStyles}
      dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
    />
  );
};

Markdown.displayName = 'Markdown';
