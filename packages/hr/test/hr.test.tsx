import { render } from '@jsx-email/render';

import { Hr } from '../src';

describe('<Hr> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('passes styles and other props correctly', () => {
    const style = { borderColor: 'black', width: '50%' };
    const html = render(<Hr style={style} data-testid="hr-test" />);
    expect(html).toContain('width:50%');
    expect(html).toContain('border-color:black');
    expect(html).toContain('data-testid="hr-test"');
  });

  it('renders correctly', () => {
    const actualOutput = render(<Hr />);
    expect(actualOutput).toMatchSnapshot();
  });
});
