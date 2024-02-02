import { jsxToString } from 'jsx-email';

import { Template } from './test';

(async () => {
  const res = await jsxToString(<Template />);
  console.log(res);
})();
