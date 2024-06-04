import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface HtmlProps extends BaseProps<'html'> {
  enableVML?: boolean;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/html' } : {};

export const Html: JsxEmailComponent<HtmlProps> = ({
  children,
  lang = 'en',
  dir = 'ltr',
  enableVML = true,
  ...props
}) => (
  <html
    {...props}
    {...debugProps}
    lang={lang}
    dir={dir}
    {...(enableVML
      ? {
          'xmlns:o': 'urn:schemas-microsoft-com:office:office',
          'xmlns:v': 'urn:schemas-microsoft-com:vml'
        }
      : {})}
  >
    {children}
  </html>
);

Html.displayName = 'Html';
