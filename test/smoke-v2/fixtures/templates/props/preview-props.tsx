import { Body, Html } from 'jsx-email';

export const templateName = 'preview-props';

export const Template = ({ test }: { test: string }) => (
  <Html>
    <Body>{test}</Body>
  </Html>
);

export const previewProps = { test: 'batman' };
