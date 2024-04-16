// @ts-ignore
import React from 'react';

import { jsxToString } from '../src/render';
import { Column } from '../src';

describe('<Column> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const testMessage = 'Test message';
    const html = await jsxToString(<Column>{testMessage}</Column>);
    expect(html).toMatchSnapshot();
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' };
    const html = await jsxToString(
      <Column style={style} data-testid="column-test">
        Test
      </Column>
    );
    expect(html).toMatchSnapshot();
  });

  it('renders correctly', async () => {
    const actualOutput = await jsxToString(<Column>Lorem ipsum</Column>);
    expect(actualOutput).toMatchSnapshot();
  });

  it('renders correctly with background color', async () => {
    const actualOutput = await jsxToString(<Column bgColor="#000000">Lorem ipsum</Column>);
    expect(actualOutput).toMatchSnapshot();
  });

  it('renders correctly with background image', async () => {
    const actualOutput = await jsxToString(<Column bgImage="link-to-image">Lorem ipsum</Column>);
    expect(actualOutput).toMatchSnapshot();
  });
});
