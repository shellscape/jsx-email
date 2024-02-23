// @ts-ignore
import React from 'react';

import { render } from '../../src/render';

import { Template as AirbnbEmail } from '../../../../apps/demo/emails/airbnb-review';
import { Template as PlaidEmail } from '../../../../apps/demo/emails/plaid-verify-identity';

import { Preview } from './fixtures/preview';
import { Template } from './fixtures/template';
import { Template as TailwindTemplate } from './fixtures/tailwind';

describe('render', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('converts a React component into HTML', async () => {
    const result = await render(<Template firstName="Jim" />);
    expect(result).toMatchSnapshot();
  });

  it('converts a React component into PlainText', async () => {
    const result = await render(<Template firstName="Jim" />, { plainText: true });
    expect(result).toMatchSnapshot();
  });

  it('converts to plain text and removes reserved ID', async () => {
    const result = await render(<Preview />, { plainText: true });
    expect(result).toMatchSnapshot();
  });

  it('converts to plain text using options', async () => {
    const result = await render(<Preview />, { plainText: { selectors: [] } });
    expect(result).toMatchSnapshot();
  });

  it('renders the airbnb demo template', async () => {
    expect(await render(<AirbnbEmail />)).toMatchSnapshot();
    expect(await render(<AirbnbEmail />, { pretty: true })).toMatchSnapshot();
  });

  it('renders the plaid demo template', async () => {
    expect(await render(<PlaidEmail />)).toMatchSnapshot();
    expect(await render(<PlaidEmail />, { pretty: true })).toMatchSnapshot();
  });

  it('renders with minifying', async () => {
    expect(await render(<PlaidEmail />, { minify: true })).toMatchSnapshot();
  });

  it('renders without minifying', async () => {
    expect(await render(<PlaidEmail />, { minify: false })).toMatchSnapshot();
  });

  it('renders the vercel demo template', async () => {
    expect(await render(<TailwindTemplate />)).toMatchSnapshot();
    expect(await render(<TailwindTemplate />, { pretty: true })).toMatchSnapshot();
  });
});
