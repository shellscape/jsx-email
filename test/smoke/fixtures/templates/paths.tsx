import { Html } from 'jsx-email';

import { TestBody } from '@components/test-body';

export const TemplateName = 'local-assets';

// eslint-disable-next-line arrow-body-style
export const Template = () => {
  return (
    <Html>
      <TestBody></TestBody>
    </Html>
  );
};
