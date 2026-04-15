// @ts-ignore
import React from 'react';

import { Avatar, AvatarGroup } from '../src/index.js';
import { jsxToString } from '../src/renderer/jsx-to-string.js';

describe('<AvatarGroup> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', async () => {
    const html = await jsxToString(
      <AvatarGroup>
        <Avatar name="Bruce Wayne" />
        <Avatar name="Selina Kyle" />
      </AvatarGroup>
    );

    expect(html).toContain('BW');
    expect(html).toContain('SK');
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red' };
    const html = await jsxToString(
      <AvatarGroup style={style} data-testid="avatar-group-test">
        <Avatar src="cat.jpg" alt="Cat" />
      </AvatarGroup>
    );

    expect(html).toContain('style="border-collapse:collapse;background-color:red"');
    expect(html).toContain('data-testid="avatar-group-test"');
  });

  it('renders with non-overlapping defaults', async () => {
    const actualOutput = await jsxToString(
      <AvatarGroup>
        <Avatar name="Bruce Wayne" />
        <Avatar name="Selina Kyle" />
        <Avatar name="Clark Kent" />
      </AvatarGroup>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('supports explicit overlap', async () => {
    const actualOutput = await jsxToString(
      <AvatarGroup overlap={true} spacing={10}>
        <Avatar name="Bruce Wayne" />
        <Avatar name="Selina Kyle" />
        <Avatar name="Clark Kent" />
      </AvatarGroup>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('disables default styles', async () => {
    const actualOutput = await jsxToString(
      <AvatarGroup disableDefaultStyle={true}>
        <Avatar name="Bruce Wayne" disableDefaultStyle={true} />
        <Avatar name="Selina Kyle" disableDefaultStyle={true} />
      </AvatarGroup>
    );

    expect(actualOutput).toMatchSnapshot();
  });
});
