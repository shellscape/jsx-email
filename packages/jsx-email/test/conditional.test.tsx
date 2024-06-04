// @ts-ignore
import React from 'react';

import { render } from '../src/renderer/render.js';
import { jsxToString } from '../src/renderer/jsx-to-string.js';
import { Conditional } from '../src/index.js';

describe('<Conditional> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders with jsxToString', async () => {
    const html = await jsxToString(
      <Conditional mso={true}>
        <h1>batman</h1>
      </Conditional>
    );
    expect(html).toMatchSnapshot();
  });

  it('renders with head: true', async () => {
    const html = await jsxToString(
      <Conditional head={true} mso>
        <h1>batman</h1>
      </Conditional>
    );
    expect(html).toMatchSnapshot();
  });

  it('renders mso: true', async () => {
    const html = await render(
      <Conditional mso={true}>
        <h1>batman</h1>
      </Conditional>
    );
    expect(html).toMatchSnapshot();
  });

  it('renders mso: false', async () => {
    const html = await render(
      <Conditional mso={false}>
        <h1>batman</h1>
      </Conditional>
    );
    expect(html).toMatchSnapshot();
  });

  it('renders expression', async () => {
    const html = await render(
      <Conditional expression="lt batman">
        <h1>joker</h1>
      </Conditional>
    );
    expect(html).toMatchSnapshot();
  });

  it('throws on bad props', async () => {
    let error: Error;

    try {
      await render(<Conditional></Conditional>);
    } catch (e: any) {
      error = e;
    }

    expect(error!).toMatchSnapshot();

    try {
      await render(<Conditional expression="batman" mso={true}></Conditional>);
    } catch (e: any) {
      error = e;
    }

    expect(error!).toMatchSnapshot();
  });
});
