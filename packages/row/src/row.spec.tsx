import { render } from '@jsx-email/render';

import { Row } from './index';

describe('render', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders the <Row> component', () => {
    const actualOutput = render(<Row children={undefined} />);
    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><table align=\\"center\\" width=\\"100%\\" data-id=\\"@jsx-email/row\\" role=\\"presentation\\" cellSpacing=\\"0\\" cellPadding=\\"0\\" border=\\"0\\"><tbody style=\\"width:100%\\"><tr style=\\"width:100%\\"></tr></tbody></table>"'
    );
  });
});
