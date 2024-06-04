// @ts-ignore
import React from 'react';

import { d, debug } from '../src/debug.js';
import { render } from '../src/renderer/render.js';

d.enable('jsx-email:*');

describe('render', () => {
  it('enables debug', async () => {
    expect(debug.cli.enabled).toBe(true);
    expect(debug.elements.enabled).toBe(true);
  });

  it('renders with debug attributes', async () => {
    const { Template: PlaidEmail } = await import(
      '../../../apps/demo/emails/plaid-verify-identity'
    );
    expect(await render(<PlaidEmail />, { minify: false, pretty: true })).toMatchSnapshot();
  });
});
