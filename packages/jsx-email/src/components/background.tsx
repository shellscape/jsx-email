import React, { Suspense } from 'react';

import { debug } from '../debug.js';

import { jsxToString } from '../renderer/jsx-to-string.js';
import { useData } from '../renderer/suspense.js';

export interface BackgroundProps
  extends Omit<React.ComponentPropsWithoutRef<'td'>, 'height' | 'width' | 'bgcolor'> {
  bgColor?: string;
  // VML: frame: 'no-repeat' | tile:'repeat'
  bgRepeat?: 'repeat' | 'no-repeat';
  // fixed height | undefined => fit to content
  height?: number;
  // fixed width
  src: string;
  width?: number;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/background' } : {};

const Renderer = (props: BackgroundProps) => {
  const { children, width, height, bgColor, src, bgRepeat } = props;
  const html = useData(props, () => jsxToString(<div>{children}</div>));
  const innerHtml = `
<!--[if gte mso 9]>
<v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="${
    !width ? 'mso-width-percent:1000;' : `width:${width}px;`
  }${height ? `height:${height}px;` : ''}"><v:fill type="${
    bgRepeat === 'repeat' ? 'tile' : 'frame'
  }" src="${src}" ${bgColor ? `color="${bgColor}"` : ''}/><v:textbox${
    !height ? ' style="mso-fit-shape-to-text:true"' : ''
  } inset="0,0,0,0"><![endif]-->
${html}
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->`;

  // @ts-ignore
  // Note: This is perfectly valid. TS just expects lowercase tag names to match a specific type
  return <jsx-email-cond dangerouslySetInnerHTML={{ __html: innerHtml }} />;
};

export const Background = (props: BackgroundProps) => {
  const { src, bgColor, width, height, children, style, bgRepeat = 'no-repeat', ...rest } = props;
  return (
    <table
      {...debugProps}
      cellPadding={0}
      cellSpacing={0}
      border={0}
      width={'100%'}
      {...(height && { height })}
      role="presentation"
    >
      <tr>
        <td
          valign="top"
          {...(width && { width })}
          {...(height && width && { height })}
          // @ts-expect-error
          background={src}
          style={{ backgroundRepeat: bgRepeat, ...style }}
          {...(bgColor && { bgcolor: bgColor })}
          {...rest}
        >
          <Suspense fallback={<div>waiting...</div>}>
            <Renderer {...props}>{children}</Renderer>
          </Suspense>
        </td>
      </tr>
    </table>
  );
};
