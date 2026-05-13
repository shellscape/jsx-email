import { comb, type Opts } from 'email-comb';
import { type JsxEmailPlugin, pluginSymbol } from 'jsx-email';

export type CleanOptions = Partial<Opts>;

const defaultBackend = [
  { heads: '{{', tails: '}}' },
  { heads: '{%', tails: '%}' }
] satisfies Opts['backend'];

const defaultWhitelist = [
  '*body*',
  '.gmail*',
  '.apple*',
  '.ios*',
  '.ox-*',
  '.outlook*',
  '[data-ogs*',
  '.bloop_container',
  '.Singleton',
  '.unused',
  '.moz-text-html',
  '.mail-detail-content',
  '*edo*',
  '#*',
  '.lang*'
] satisfies Opts['whitelist'];

const defaultConditionalCommentMatches = ['[if', '[endif'];

const getCombOptions = ({ whitelist = [], ...options }: CleanOptions = {}) => ({
  backend: defaultBackend,
  doNotRemoveHTMLCommentsWhoseOpeningTagContains: defaultConditionalCommentMatches,
  ...options,
  whitelist: [...defaultWhitelist, ...whitelist]
});

export const clean = (options: CleanOptions = {}): JsxEmailPlugin => ({
  beforeRender: ({ html }) => comb(html, getCombOptions(options)).result,
  name: 'root/clean',
  symbol: pluginSymbol
});

export const plugin = clean();
