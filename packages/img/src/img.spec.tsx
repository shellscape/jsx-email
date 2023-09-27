import { render } from '@jsx-email/render';
import { Img } from './index';

describe('<Img> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('passes style and other props correctly', () => {
    const style = { backgroundColor: 'red', border: 'solid 1px black' };
    const html = render(
      <Img src="cat.jpg" alt="Cat" width="300" height="300" style={style} data-testid="img-test" />
    );
    expect(html).toContain('background-color:red');
    expect(html).toContain('border:solid 1px black');
    expect(html).toContain('data-testid="img-test"');
  });

  it('renders correctly', () => {
    const actualOutput = render(<Img src="cat.jpg" alt="Cat" width="300" height="300" />);
    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><img data-id=\\"@jsx-email/img\\" alt=\\"Cat\\" src=\\"cat.jpg\\" width=\\"300\\" height=\\"300\\" style=\\"border:none;display:block;outline:none;text-decoration:none\\"/>"'
    );
  });
});
