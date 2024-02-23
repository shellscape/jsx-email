// Note: This is a manual test script. Run with: ts-node packages/render/test/render.tsx

import { Column } from '../../dist';
import { render } from '../../src/renderer/render';

(async () => {
  const result = await render(<Column>batman</Column>);
  console.log({ result });
})();
