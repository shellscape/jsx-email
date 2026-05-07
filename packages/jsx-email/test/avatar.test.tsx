// @ts-ignore
import React from 'react';

import { Avatar } from '../src/index.js';
import { jsxToString } from '../src/renderer/jsx-to-string.js';

describe('<Avatar> component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('passes style and other props correctly', async () => {
    const style = { backgroundColor: 'red', border: 'solid 1px black' };
    const html = await jsxToString(
      <Avatar
        src="cat.jpg"
        name="Cat"
        width="64"
        height="64"
        style={style}
        data-testid="avatar-test"
      />
    );
    expect(html).toContain('background-color:red');
    expect(html).toContain('border:solid 1px black');
    expect(html).toContain('data-testid="avatar-test"');
  });

  it('derives alt from the name when alt is omitted', async () => {
    const html = await jsxToString(<Avatar src="cat.jpg" name="Bruce Wayne" />);
    expect(html).toContain('alt="Bruce Wayne"');
  });

  it('renders fallback markup when src is missing', async () => {
    const actualOutput = await jsxToString(<Avatar name="Bruce Wayne" />);
    expect(actualOutput).toMatchSnapshot();
  });

  it('uses fallback text precedence of fallback, then derived initials, then question mark', async () => {
    const explicitFallback = await jsxToString(<Avatar fallback="BAT" name="Bruce Wayne" />);
    const derivedInitials = await jsxToString(<Avatar name="Bruce Wayne" />);
    const defaultFallback = await jsxToString(<Avatar />);

    expect(explicitFallback).toContain('>BAT</span>');
    expect(derivedInitials).toContain('>BW</span>');
    expect(defaultFallback).toContain('>?</span>');
  });

  it('uses aria-label precedence of alt, then name, then fallback text when src is missing', async () => {
    const explicitAlt = await jsxToString(
      <Avatar alt="Batman label" fallback="BAT" name="Bruce Wayne" />
    );
    const derivedName = await jsxToString(<Avatar fallback="BAT" name="Bruce Wayne" />);
    const derivedFallback = await jsxToString(<Avatar fallback="BAT" />);

    expect(explicitAlt).toContain('aria-label="Batman label"');
    expect(derivedName).toContain('aria-label="Bruce Wayne"');
    expect(derivedFallback).toContain('aria-label="BAT"');
  });

  it('supports decorative fallback avatars when src is missing', async () => {
    const html = await jsxToString(<Avatar decorative={true} name="Bruce Wayne" />);

    expect(html).toContain('role="presentation"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain('aria-label=');
  });

  it('supports decorative avatars', async () => {
    const actualOutput = await jsxToString(<Avatar src="cat.jpg" decorative={true} />);
    expect(actualOutput).toMatchSnapshot();
  });

  it('disables default styles', async () => {
    const actualOutput = await jsxToString(
      <Avatar src="cat.jpg" alt="Cat" width="64" height="64" disableDefaultStyle={true} />
    );
    expect(actualOutput).toMatchSnapshot();
  });
});
