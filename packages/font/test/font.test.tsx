import { render } from '@jsx-email/render';

import { Font } from '../src';

describe('<Font> component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('renders with default props', () => {
    const html = render(<Font fontFamily="Arial" fallbackFontFamily="Helvetica" />);

    expect(html).toContain('font-style: normal;');
    expect(html).toContain('font-weight: 400;');
    expect(html).toContain("font-family: 'Arial';");
  });

  it('renders with webFont prop', () => {
    const webFont = {
      format: 'woff',
      url: 'example.com/font.woff'
    } as const;

    const html = render(
      <Font fontFamily="Example" fallbackFontFamily="Helvetica" webFont={webFont} />
    );

    expect(html).toContain("font-family: 'Example';");
    expect(html).toContain(`src: url(${webFont.url}) format('${webFont.format}');`);
  });

  it('renders with multiple fallback fonts', () => {
    const html = render(<Font fontFamily="Arial" fallbackFontFamily={['Helvetica', 'Verdana']} />);

    expect(html).toContain("font-family: 'Arial', Helvetica, Verdana;");
  });

  it('renders correctly', () => {
    const actualOutput = render(<Font fontFamily="Roboto" fallbackFontFamily={'Verdana'} />);
    expect(actualOutput).toMatchSnapshot();
  });
});
