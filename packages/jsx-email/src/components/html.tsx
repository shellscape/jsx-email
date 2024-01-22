import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

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
