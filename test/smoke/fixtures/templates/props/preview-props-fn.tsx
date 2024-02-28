import { Body, Html } from 'jsx-email';

export const TemplateName = 'preview-props-fn';

export const Template = ({ test }: { test: string }) => (
  <Html>
    <Body>{test}</Body>
  </Html>
);

Template.PreviewProps = () => {
  return { test: 'batman' };
};
