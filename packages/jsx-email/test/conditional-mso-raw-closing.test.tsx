// @ts-ignore
import React from 'react';

import { render } from '../src/renderer/render.js';
import { Conditional, Raw } from '../src/index.js';

describe('<Conditional> + <Raw> interaction', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('does not corrupt the <![endif]--> closer when Raw is present inside the MSO block', async () => {
    const fragment = (
      <table role="presentation" cellPadding={0} cellSpacing={0} width={300}>
        <tbody>
          <tr>
            <td>
              <Conditional mso>
                <table role="presentation" width={300}>
                  <tbody>
                    <tr>
                      <td style={{ fontSize: 0, height: 16, width: 16 }}>
                        {/* Minimal VML corner via Raw (no comments inside) */}
                        <Raw
                          content={
                            '<v:shape style="display:block;position:relative;width:16px;height:16px" coordorigin="0 0" coordsize="2 2" fillcolor="#def2f4" fill="true" stroke="f" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"><v:path v="m 0,2 c 0,1,1,0,2,0 l 2,2 x"/></v:shape>'
                          }
                        />
                      </td>
                      <td style={{ fontSize: 0, height: 16 }} />
                      <td style={{ fontSize: 0, height: 16, width: 16 }}>
                        <Raw
                          content={
                            '<v:shape style="display:block;position:relative;width:16px;height:16px" coordorigin="0 0" coordsize="2 2" fillcolor="#def2f4" fill="true" stroke="f" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"><v:path v="m 0,0 c 1,0,2,1,2,2 l 0,2 x"/></v:shape>'
                          }
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Conditional>
            </td>
          </tr>
        </tbody>
      </table>
    );

    const html = await render(fragment, { pretty: true });

    // Known-bad form observed in issue reports
    expect(html).not.toContain('<!--[endif]---->');

    // Valid closer must exist for the MSO block
    const idx = html.indexOf('<![endif]-->', html.indexOf('<!--[if mso]'));
    expect(idx).toBeGreaterThan(-1);
  });
});
