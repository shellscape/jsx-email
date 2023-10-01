import { marked, RendererObject } from 'marked';

import { ParseMarkdownProps, StylesType } from './types';
import { initRenderer } from './utils';

export class MarkdownParser {
  private readonly renderer: RendererObject;

  constructor({
    customStyles,
    withDataAttr
  }: {
    customStyles?: StylesType;
    withDataAttr?: boolean;
  }) {
    this.renderer = initRenderer({ customStyles, withDataAttr });
  }

  parse(markdown: string) {
    marked.use({
      renderer: this.renderer
    });

    return marked.parse(markdown);
  }
}

export const parseMarkdownToJSX = ({
  markdown,
  customStyles,
  withDataAttr
}: ParseMarkdownProps) => {
  const parser = new MarkdownParser({ customStyles, withDataAttr });
  return parser.parse(markdown);
};
