import React from 'react';

import type { JsxEmailComponent } from '../types.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // magic custom element post-processed in render function
      'jsx-email-raw': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
    }
  }
}

export interface RawOutputProps {
  content?: string;
}

export const RawOutput: JsxEmailComponent<RawOutputProps> = (props) => (
  <>
    <jsx-email-raw dangerouslySetInnerHTML={{ __html: `<!-- ${props.content} -->` }} />
  </>
);

RawOutput.displayName = 'RawOutput';
