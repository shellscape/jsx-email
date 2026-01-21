import { describe, expect, it } from 'vitest';

// Import from source to keep tests hermetic and avoid prebuild coupling
import { Conditional, Raw, render } from '../src/index.ts';

function getHead(html: string) {
  const start = html.indexOf('<head');
  if (start === -1) return '';

  const end = html.indexOf('</head>', start);
  if (end === -1) return '';

  return html.slice(start, end + '</head>'.length);
}

describe('<Conditional mso> closer', () => {
  it('emits a self-closing MSO closer `<![endif]/-->`', async () => {
    // Outside <head>, we prefer the self-closing closer to avoid comment spillover.
    const html = await render(
      <Conditional mso>
        <Raw content={'<b data-testid="closer">hi</b>'} />
      </Conditional>
    );

    expect(html).toContain('<![endif]/-->' /* Outlook-friendly closer */);
    expect(html).not.toContain('<![endif]-->' /* slashless closer */);
    expect(html).not.toContain('<!--[endif]---->' /* previously corrupted closer */);
    // Robustness: ensure the closer appears exactly once
    expect((html.match(/<!\[endif\]\/-->/g) || []).length).toBe(1);
  });

  it('emits the standard MSO closer `<![endif]-->` within <head>', async () => {
    // Within <head>, use the standard closer for Classic Outlook compatibility.
    const html = await render(
      <Conditional head mso>
        <Raw content={'<b data-testid="closer-head">hi</b>'} />
      </Conditional>
    );

    const head = getHead(html);

    expect(head).toContain('<!--[if mso]>' /* opener */);
    expect(head).toContain('data-testid="closer-head"');
    expect(head).toContain('<![endif]-->' /* standard closer */);
    expect(head).not.toContain('<![endif]/-->' /* slashed closer */);
    expect(head).not.toContain('<!--[endif]---->' /* previously corrupted closer */);
    // Robustness: ensure the closer appears exactly once
    expect((head.match(/<!\[endif\]-->/g) || []).length).toBe(1);
  });

  it('emits the standard closer for expression conditionals within <head>', async () => {
    const html = await render(
      <Conditional head expression="gte mso 9">
        <Raw content={'<b data-testid="closer-head-expr">hi</b>'} />
      </Conditional>
    );

    const head = getHead(html);

    expect(head).toContain('<!--[if gte mso 9]>' /* opener */);
    expect(head).toContain('data-testid="closer-head-expr"');
    expect(head).toContain('<![endif]-->' /* standard closer */);
    expect(head).not.toContain('<![endif]/-->' /* slashed closer */);
    expect(head).not.toContain('<!--[endif]---->' /* previously corrupted closer */);
  });

  it('emits the slashed closer for expression conditionals outside <head>', async () => {
    const html = await render(
      <Conditional expression="gte mso 9">
        <Raw content={'<b data-testid="closer-body-expr">hi</b>'} />
      </Conditional>
    );

    expect(html).toContain('<![endif]/-->' /* slashed closer */);
    expect(html).not.toContain('<![endif]-->' /* standard closer */);
    expect((html.match(/<!\[endif\]\/-->/g) || []).length).toBe(1);
  });

  it('emits the standard closer for OfficeDocumentSettings XML within <head>', async () => {
    // Canonical guardrail for the Classic Outlook + OfficeDocumentSettings scenario.
    const officeXml =
      '<xml><o:OfficeDocumentSettings><o:AllowPNG /><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>';

    const html = await render(
      <Conditional head mso>
        <Raw content={officeXml} />
      </Conditional>
    );

    const head = getHead(html);

    expect(head).toContain('<!--[if mso]>' /* opener */);
    expect(head).toContain('<o:OfficeDocumentSettings>');
    expect(head).toContain('<![endif]-->' /* standard closer */);
    expect(head).not.toContain('<![endif]/-->' /* slashed closer */);
    expect(head).not.toContain('<!--[endif]---->' /* previously corrupted closer */);
  });
});
