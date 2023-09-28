import { render } from '../src';
import { Preview } from '../src/utils/preview';
import { Template } from '../src/utils/template';

describe('render', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('converts a React component into HTML', () => {
    const actualOutput = render(<Template firstName="Jim" />);
    expect(actualOutput).toMatchSnapshot();
  });

  it('converts a React component into PlainText', () => {
    const actualOutput = render(<Template firstName="Jim" />, {
      plainText: true
    });
    expect(actualOutput).toMatchSnapshot();
  });

  it('converts to plain text and removes reserved ID', () => {
    const actualOutput = render(<Preview />, {
      plainText: true
    });
    expect(actualOutput).toMatchSnapshot();
  });
});
