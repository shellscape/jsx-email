import { rehype } from 'rehype';
import stringify from 'rehype-stringify';
import { describe, expect, it } from 'vitest';

import { plugin, type UrlPluginOptions, urlPlugin } from '../src/index.js';

const processHtml = async (html: string, options: UrlPluginOptions = urlPluginOptions) => {
  const pluggable = await urlPlugin(options).process?.({ chalk: {} as any, log: {} });
  const doc = await rehype()
    .data('settings', { fragment: true })
    .use(pluggable as any)
    .use(stringify, {
      allowDangerousCharacters: true,
      allowDangerousHtml: true
    })
    .process(html);

  return String(doc);
};

const urlPluginOptions = {
  append: {
    parameters: {
      utm_source: 'jsx-email'
    }
  }
};

describe('@jsx-email/plugin-url', () => {
  it('exports a valid jsx-email plugin', () => {
    expect(plugin.name).toBe('root/url');
    expect(plugin.symbol).toBe(Symbol.for('jsx-email/plugin'));
  });

  it('does nothing when append is omitted', async () => {
    await expect(processHtml('<a href="https://example.com">Test</a>', {})).resolves.toBe(
      '<a href="https://example.com">Test</a>'
    );
  });

  it('appends URL parameters to anchor href attributes by default', async () => {
    await expect(processHtml('<a href="https://example.com">Test</a>')).resolves.toBe(
      '<a href="https://example.com?utm_source=jsx-email">Test</a>'
    );
  });

  it('adds an ampersand when the URL already has query parameters', async () => {
    await expect(processHtml('<a href="https://example.com?foo=bar">Test</a>')).resolves.toBe(
      '<a href="https://example.com?foo=bar&#x26;utm_source=jsx-email">Test</a>'
    );
  });

  it('keeps fragments after appended URL parameters', async () => {
    await expect(processHtml('<a href="https://example.com#section">Test</a>')).resolves.toBe(
      '<a href="https://example.com?utm_source=jsx-email#section">Test</a>'
    );
  });

  it('keeps existing query parameters and fragments in order', async () => {
    await expect(
      processHtml('<a href="https://example.com?foo=bar#section">Test</a>')
    ).resolves.toBe(
      '<a href="https://example.com?foo=bar&#x26;utm_source=jsx-email#section">Test</a>'
    );
  });

  it('supports custom attributes', async () => {
    await expect(
      processHtml('<a data-href="https://example.com" href="https://foo.bar">Test</a>', {
        append: {
          attributes: ['data-href'],
          parameters: {
            foo: 'bar'
          }
        }
      })
    ).resolves.toBe('<a data-href="https://example.com?foo=bar" href="https://foo.bar">Test</a>');
  });

  it('supports custom tags', async () => {
    await expect(
      processHtml('<a href="https://example.com">Test</a><img src="https://example.com/img.png">', {
        append: {
          parameters: {
            foo: 'bar'
          },
          tags: ['img']
        }
      })
    ).resolves.toBe(
      '<a href="https://example.com">Test</a><img src="https://example.com/img.png?foo=bar">'
    );
  });

  it('supports selector-based tags', async () => {
    await expect(
      processHtml('<a href="https://example.com">One</a><a href="https://other.com">Two</a>', {
        append: {
          parameters: {
            foo: 'bar'
          },
          tags: ['a[href*="example.com"]']
        }
      })
    ).resolves.toBe(
      '<a href="https://example.com?foo=bar">One</a><a href="https://other.com">Two</a>'
    );
  });

  it('does not append URL parameters to invalid URLs in strict mode', async () => {
    await expect(processHtml('<a href="example.com">Test</a>')).resolves.toBe(
      '<a href="example.com">Test</a>'
    );
  });

  it('appends URL parameters to any string when strict is false', async () => {
    await expect(
      processHtml('<a href="example.com">Test</a>', {
        append: {
          parameters: {
            foo: 'bar'
          },
          strict: false
        }
      })
    ).resolves.toBe('<a href="example.com?foo=bar">Test</a>');
  });

  it('encodes URL parameters when qs encode is true', async () => {
    await expect(
      processHtml('<a href="https://example.com">Test</a>', {
        append: {
          parameters: {
            foo: '@Bar@'
          },
          qs: {
            encode: true
          }
        }
      })
    ).resolves.toBe('<a href="https://example.com?foo=%40Bar%40">Test</a>');
  });

  it('does not encode URL parameters by default', async () => {
    await expect(
      processHtml('<a href="https://example.com">Test</a>', {
        append: {
          parameters: {
            foo: '@Bar@'
          }
        }
      })
    ).resolves.toBe('<a href="https://example.com?foo=@Bar@">Test</a>');
  });

  it('appends URL parameters to srcset candidates', async () => {
    await expect(
      processHtml(
        '<img srcset="https://example.com/small.png 1x, https://example.com/large.png 2x">',
        {
          append: {
            parameters: {
              foo: 'bar'
            },
            tags: ['img']
          }
        }
      )
    ).resolves.toBe(
      '<img srcset="https://example.com/small.png?foo=bar 1x, https://example.com/large.png?foo=bar 2x">'
    );
  });
});
