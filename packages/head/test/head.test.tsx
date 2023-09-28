import { render } from '@jsx-email/render';

import { Head } from '../src';

describe('<Head> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders children correctly', () => {
    const testMessage = 'Test message';
    const html = render(<Head>{testMessage}</Head>);
    expect(html).toContain(testMessage);
  });

  it('renders correctly', () => {
    const actualOutput = render(<Head />);
    expect(actualOutput).toMatchSnapshot();
  });

  it('renders style tags', () => {
    const actualOutput = render(
      <Head>
        <style>
          {`body{
            color: red;
          }`}
        </style>
      </Head>
    );
    expect(actualOutput).toMatchSnapshot();
  });
});
