// @vitest-environment happy-dom

import { scan } from 'canispam';
import { describe, expect, it } from 'vitest';

import { toEml } from '../../src/eml/index.js';

const date = new Date('2026-05-13T12:00:00.000Z');
const messageId = '<preview-1@jsx.email>';

describe('toEml', () => {
  it('creates multipart alternative EML from html and plain output', () => {
    const eml = toEml({
      date,
      from: 'Preview <preview@jsx.email>',
      html: '<main><p>Hello HTML</p></main>',
      messageId,
      plain: 'Hello plain',
      subject: 'Welcome',
      to: 'Recipient <recipient@example.com>'
    });

    expect(eml).toContain('From: Preview <preview@jsx.email>\r\n');
    expect(eml).toContain('To: Recipient <recipient@example.com>\r\n');
    expect(eml).toContain('Subject: Welcome\r\n');
    expect(eml).toContain('Date: Wed, 13 May 2026 12:00:00 GMT\r\n');
    expect(eml).toContain('Message-ID: <preview-1@jsx.email>\r\n');
    expect(eml).toContain('Content-Type: multipart/alternative; boundary="jsx-email-');
    expect(eml).toContain('Content-Type: text/plain; charset=utf-8\r\n');
    expect(eml).toContain('Hello plain\r\n');
    expect(eml).toContain('Content-Type: text/html; charset=utf-8\r\n');
    expect(eml).toContain('<main><p>Hello HTML</p></main>\r\n');
    expect(eml).toContain('\r\n--jsx-email-');
    expect(eml.endsWith('\r\n')).toBe(true);
  });

  it('creates html-only EML', () => {
    const eml = toEml({
      date,
      html: '<p>A clean HTML message.</p>',
      messageId,
      subject: 'HTML only'
    });

    expect(eml).toContain('Content-Type: text/html; charset=utf-8\r\n');
    expect(eml).toContain('Content-Transfer-Encoding: quoted-printable\r\n');
    expect(eml).toContain('<p>A clean HTML message.</p>\r\n');
    expect(eml).not.toContain('multipart/alternative');
  });

  it('creates plain-only EML', () => {
    const eml = toEml({
      date,
      messageId,
      plain: 'A clean plaintext message.',
      subject: 'Plain only'
    });

    expect(eml).toContain('Content-Type: text/plain; charset=utf-8\r\n');
    expect(eml).toContain('A clean plaintext message.\r\n');
    expect(eml).not.toContain('multipart/alternative');
  });

  it('normalizes body line endings to CRLF', () => {
    const eml = toEml({
      date,
      messageId,
      plain: 'one\r\ntwo\rthree',
      subject: 'Line endings'
    });

    expect(eml).toContain('\r\n\r\none\r\ntwo\r\nthree\r\n');
    expect(eml).not.toContain('\rthree');
  });

  it('encodes non-ascii headers and quoted-printable body bytes', () => {
    const eml = toEml({
      date,
      messageId,
      plain: 'Welcome 👉',
      subject: 'Welcome 👉'
    });

    expect(eml).toContain('Subject: =?UTF-8?Q?Welcome_=F0=9F=91=89?=');
    expect(eml).toContain('Welcome =F0=9F=91=89\r\n');
  });

  it('includes custom headers', () => {
    const eml = toEml({
      date,
      headers: {
        'X-Template-Name': 'receipt'
      },
      messageId,
      plain: 'Hello',
      subject: 'Headers'
    });

    expect(eml).toContain('X-Template-Name: receipt\r\n');
  });

  it('requires html or plain content', () => {
    expect(() => toEml({ subject: 'Empty' })).toThrow(TypeError);
  });

  it('creates EML that can be scanned by canispam', async () => {
    const eml = toEml({
      date,
      html: '<p>Your receipt is ready.</p><a href="https://example.com/receipt">View receipt</a>',
      messageId,
      plain: 'Your receipt is ready. View receipt: https://example.com/receipt',
      subject: 'Your receipt'
    });
    const result = await scan(eml);

    expect(result.subject).toBe('Your receipt');
    expect(result.html).toContain('Your receipt is ready.');
    expect(result.text).toContain('Your receipt is ready.');
    expect(result.classification).toBe('pass');
  });
});
