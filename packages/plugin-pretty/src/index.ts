import { pluginSymbol, type JsxEmailPlugin } from 'jsx-email';
import prettyHtml from 'pretty';

export const plugin: JsxEmailPlugin = {
  afterRender: (html) => prettyHtml(html),
  name: 'root/pretty',
  symbol: pluginSymbol
};
