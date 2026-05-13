// @ts-ignore
import React from 'react';

import { render } from '../../src/renderer/render.js';

describe('render', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('issue 216, minifying', async () => {
    const snippet = {
      __html:
        '<a style="-webkit-text-size-adjust:none;border-radius:0;display:inline-block;font-size:16px;line-height:48px;max-width:200px;text-align:center;text-decoration:none;width:100%;mso-hide:all" class="button">button</a>'
    };
    const fragment = (
      <>
        <div dangerouslySetInnerHTML={snippet} />
      </>
    );
    expect(await render(fragment, { minify: false })).toMatchSnapshot();
  });

  it('issue 368, href query delimiters', async () => {
    const fragment = <a href="https://example.com?foo=bar&baz=qux">Test Link</a>;
    const result = await render(fragment);

    expect(result).toContain('href="https://example.com?foo=bar&amp;baz=qux"');
    expect(result).not.toContain('href="https://example.com?foo=bar&#x26;baz=qux"');
  });
});
