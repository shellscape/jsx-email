// @ts-ignore
import React from 'react';

import { render } from '../packages/jsx-email/src/renderer/render.ts';
import { Conditional, Raw } from '../packages/jsx-email/src/index.ts';

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
                    <Raw
                      content={
                        '<v:shape style="display:block;position:relative;width:16px;height:16px" coordorigin="0 0" coordsize="2 2" fillcolor="#def2f4" fill="true" stroke="f" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"><v:path v="m 0,2 c 0,1,1,0,2,0 l 2,2 x"/></v:shape>'
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
console.log(html);
