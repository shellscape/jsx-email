import { Body, Html, Img, Link } from 'jsx-email';

import { TextComponent } from '../components/text.js';

export const templateName = 'local-assets';

export const Template = () => {
  const catUrl = `/static/cat.jpeg`;
  return (
    <Html>
      <Body>
        <TextComponent />
        <Img id="image" src={catUrl} alt="Cat" width="200" height="200" />
        <Link href={catUrl}>{catUrl}</Link>
      </Body>
    </Html>
  );
};
