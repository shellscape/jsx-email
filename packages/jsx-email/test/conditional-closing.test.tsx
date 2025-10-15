// @ts-ignore
import React from 'react';

import { render } from '../src/renderer/render.js';
import { Conditional } from '../src/index.js';

/**
 * Repro for issue #316: MSO conditional closer is malformed in body content.
 *
 * This test mirrors the structure reported by the user:
 * - a modern-clients block wrapped in <Conditional mso={false}>
 * - followed by an MSO-only block wrapped in <Conditional mso>
 * both as siblings within table rows/cells.
 *
 * Expected: the MSO block closes with `<![endif]-->` and no extra hyphens.
 */
describe('<Conditional> closer integrity', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('emits a well-formed <![endif]--> for mso blocks placed in table cells', async () => {
    const fragment = (
      <table role="presentation" cellPadding={0} cellSpacing={0} width={300}>
        <tbody>
          <tr>
            <td>
              <Conditional mso={false}>
                <table data-test="modern" role="presentation" width={300}>
                  <tbody>
                    <tr>
                      <td>modern</td>
                    </tr>
                  </tbody>
                </table>
              </Conditional>
            </td>
          </tr>
          <tr>
            <td>
              <Conditional mso>
                <table data-test="mso" role="presentation" width={300}>
                  <tbody>
                    <tr>
                      <td>mso</td>
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

    // Guard against the known-bad tail observed in .eml outputs:
    expect(html).not.toContain('<!--[endif]---->');

    // Verify that our MSO block uses a valid closer.
    // We limit the search to our block by anchoring on a unique attribute.
    const start = html.indexOf('<!--[if mso]');
    const msoIdx = html.indexOf('data-test="mso"', start);
    expect(start).toBeGreaterThan(-1);
    expect(msoIdx).toBeGreaterThan(-1);

    // small window around our block
    const tail = html.slice(msoIdx, msoIdx + 400);
    expect(tail).toContain('<![endif]-->');
  });
});
