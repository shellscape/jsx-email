import { render } from '@jsx-email/render';

import { Hr } from './index';

describe('render', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders the <Hr> component', () => {
    const actualOutput = render(<Hr />);
    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><hr data-id=\\"@jsx-email/hr\\" style=\\"border:none;border-top:1px solid #eaeaea;width:100%\\"/>"'
    );
  });
});
