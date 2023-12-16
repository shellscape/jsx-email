import type { BaseProps, JsxEmailComponent } from '../types';

export interface HtmlProps extends BaseProps<'html'> {}

export const Html: JsxEmailComponent<HtmlProps> = ({
  children,
  lang = 'en',
  dir = 'ltr',
  ...props
}) => (
  <html {...props} data-id="jsx-email/html" lang={lang} dir={dir}>
    {children}
  </html>
);

Html.displayName = 'Html';
