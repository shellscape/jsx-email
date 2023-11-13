import { jsxToString } from '../../src/render';
import { Hr } from '../../src/components/hr';
import { Head } from '../../src/components/head';
import { Html } from '../../src/components/html';

import { Tailwind, type TailwindProps } from '../../dist';

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

  it('should override inline styles with Tailwind styles', async () => {
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

  it('should override component styles with Tailwind styles', async () => {
    const actualOutput = await jsxToString(
      <Tailwind>
        <Hr className="w-12" />
      </Tailwind>
    );

    expect(actualOutput).toContain('width:3rem');
  });
});

describe('Responsive styles', async () => {
  it('should add css to <head/>', async () => {
    const actualOutput = await jsxToString(
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

  it('should persist exsisting <head/> elements', async () => {
    const actualOutput = await jsxToString(
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

  it('should be able to use custom colors', async () => {
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

    expect(actualOutput).toMatchInlineSnapshot(
      '"<div data-id=\\"__jsx-email-twnd\\"><html data-id=\\"@jsx-email/html\\" lang=\\"en\\" dir=\\"ltr\\"><head data-id=\\"@jsx-email/head\\"><meta http-equiv=\\"Content-Type\\" content=\\"text/html; charset=UTF-8\\"/></head><span><!--[if mso]><i style=\\"letter-spacing: 10px;mso-font-width:-100%;\\" hidden>&nbsp;</i><![endif]--></span><div class=\\"bg-white sm:bg-red-50 sm:text-sm md:text-lg custom-class\\"></div></html><style twind>button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;margin:0;padding:0;line-height:inherit;color:inherit}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,\\"Helvetica Neue\\",Arial,\\"Noto Sans\\",sans-serif,\\"Apple Color Emoji\\",\\"Segoe UI Emoji\\",\\"Segoe UI Symbol\\",\\"Noto Color Emoji\\"}table{text-indent:0;border-color:inherit;border-collapse:collapse}hr{height:0;color:inherit;border-top-width:1px}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}button{background-color:transparent;background-image:none}body{font-family:inherit;line-height:inherit}*,::before,::after{box-sizing:border-box;border:0 solid #e5e7eb}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}::-moz-focus-inner{border-style:none;padding:0}[type=\\"search\\"]{-webkit-appearance:textfield;outline-offset:-2px}pre,code,kbd,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\\"Liberation Mono\\",\\"Courier New\\",monospace;font-size:1em}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}body,blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre,fieldset,ol,ul{margin:0}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}fieldset,ol,ul,legend{padding:0}textarea{resize:vertical}button,[role=\\"button\\"]{cursor:pointer}:-moz-focusring{outline:1px dotted ButtonText}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}summary{display:list-item}:root{-moz-tab-size:4;tab-size:4}ol,ul{list-style:none}img{border-style:solid}button,select{text-transform:none}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}sub{bottom:-0.25em}sup{top:-0.5em}button,[type=\\"button\\"],[type=\\"reset\\"],[type=\\"submit\\"]{-webkit-appearance:button}::-webkit-search-decoration{-webkit-appearance:none}.bg-white{--tw-bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--tw-bg-opacity))}@media (min-width:640px){.sm\\\\:bg-red-50{--tw-bg-opacity:1;background-color:#fef2f2;background-color:rgba(254,242,242,var(--tw-bg-opacity))}}@media (min-width:640px){.sm\\\\:text-sm{font-size:0.875rem;line-height:1.25rem}}@media (min-width:768px){.md\\\\:text-lg{font-size:1.125rem;line-height:1.75rem}}</style></div>"'
    );
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

    expect(actualOutput).toMatchInlineSnapshot(
      '"<div data-id=\\"__jsx-email-twnd\\"><html data-id=\\"@jsx-email/html\\" lang=\\"en\\" dir=\\"ltr\\"><head data-id=\\"@jsx-email/head\\"><meta http-equiv=\\"Content-Type\\" content=\\"text/html; charset=UTF-8\\"/></head><div class=\\"xl:bg-green-500\\">Test</div><div class=\\"2xl:bg-blue-500\\">Test</div></html><style twind>button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;margin:0;padding:0;line-height:inherit;color:inherit}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,\\"Helvetica Neue\\",Arial,\\"Noto Sans\\",sans-serif,\\"Apple Color Emoji\\",\\"Segoe UI Emoji\\",\\"Segoe UI Symbol\\",\\"Noto Color Emoji\\"}table{text-indent:0;border-color:inherit;border-collapse:collapse}hr{height:0;color:inherit;border-top-width:1px}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}button{background-color:transparent;background-image:none}body{font-family:inherit;line-height:inherit}*,::before,::after{box-sizing:border-box;border:0 solid #e5e7eb}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}::-moz-focus-inner{border-style:none;padding:0}[type=\\"search\\"]{-webkit-appearance:textfield;outline-offset:-2px}pre,code,kbd,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\\"Liberation Mono\\",\\"Courier New\\",monospace;font-size:1em}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}body,blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre,fieldset,ol,ul{margin:0}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}fieldset,ol,ul,legend{padding:0}textarea{resize:vertical}button,[role=\\"button\\"]{cursor:pointer}:-moz-focusring{outline:1px dotted ButtonText}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}summary{display:list-item}:root{-moz-tab-size:4;tab-size:4}ol,ul{list-style:none}img{border-style:solid}button,select{text-transform:none}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}sub{bottom:-0.25em}sup{top:-0.5em}button,[type=\\"button\\"],[type=\\"reset\\"],[type=\\"submit\\"]{-webkit-appearance:button}::-webkit-search-decoration{-webkit-appearance:none}@media (min-width:1280px){.xl\\\\:bg-green-500{--tw-bg-opacity:1;background-color:#10b981;background-color:rgba(16,185,129,var(--tw-bg-opacity))}}@media (min-width:1536px){.\\\\32 xl\\\\:bg-blue-500{--tw-bg-opacity:1;background-color:#3b82f6;background-color:rgba(59,130,246,var(--tw-bg-opacity))}}</style></div>"'
    );
  });

  it('should work with calc() with + sign', async () => {
    const actualOutput = await jsxToString(
      <Tailwind>
        <div className="max-h-[calc(50px+3rem)] bg-red-100">
          <div className="h-[200px]">something tall</div>
        </div>
      </Tailwind>
    );

    expect(actualOutput).toMatchInlineSnapshot(
      '"<div data-id=\\"__jsx-email-twnd\\"><div class=\\"max-h-[calc(50px+3rem)] bg-red-100\\"><div class=\\"h-[200px]\\">something tall</div></div><style twind>button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;margin:0;padding:0;line-height:inherit;color:inherit}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\\"Segoe UI\\",Roboto,\\"Helvetica Neue\\",Arial,\\"Noto Sans\\",sans-serif,\\"Apple Color Emoji\\",\\"Segoe UI Emoji\\",\\"Segoe UI Symbol\\",\\"Noto Color Emoji\\"}table{text-indent:0;border-color:inherit;border-collapse:collapse}hr{height:0;color:inherit;border-top-width:1px}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}button{background-color:transparent;background-image:none}body{font-family:inherit;line-height:inherit}*,::before,::after{box-sizing:border-box;border:0 solid #e5e7eb}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}::-moz-focus-inner{border-style:none;padding:0}[type=\\"search\\"]{-webkit-appearance:textfield;outline-offset:-2px}pre,code,kbd,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\\"Liberation Mono\\",\\"Courier New\\",monospace;font-size:1em}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}body,blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre,fieldset,ol,ul{margin:0}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}fieldset,ol,ul,legend{padding:0}textarea{resize:vertical}button,[role=\\"button\\"]{cursor:pointer}:-moz-focusring{outline:1px dotted ButtonText}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}summary{display:list-item}:root{-moz-tab-size:4;tab-size:4}ol,ul{list-style:none}img{border-style:solid}button,select{text-transform:none}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}sub{bottom:-0.25em}sup{top:-0.5em}button,[type=\\"button\\"],[type=\\"reset\\"],[type=\\"submit\\"]{-webkit-appearance:button}::-webkit-search-decoration{-webkit-appearance:none}.bg-red-100{--tw-bg-opacity:1;background-color:#fee2e2;background-color:rgba(254,226,226,var(--tw-bg-opacity))}.h-\\\\[200px\\\\]{height:200px}.max-h-\\\\[calc\\\\(50px\\\\+3rem\\\\)\\\\]{max-height:calc(50px + 3rem)}</style></div>"'
    );
  });
});
