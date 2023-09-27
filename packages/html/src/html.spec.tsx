import { render } from '@jsx-email/render';

import { Html } from './index';

describe('render', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders the <Html> component', () => {
    const actualOutput = render(<Html />);
    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><html data-id=\\"@jsx-email/html\\" lang=\\"en\\" dir=\\"ltr\\"></html>"'
    );
  });
});
