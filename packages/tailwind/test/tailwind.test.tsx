import { renderToStaticMarkup as render } from 'react-dom/server';
import { TailwindConfig } from 'tw-to-css';
import { Hr } from '@jsx-email/hr';
import { Head } from '@jsx-email/head';
import { Html } from '@jsx-email/html';

import { Tailwind } from '../src';

describe('Tailwind component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  describe('Inline styles', () => {
    it('should render children with inline Tailwind styles', () => {
      const actualOutput = render(
        <Tailwind>
          <div className="bg-white text-sm" />
        </Tailwind>
      );

      expect(actualOutput).not.toBeNull();
    });
  });

  it('should be able to use background image', () => {
    const actualOutput = render(
      <Tailwind>
        <div className="bg-[url(https://example.com/image.png)]" />
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('should override inline styles with Tailwind styles', () => {
    const actualOutput = render(
      <Tailwind>
        <div
          style={{ backgroundColor: 'red', fontSize: '12px' }}
          className="bg-black text-[16px]"
        />
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('should override component styles with Tailwind styles', () => {
    const actualOutput = render(
      <Tailwind>
        <Hr className="w-12" />
      </Tailwind>
    );

    expect(actualOutput).toContain('width:3rem');
  });
});

describe('Responsive styles', () => {
  it('should add css to <head/>', () => {
    const actualOutput = render(
      <Tailwind>
        <html>
          <head />
          <body>
            <div className="bg-red-200 sm:bg-red-300 md:bg-red-400 lg:bg-red-500" />
          </body>
        </html>
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('should throw an error when used without either <html/> or <head/> tags', () => {
    function noHtmlOrHead() {
      render(
        <Tailwind>
          <div className="bg-red-200 sm:bg-red-500" />
        </Tailwind>
      );
    }
    expect(noHtmlOrHead).toThrowErrorMatchingInlineSnapshot(
      `"Tailwind: To use responsive styles you must have a <html> and <head> element in your template."`
    );

    function noHtml() {
      render(
        <Tailwind>
          <head>
            <title>Test</title>
          </head>
          <div className="bg-red-200 sm:bg-red-500" />
        </Tailwind>
      );
    }
    expect(noHtml).toThrowErrorMatchingInlineSnapshot(
      `"Tailwind: To use responsive styles you must have a <html> and <head> element in your template."`
    );

    function noHead() {
      render(
        <Tailwind>
          <html>
            {/* <Head></Head> */}
            <div className="bg-red-200 sm:bg-red-500" />
          </html>
        </Tailwind>
      );
    }
    expect(noHead).toThrowErrorMatchingInlineSnapshot(
      `"Tailwind: To use responsive styles you must have a <html> and <head> element in your template."`
    );
  });

  it('should persist exsisting <head/> elements', () => {
    const actualOutput = render(
      <Tailwind>
        <html>
          <head>
            <style />
            <link />
          </head>
          <body>
            <div className="bg-red-200 sm:bg-red-500" />
          </body>
        </html>
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });
});

describe('Custom theme config', () => {
  it('should be able to use custom colors', () => {
    const config: TailwindConfig = {
      theme: {
        extend: {
          colors: {
            custom: '#1fb6ff'
          }
        }
      }
    };

    const actualOutput = render(
      <Tailwind config={config}>
        <div className="text-custom bg-custom" />
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('should be able to use custom colors', () => {
    const config: TailwindConfig = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif']
          }
        }
      }
    };

    const actualOutput = render(
      <Tailwind config={config}>
        <div className="font-sans" />
        <div className="font-serif" />
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('should be able to use custom spacing', () => {
    const config: TailwindConfig = {
      theme: {
        extend: {
          spacing: {
            '8xl': '96rem'
          }
        }
      }
    };
    const actualOutput = render(
      <Tailwind config={config}>
        <div className="m-8xl"></div>
      </Tailwind>
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it('should be able to use custom border radius', () => {
    const config: TailwindConfig = {
      theme: {
        extend: {
          borderRadius: {
            '4xl': '2rem'
          }
        }
      }
    };
    const actualOutput = render(
      <Tailwind config={config}>
        <div className="rounded-4xl" />
      </Tailwind>
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it('should be able to use custom text alignment', () => {
    const config: TailwindConfig = {
      theme: {
        extend: {
          textAlign: {
            justify: 'justify'
          }
        }
      }
    };

    const actualOutput = render(
      <Tailwind config={config}>
        <div className="text-justify" />
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });
});

describe('Custom plugins config', () => {
  it('should be able to use custom plugins', () => {
    const config: TailwindConfig = {
      plugins: [
        ({ addUtilities }: any) => {
          const newUtilities = {
            '.border-custom': {
              border: '2px solid'
            }
          };

          addUtilities(newUtilities);
        }
      ]
    };

    const actualOutput = render(
      <Tailwind config={config}>
        <div className="border-custom" />
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('should be able to use custom plugins with responsive styles', () => {
    const config: TailwindConfig = {
      plugins: [
        ({ addUtilities }: any) => {
          const newUtilities = {
            '.border-custom': {
              border: '2px solid'
            }
          };

          addUtilities(newUtilities);
        }
      ]
    };

    const actualOutput = render(
      <Tailwind config={config}>
        <html>
          <head />
          <body>
            <div className="border-custom sm:border-custom" />
          </body>
        </html>
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });
});

describe('', () => {
  it('should preserve mso styles', () => {
    const actualOutput = render(
      <Tailwind>
        <Html>
          <Head />
          <span
            dangerouslySetInnerHTML={{
              __html: `<!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%;" hidden>&nbsp;</i><![endif]-->`
            }}
          />
          <div className="bg-white sm:bg-red-50 sm:text-sm md:text-lg custom-class" />
        </Html>
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });
});
