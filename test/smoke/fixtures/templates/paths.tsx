import { Html } from 'jsx-email';

import { Template as TestBody } from '@components/test-body';

export const templateName = 'paths';

// eslint-disable-next-line arrow-body-style
export const Template = () => {
  return (
    <Html>
      <TestBody></TestBody>
    </Html>
  );
};
