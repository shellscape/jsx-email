import { render } from '@jsx-email/render';
import { Hr } from './index';

describe('<Hr> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('passes styles and other props correctly', () => {
    const style = {
      width: '50%',
      borderColor: 'black'
    };
    const html = render(<Hr style={style} data-testid="hr-test" />);
    expect(html).toContain('width:50%');
    expect(html).toContain('border-color:black');
    expect(html).toContain('data-testid="hr-test"');
  });

  it('renders correctly', () => {
    const actualOutput = render(<Hr />);
    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><hr data-id=\\"@jsx-email/hr\\" style=\\"border:none;border-top:1px solid #eaeaea;width:100%\\"/>"'
    );
  });
});
