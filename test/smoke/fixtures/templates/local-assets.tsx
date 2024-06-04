import { Body, Html, Img, Link } from 'jsx-email';

export const TemplateName = 'local-assets';

// @ts-ignore
const baseUrl = import.meta.resolve('../static/');

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
