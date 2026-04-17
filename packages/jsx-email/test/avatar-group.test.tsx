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

  it('normalizes inline baseline styles to prevent broken images from shifting avatar alignment', async () => {
    const html = await jsxToString(
      <AvatarGroup overlap={true}>
        <Avatar src="broken.jpg" name="Margaret Hamilton" width={44} height={44} />
        <Avatar src="ada.jpg" name="Ada Lovelace" width={44} height={44} />
      </AvatarGroup>
    );

    expect(html).toContain('<td style="padding:0;vertical-align:middle">');
    expect(html).toContain(
      '<span style="display:inline-block;font-size:0;line-height:0;vertical-align:middle">'
    );
    expect(html).toContain(
      '<span style="display:inline-block;font-size:0;line-height:0;vertical-align:middle;margin-left:-8px;position:relative">'
    );
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

  it('supports truncation with an overflow token', async () => {
    const actualOutput = await jsxToString(
      <AvatarGroup max={2}>
        <Avatar name="Bruce Wayne" />
        <Avatar name="Selina Kyle" />
        <Avatar name="Clark Kent" />
        <Avatar name="Diana Prince" />
      </AvatarGroup>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('uses semantic overflow text and avatar sizing for overflow token', async () => {
    const actualOutput = await jsxToString(
      <AvatarGroup max={1}>
        <Avatar name="Bruce Wayne" width={64} />
        <Avatar name="Selina Kyle" width={64} />
        <Avatar name="Clark Kent" width={64} />
      </AvatarGroup>
    );

    expect(actualOutput).toMatch(/aria-label="2 more"[^>]*height:64px[^>]*width:64px">\+2<\/span>/);
  });

  it('supports rtl rendering order', async () => {
    const actualOutput = await jsxToString(
      <AvatarGroup direction="rtl">
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
