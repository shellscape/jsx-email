import { Body, Html, Img, Link } from 'jsx-email';

export const templateName = 'local-assets';

export const Template = () => {
  const catUrl = `/static/cat.jpeg`;
  return (
    <Html>
      <Body>
        <Img id="image" src={catUrl} alt="Cat" width="200" height="200" />
        <Link href={catUrl}>{catUrl}</Link>
      </Body>
    </Html>
  );
};
