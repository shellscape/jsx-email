import React from 'react';

import type { JsxEmailComponent } from '../types.js';
import { escapeForRawComponent } from '../renderer/raw.js';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // magic custom element post-processed in render function
      'jsx-email-raw': React.DetailedHTMLProps<React.HTMLProps<HTMLElement>, HTMLElement>;
    }
  }
}

export interface RawProps {
  content: string;
  disablePlainTextOutput?: boolean;
}

export const Raw: JsxEmailComponent<RawProps> = (props) => (
  <>
    <jsx-email-raw
      data-skip={props.disablePlainTextOutput ? 'true' : void 0}
      dangerouslySetInnerHTML={{ __html: `<!--${escapeForRawComponent(props.content)}-->` }}
    />
  </>
);

Raw.displayName = 'Raw';
