/**
 * Note: Parts of this file are derived from [Hyperons](https://github.com/i-like-robots/hyperons).
 * @license MIT
 */
import { Conditional, Raw, render } from '../dist/index.js';
import { jsxToString } from '../src/renderer/jsx-to-string.js';

const Template = () => (
  <>
    <Conditional head mso>
      <Raw content="<xml><o:OfficeDocumentSettings><o:AllowPNG /><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>" />
    </Conditional>
  </>
);

describe('Raw in Conditional', async () => {
  it('Raw in Conditional', async () => {
    const htmlRes = await jsxToString(<Template />);
    expect(htmlRes).toMatchSnapshot();

    const renderRes = await render(<Template />);
    expect(renderRes).toMatchSnapshot();
  });
});
