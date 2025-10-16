// @ts-ignore
import React from 'react';

import { render } from '../src/renderer/render.js';
import { Conditional, Raw } from '../src/index.js';

describe('rehype raw plugin → <Conditional mso> + <Raw>', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('lifts <jsx-email-raw> and drops <jsx-email-cond> wrapper with a valid <![endif]--> closer', async () => {
    const fragment = (
      <Conditional mso>
        <Raw
          content={
            '<v:shape style="width:1px;height:1px" xmlns:v="urn:schemas-microsoft-com:vml" />'
          }
        />
      </Conditional>
    );

    const html = await render(fragment, { minify: false, pretty: false });

    // Should render Outlook conditional markers
    expect(html).toContain('<!--[if mso]');
    expect(html).toContain('<![endif]-->');

    // Raw payload should be inlined as literal HTML (no synthetic wrappers left)
    expect(html).toContain('<v:shape');
    expect(html).not.toContain('<jsx-email-raw');
    expect(html).not.toContain('<jsx-email-cond');
  });
});
