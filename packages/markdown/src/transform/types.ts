import { CSSProperties } from 'react';

export interface StylesType {
  blockQuote?: CSSProperties;
  bold?: CSSProperties;
  br?: CSSProperties;
  codeBlock?: CSSProperties;
  codeInline?: CSSProperties;
  h1?: CSSProperties;
  h2?: CSSProperties;
  h3?: CSSProperties;
  h4?: CSSProperties;
  h5?: CSSProperties;
  h6?: CSSProperties;
  hr?: CSSProperties;
  image?: CSSProperties;
  italic?: CSSProperties;
  li?: CSSProperties;
  link?: CSSProperties;
  ol?: CSSProperties;
  p?: CSSProperties;
  strikethrough?: CSSProperties;
  table?: CSSProperties;
  tbody?: CSSProperties;
  td?: CSSProperties;
  th?: CSSProperties;
  thead?: CSSProperties;
  tr?: CSSProperties;
  ul?: CSSProperties;
}

export interface initRendererProps {
  customStyles?: StylesType;
  withDataAttr?: boolean;
}

export interface ParseMarkdownProps {
  customStyles?: StylesType;
  markdown: string;
  withDataAttr?: boolean;
}
