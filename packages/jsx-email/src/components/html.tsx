import type { BaseProps, JsxEmailComponent } from '../types';

type RootProps = BaseProps<'html'>;

export interface HtmlProps extends RootProps {}

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
