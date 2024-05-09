import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface HtmlProps extends BaseProps<'html'> {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/html' } : {};

export const Html: JsxEmailComponent<HtmlProps> = ({
  children,
  lang = 'en',
  dir = 'ltr',
  ...props
}) => (
  <html {...props} {...debugProps} lang={lang} dir={dir}>
    {children}
  </html>
);

Html.displayName = 'Html';
