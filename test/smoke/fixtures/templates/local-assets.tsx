import { Body, Html, Img, Link } from 'jsx-email';

export const templateName = 'local-assets';

// Note: This worked while we were rendering within vite. As of v2, we're pre-rendering
// with esbuild. esbuild creates cjs bundles, which doesn't work with import.meta.
// Additionally, import.meta.resolve doesn't work with the esbuild pre-render because
// the filesystem location is in a temp directory, so the resolve is always incorrect.
// This is a step back but we can try and figure out a good solution later.
// @ts-ignore
// const baseUrl = import.meta.resolve('../static/');
const baseUrl = '../static';

export const Template = () => {
  const catUrl = `${baseUrl}cat.jpeg`;
  return (
    <Html>
      <Body>
        <Img id="image" src={catUrl} alt="Cat" width="200" height="200" />
        <Link href={catUrl}>{catUrl}</Link>
      </Body>
    </Html>
  );
};
