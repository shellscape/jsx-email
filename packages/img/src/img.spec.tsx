import { render } from '@jsx-email/render';

import { Img } from './index';

describe('render', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders the <Img> component', () => {
    const actualOutput = render(<Img src="cat.jpg" alt="Cat" width="300" height="300" />);
    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><img data-id=\\"@jsx-email/img\\" alt=\\"Cat\\" src=\\"cat.jpg\\" width=\\"300\\" height=\\"300\\" style=\\"border:none;display:block;outline:none;text-decoration:none\\"/>"'
    );
  });
});
