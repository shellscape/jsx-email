import { describe, expect, it } from 'vitest';

import { scan } from '../src/index.js';
import { htmlEml, multipartEml } from './helpers.js';

const findingRules = async (eml: string) =>
  (await scan(eml)).findings.map((finding) => finding.rule);

describe('scan rules', () => {
  it('passes clean JSX Email-style content', async () => {
    const result = await scan(
      multipartEml({
        html: '<p>Your receipt is ready.</p><a href="https://example.com/receipt">View receipt</a>',
        plain: 'Your receipt is ready. View receipt: https://example.com/receipt',
        subject: 'Your receipt'
      })
    );

    expect(result.classification).toBe('pass');
    expect(result.score).toBe(0);
    expect(result.classifier.category).toBe('ham');
    expect(result.classifier.isSpam).toBe(false);
  });

  it('flags suspicious subject and spam phrases', async () => {
    const result = await scan(
      multipartEml({
        html: '<p>Congratulations, you won a guaranteed risk free prize.</p>',
        plain: 'Congratulations, you won a guaranteed risk free prize.',
        subject: 'URGENT ACTION REQUIRED!!!'
      })
    );

    expect(result.classification).toBe('fail');
    expect(result.classifier.isSpam).toBe(true);
    expect(result.findings.map((finding) => finding.rule)).toContain('naive-bayes');
    expect(result.findings.map((finding) => finding.rule)).toContain('subject-urgency');
    expect(result.findings.map((finding) => finding.rule)).toContain('spam-keyword');
  });

  it('flags HTML hiding and image-heavy emails', async () => {
    const result = await scan(
      htmlEml('<p style="color:#fff;font-size:1px">hidden</p><img><img><img><img><img><img>')
    );
    const rules = result.findings.map((finding) => finding.rule);

    expect(rules).toContain('hidden-text');
    expect(rules).toContain('image-heavy');
    expect(rules).toContain('missing-plain-text');
    expect(result.findings.find((finding) => finding.rule === 'hidden-text')?.evidence).toBe(
      'hidden'
    );
  });

  it('ignores preview text and visible white button text', async () => {
    const result = await scan(
      htmlEml(
        [
          '<div data-skip="true" style="display:none;opacity:0">Read review</div>',
          '<a style="background-color:#ff5a5f;color:#fff">Send My Feedback</a>'
        ].join('')
      )
    );

    expect(result.findings.map((finding) => finding.rule)).not.toContain('hidden-text');
  });

  it('flags base64 images', async () => {
    await expect(
      findingRules(htmlEml('<img src="data:image/png;base64,abcd">'))
    ).resolves.toContain('base64-image');
  });

  it('flags suspicious links', async () => {
    const rules = await findingRules(
      htmlEml(
        '<a href="https://192.168.0.1/login">Login</a><a href="https://bit.ly/a">Short</a><a href="https://site.xyz">TLD</a>'
      )
    );

    expect(rules).toContain('ip-url');
    expect(rules).toContain('url-shortener');
    expect(rules).toContain('suspicious-tld');
  });

  it('flags mismatched link text and href URL', async () => {
    await expect(
      findingRules(htmlEml('<a href="https://evil.example/login">https://paypal.com/login</a>'))
    ).resolves.toContain('link-mismatch');
  });

  it('flags redirect URL parameters to another host', async () => {
    await expect(
      findingRules(
        htmlEml('<a href="https://example.com/login?next=https://evil.example">Login</a>')
      )
    ).resolves.toContain('redirect-url-param');
  });

  it('flags IDN homograph domains', async () => {
    await expect(
      findingRules(htmlEml('<a href="https://раypal.com/login">PayPal</a>'))
    ).resolves.toContain('idn-homograph');
  });
});
