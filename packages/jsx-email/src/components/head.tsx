import type { BaseProps, JsxEmailComponent } from '../types.js';
import { debug } from '../debug.js';

import { Conditional } from './conditional.js';
import { Raw } from './raw.js';

export interface HeadProps extends BaseProps<'head'> {
  enableFormatDetection?: boolean;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/head' } : {};

export const Head: JsxEmailComponent<HeadProps> = ({
  children,
  enableFormatDetection = false,
  ...props
}) => (
  <head {...props} {...debugProps}>
    <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
    <meta name="x-apple-disable-message-reformatting" />
    {!enableFormatDetection && (
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
    )}
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
    <meta name="x-apple-disable-message-reformatting" />
    {!enableFormatDetection && (
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
    )}
    {children}
    <Conditional
      head
      mso
      children={
        <Raw content={'<xml><o:OfficeDocumentSettings><o:AllowPNG /><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>'} />
      }
    />
  </head>
);

Head.displayName = 'Head';
