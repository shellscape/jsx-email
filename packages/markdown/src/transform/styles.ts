import { StylesType } from './types';

const emptyStyle = {};

const baseHeaderStyles = {
  fontWeight: '500',
  paddingTop: 20
};

const h1 = {
  ...baseHeaderStyles,
  fontSize: '2.5rem'
};

const h2 = {
  ...baseHeaderStyles,
  fontSize: '2rem'
};
const h3 = {
  ...baseHeaderStyles,
  fontSize: '1.75rem'
};
const h4 = {
  ...baseHeaderStyles,
  fontSize: '1.5rem'
};
const h5 = {
  ...baseHeaderStyles,
  fontSize: '1.25rem'
};
const h6 = {
  ...baseHeaderStyles,
  fontSize: '1rem'
};

const bold = {
  fontWeight: 'bold'
};

const italic = {
  fontStyle: 'italic'
};

const blockQuote = {
  background: '#f9f9f9',
  borderLeft: '10px solid #ccc',
  margin: '1.5em 10px',
  padding: '1em 10px'
};

const codeInline = {
  background: ' #f8f8f8',
  color: '#212529',
  display: 'inline',
  fontFamily: `SFMono-Regular,Menlo,Monaco,Consolas,monospace`,
  fontSize: '87.5%'
};

const codeBlock = {
  ...codeInline,
  background: ' #f8f8f8',
  marginBottom: 20,
  paddingBottom: 1,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 10
};

const link = {
  backgroundColor: 'transparent',
  color: '#007bff',
  textDecoration: 'underline'
};

export const styles: StylesType = {
  blockQuote,
  bold,
  br: emptyStyle,
  codeBlock: { ...codeBlock, wordWrap: 'break-word' },
  codeInline: { ...codeInline, wordWrap: 'break-word' },
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr: emptyStyle,
  image: emptyStyle,
  italic,
  li: emptyStyle,
  link,
  ol: emptyStyle,
  p: emptyStyle,
  strikethrough: emptyStyle,
  table: emptyStyle,
  tbody: emptyStyle,
  td: emptyStyle,
  th: emptyStyle,
  thead: emptyStyle,
  tr: emptyStyle,
  ul: emptyStyle
};
