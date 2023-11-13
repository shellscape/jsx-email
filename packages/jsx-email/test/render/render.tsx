// Note: This is a manual test script. Run with: ts-node packages/render/test/render.tsx

import { render } from '../../src/render';

import { Template } from './fixtures/async-template';

(async () => {
  const result = await render(<Template firstName="Jim" />);
  console.log({ result });
})();
