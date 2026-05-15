import { describe, expect, it } from 'vitest';

import { InvalidEmlError, scan } from '../src/index.js';
import { htmlEml, multipartEml, plainEml } from './helpers.js';

describe('EML parsing', () => {
  it('extracts text, HTML, and subject from multipart alternative EML', async () => {
    const result = await scan(
      multipartEml({
        html: '<p>Hello <strong>HTML</strong></p>',
        plain: 'Hello plain',
        subject: 'Welcome'
      })
    );

    expect(result.subject).toBe('Welcome');
    expect(result.text).toBe('Hello plain');
    expect(result.html).toBe('<p>Hello <strong>HTML</strong></p>');
  });

  it('handles single-part text/plain EML', async () => {
    const result = await scan(plainEml('A clean plaintext message.'));

    expect(result.text).toBe('A clean plaintext message.');
    expect(result.html).toBe('');
  });

  it('handles single-part text/html EML', async () => {
    const result = await scan(htmlEml('<main><p>A clean HTML message.</p></main>'));

    expect(result.html).toContain('clean HTML');
    expect(result.text).toBe('');
  });

  it('unfolds headers and decodes UTF-8 encoded-word subjects', async () => {
    const eml = `From: preview@jsx.email
To: recipient@example.com
Subject: =?UTF-8?B?V2VsY29tZSDwn5GJ?=
X-Long: first
 second
MIME-Version: 1.0
Content-Type: text/plain

Hello`;
    const result = await scan(eml);

    expect(result.subject).toBe('Welcome 👉');
    expect(result.text).toBe('Hello');
  });

  it('rejects malformed EML', async () => {
    await expect(scan('Subject: Missing separator')).rejects.toBeInstanceOf(InvalidEmlError);
  });
});
