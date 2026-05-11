import { describe, expect, it } from 'vitest';

import { clean } from '../src/index.js';

const runClean = async (html: string, options = {}) => {
  const plugin = clean(options);

  if (!plugin.afterRender) {
    throw new TypeError('Expected clean plugin to expose an afterRender hook');
  }

  return plugin.afterRender({ chalk: {} as never, html, log: {} });
};

describe('plugin-clean', () => {
  it('removes unused selectors and class names', async () => {
    const result = await runClean(`
      <html>
        <head>
          <style>
            .used { color: red; }
            .unused-selector { color: blue; }
          </style>
        </head>
        <body>
          <div class="used unused-class">Hello</div>
        </body>
      </html>
    `);

    expect(result).toContain('.used');
    expect(result).toContain('class="used"');
    expect(result).not.toContain('unused-selector');
    expect(result).not.toContain('unused-class');
  });

  it('keeps whitelisted selectors', async () => {
    const result = await runClean(
      `
        <html>
          <head>
            <style>
              .used { color: red; }
              .should-keep { color: blue; }
              .should-remove { color: yellow; }
            </style>
          </head>
          <body>
            <div class="used">Hello</div>
          </body>
        </html>
      `,
      { whitelist: ['*keep*'] }
    );

    expect(result).toContain('.used');
    expect(result).toContain('.should-keep');
    expect(result).not.toContain('.should-remove');
  });

  it('preserves backend delimiters in class attributes', async () => {
    const result = await runClean(`
      <html>
        <head>
          <style>
            .used { color: red; }
            .unused-selector { color: blue; }
          </style>
        </head>
        <body>
          <div class="used {{ computedClass }}">Hello</div>
        </body>
      </html>
    `);

    expect(result).toContain('class="used {{ computedClass }}"');
    expect(result).not.toContain('unused-selector');
  });

  it('preserves conditional comments by default', async () => {
    const result = await runClean(`
      <html>
        <head>
          <!--[if mso]>
          <table><tr><td>Outlook</td></tr></table>
          <![endif]-->
          <style>
            .used { color: red; }
          </style>
        </head>
        <body>
          <div class="used">Hello</div>
        </body>
      </html>
    `);

    expect(result).toContain('<!--[if mso]>');
    expect(result).toContain('<![endif]-->');
  });
});
