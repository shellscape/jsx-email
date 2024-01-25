// @ts-ignore
import React from 'react';

import { Tailwind, type TailwindProps } from '../../dist';
import { jsxToString, render } from '../../src/render';
import { Hr } from '../../src/components/hr';
import { Head } from '../../src/components/head';
import { Html } from '../../src/components/html';

type TailwindConfig = Partial<TailwindProps['config']>;

describe('Tailwind component', async () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  describe('Inline styles', async () => {
    it('should render children with inline Tailwind styles', async () => {
      const actualOutput = await jsxToString(
        <Tailwind>
          <div className="bg-white text-sm" />
        </Tailwind>
      );

      expect(actualOutput).not.toBeNull();

      const renderOutput = await render(
        <Tailwind>
          <div className="bg-white text-sm" />
        </Tailwind>
      );

      expect(renderOutput).toMatchSnapshot();
    });
  });

  it('should be able to use background image', async () => {
    const actualOutput = await jsxToString(
      <Tailwind>
        <div className="bg-[url(https://example.com/image.png)]" />
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('should preserve inline styles with Tailwind classes', async () => {
    const actualOutput = await jsxToString(
      <Tailwind>
        <div
          style={{ backgroundColor: 'red', fontSize: '12px' }}
          className="bg-black text-[16px]"
        />
      </Tailwind>
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it('should preserve component inline styles with Tailwind styles', async () => {
    const actualOutput = await jsxToString(
      <Tailwind>
        <Hr className="!w-12" />
      </Tailwind>
    );
    expect(actualOutput).toMatchSnapshot();
  });
});

describe('Responsive styles', async () => {
  it('should add css to <head/>', async () => {
    const actualOutput = await render(
      <Tailwind>
        <html>
          <head />
          <body>
            <div className="bg-red-200 sm:bg-red-300 md:bg-red-400 lg:bg-red-500" />
          </body>
        </html>
      </Tailwind>,
      { pretty: true }
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it('should persist exsisting <head/> elements', async () => {
    const actualOutput = await render(
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

describe('Custom theme config', async () => {
  it('should be able to use custom colors', async () => {
    const config: TailwindConfig = {
      theme: {
        extend: {
          colors: {
            custom: '#1fb6ff'
          }
        }
      }
    };

    const actualOutput = await jsxToString(
      <Tailwind config={config}>
        <div className="text-custom bg-custom" />
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('should be able to use custom fonts', async () => {
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

    const actualOutput = await jsxToString(
      <Tailwind config={config}>
        <div className="font-sans" />
        <div className="font-serif" />
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('should be able to use custom spacing', async () => {
    const config: TailwindConfig = {
      theme: {
        extend: {
          spacing: {
            '8xl': '96rem'
          }
        }
      }
    };
    const actualOutput = await jsxToString(
      <Tailwind config={config}>
        <div className="m-8xl"></div>
      </Tailwind>
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it('should be able to use custom border radius', async () => {
    const config: TailwindConfig = {
      theme: {
        extend: {
          borderRadius: {
            '4xl': '2rem'
          }
        }
      }
    };
    const actualOutput = await jsxToString(
      <Tailwind config={config}>
        <div className="rounded-4xl" />
      </Tailwind>
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it('should be able to use custom text alignment', async () => {
    const config: TailwindConfig = {
      theme: {
        extend: {
          textAlign: {
            justify: 'justify'
          }
        } as any
      }
    };

    const actualOutput = await jsxToString(
      <Tailwind config={config}>
        <div className="text-justify" />
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });
});

describe('<Tailwind> component', async () => {
  it('should preserve mso styles', async () => {
    const actualOutput = await jsxToString(
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

  it('should recognize custom resopnsive screen', async () => {
    const config: TailwindConfig = {
      theme: {
        screens: {
          sm: { min: '640px' },
          // eslint-disable-next-line sort-keys
          md: { min: '768px' },
          // eslint-disable-next-line sort-keys
          lg: { min: '1024px' },
          xl: { min: '1280px' },
          // eslint-disable-next-line sort-keys
          '2xl': { min: '1536px' }
        }
      }
    };
    const actualOutput = await jsxToString(
      <Tailwind config={config}>
        <Html>
          <Head />
          <div className="xl:bg-green-500">Test</div>
          <div className="2xl:bg-blue-500">Test</div>
        </Html>
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('should work with calc() with + sign', async () => {
    const actualOutput = await jsxToString(
      <Tailwind>
        <div className="max-h-[calc(50px+3rem)] bg-red-100">
          <div className="h-[200px]">something tall</div>
        </div>
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });
});

describe('Production mode', async () => {
  it('should generate class names with a prefix', async () => {
    const actualOutput = await jsxToString(
      <Tailwind production>
        <Html>
          <div className="text-sm bg-red-100" />
        </Html>
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });
});
