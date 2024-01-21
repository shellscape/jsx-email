import { Body, Html } from 'jsx-email';

export const TemplateName = 'default-export-props-fn';

const Template = ({ test }: { test: string }) => (
  <Html>
    <Body>{test}</Body>
  </Html>
);

Template.PreviewProps = () => {
  return { test: 'batman' };
};

// eslint-disable-next-line import/no-default-export
export default Template;
