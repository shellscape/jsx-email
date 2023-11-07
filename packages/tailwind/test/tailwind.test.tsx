import { jsxToString } from '@jsx-email/render';
import { Hr } from '@jsx-email/hr';
import { Head } from '@jsx-email/head';
import { Html } from '@jsx-email/html';

import { Tailwind, type TailwindProps } from '../dist';

type TailwindConfig = Partial<TailwindProps['config']>;

describe('Tailwind component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  describe('Inline styles', () => {
    it('should render children with inline Tailwind styles', () => {
      const actualOutput = jsxToString(
        <Tailwind>
          <div className="bg-white text-sm" />
        </Tailwind>
      );

      expect(actualOutput).not.toBeNull();
    });
  });

  it('should be able to use background image', () => {
    const actualOutput = jsxToString(
      <Tailwind>
        <div className="bg-[url(https://example.com/image.png)]" />
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });

  it('should override inline styles with Tailwind styles', () => {
    const actualOutput = jsxToString(
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
    const actualOutput = jsxToString(
      <Tailwind>
        <Hr className="w-12" />
      </Tailwind>
    );

    expect(actualOutput).toContain('width:3rem');
  });
});

describe('Responsive styles', () => {
  it('should add css to <head/>', () => {
    const actualOutput = jsxToString(
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

  it('should persist exsisting <head/> elements', () => {
    const actualOutput = jsxToString(
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

    const actualOutput = jsxToString(
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

    const actualOutput = jsxToString(
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
    const actualOutput = jsxToString(
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
    const actualOutput = jsxToString(
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
        } as any
      }
    };

    const actualOutput = jsxToString(
      <Tailwind config={config}>
        <div className="text-justify" />
      </Tailwind>
    );

    expect(actualOutput).toMatchSnapshot();
  });
});

describe('<Tailwind> component', () => {
  it('should preserve mso styles', () => {
    const actualOutput = jsxToString(
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

    expect(actualOutput).toMatchInlineSnapshot(
      '"<div data-id=\\"__jsx-email-twnd\\"><head data-id=\\"__jsx-email-twnd\\"><style twind=\\"\\">*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}::before,::after{--tw-content:\'\'}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,\\"Helvetica Neue\\",Arial,\\"Noto Sans\\",sans-serif,\\"Apple Color Emoji\\",\\"Segoe UI Emoji\\",\\"Segoe UI Symbol\\",\\"Noto Color Emoji\\";font-feature-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\\"Liberation Mono\\",\\"Courier New\\",monospace;font-feature-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=\'button\'],[type=\'reset\'],[type=\'submit\']{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=\'search\']{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=\\"button\\"]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}@media (min-width:640px){.sm\\\\:bg-red-50{--tw-bg-opacity:1;background-color:rgba(254,242,242,var(--tw-bg-opacity))}}@media (min-width:640px){.sm\\\\:text-sm{font-size:0.875rem;line-height:1.25rem}}@media (min-width:768px){.md\\\\:text-lg{font-size:1.125rem;line-height:1.75rem}}</style></head><html data-id=\\"@jsx-email/html\\" lang=\\"en\\" dir=\\"ltr\\"><head data-id=\\"@jsx-email/head\\"><meta http-equiv=\\"Content-Type\\" content=\\"text/html; charset=UTF-8\\"/></head><span><!--[if mso]><i style=\\"letter-spacing: 10px;mso-font-width:-100%;\\" hidden>&nbsp;</i><![endif]--></span><div class=\\"bg-white sm:bg-red-50 sm:text-sm md:text-lg custom-class\\"/></html></div>"'
    );
  });

  it('should recognize custom resopnsive screen', () => {
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
    const actualOutput = jsxToString(
      <Tailwind config={config}>
        <Html>
          <Head />
          <div className="xl:bg-green-500">Test</div>
          <div className="2xl:bg-blue-500">Test</div>
        </Html>
      </Tailwind>
    );

    expect(actualOutput).toMatchInlineSnapshot(
      '"<div data-id=\\"__jsx-email-twnd\\"><head data-id=\\"__jsx-email-twnd\\"><style twind=\\"\\">*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:currentColor}::before,::after{--tw-content:\'\'}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,\\"Helvetica Neue\\",Arial,\\"Noto Sans\\",sans-serif,\\"Apple Color Emoji\\",\\"Segoe UI Emoji\\",\\"Segoe UI Symbol\\",\\"Noto Color Emoji\\";font-feature-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\\"Liberation Mono\\",\\"Courier New\\",monospace;font-feature-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=\'button\'],[type=\'reset\'],[type=\'submit\']{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=\'search\']{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=\\"button\\"]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}</style></head><html data-id=\\"@jsx-email/html\\" lang=\\"en\\" dir=\\"ltr\\"><head data-id=\\"@jsx-email/head\\"><meta http-equiv=\\"Content-Type\\" content=\\"text/html; charset=UTF-8\\"/></head><div class=\\"xl:bg-green-500\\">Test</div><div class=\\"2xl:bg-blue-500\\">Test</div></html></div>"'
    );
  });

  it('should work with calc() with + sign', () => {
    const actualOutput = jsxToString(
      <Tailwind>
        <div className="max-h-[calc(50px+3rem)] bg-red-100">
          <div className="h-[200px]">something tall</div>
        </div>
      </Tailwind>
    );

    expect(actualOutput).toMatchInlineSnapshot(
      '"<div data-id=\\"__jsx-email-twnd\\"><head data-id=\\"__jsx-email-twnd\\"><style twind=\\"\\">*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}::before,::after{--tw-content:\'\'}html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,\\"Helvetica Neue\\",Arial,\\"Noto Sans\\",sans-serif,\\"Apple Color Emoji\\",\\"Segoe UI Emoji\\",\\"Segoe UI Symbol\\",\\"Noto Color Emoji\\";font-feature-settings:normal}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\\"Liberation Mono\\",\\"Courier New\\",monospace;font-feature-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,[type=\'button\'],[type=\'reset\'],[type=\'submit\']{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=\'search\']{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=\\"button\\"]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}.h-\\\\[200px\\\\]{height:200px}.bg-red-100{--tw-bg-opacity:1;background-color:rgba(254,226,226,var(--tw-bg-opacity))}.max-h-\\\\[calc\\\\(50px\\\\+3rem\\\\)\\\\]{max-height:calc(50px + 3rem)}</style></head><div class=\\"max-h-[calc(50px+3rem)] bg-red-100\\"><div class=\\"h-[200px]\\">something tall</div></div></div>"'
    );
  });
});
