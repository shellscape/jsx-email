// @ts-ignore
import React from 'react';

import { jsxToString, render, Head, Html, Tailwind } from '../../dist';

const Component = () => (
  <Html>
    <Tailwind>
      <Head>
        <title>test title</title>
      </Head>
    </Tailwind>
  </Html>
);

describe('Tailwind + Head', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  test('should not clobber <Head> content', async () => {
    expect(await jsxToString(<Component />)).toMatchSnapshot();
    expect(await render(<Component />, { pretty: true })).toMatchSnapshot();
  });
});
