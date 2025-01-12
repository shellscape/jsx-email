import React from 'react';

import type { JsxEmailComponent } from '../types.js';
import { escapeForRawComponent } from '../renderer/raw.js';

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'jsx-email-raw': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          dangerouslySetInnerHTML?: {
            __html: string;
          };
          'data-skip'?: string;
        },
        HTMLElement
      >;
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
