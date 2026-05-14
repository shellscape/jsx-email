import { describe, expect, it } from 'vitest';

import { scan } from '../../../src/index.js';
import { htmlEml, multipartEml, plainEml } from '../../helpers.js';

const cases = {
  notApplicable: 5,
  supported: 10,
  unsupported: 7
};

describe('converted spamscanner compatibility', () => {
  it('keeps capability category counts intentional', () => {
    expect(cases).toEqual({
      notApplicable: 5,
      supported: 10,
      unsupported: 7
    });
  });

  it('classifies obvious spam with the spamscanner Naive Bayes model', async () => {
    const result = await scan(
      plainEml('Free winner prize lottery viagra. Act now to claim your guaranteed money.')
    );

    expect(result.classifier.category).toBe('spam');
    expect(result.classifier.isSpam).toBe(true);
    expect(result.findings.map((finding) => finding.rule)).toContain('naive-bayes');
  });

  it('classifies clean transactional content as ham with the spamscanner Naive Bayes model', async () => {
    const result = await scan(
      plainEml('Your receipt is ready. View your invoice and order summary.', 'Your receipt')
    );

    expect(result.classifier.category).toBe('ham');
    expect(result.classifier.isSpam).toBe(false);
  });

  it('detects GTUBE content', async () => {
    const result = await scan(
      plainEml('XJS*C4JDBQADN1.NSBN3*2IDNEN*GTUBE-STANDARD-ANTI-UBE-TEST-EMAIL*C.34X')
    );

    expect(result.findings.map((finding) => finding.rule)).toContain('gtube');
    expect(result.classification).toBe('fail');
  });

  it('detects all-caps urgent subjects', async () => {
    const result = await scan(plainEml('Please verify today.', 'URGENT ACTION REQUIRED!!!'));

    expect(result.findings.map((finding) => finding.rule)).toEqual(
      expect.arrayContaining(['subject-urgency', 'subject-all-caps', 'subject-punctuation'])
    );
  });

  it('detects hidden HTML text', async () => {
    const result = await scan(htmlEml('<p style="color:white">hidden offer</p>'));

    expect(result.findings.map((finding) => finding.rule)).toContain('hidden-text');
  });

  it('detects image-heavy low-text content', async () => {
    const result = await scan(htmlEml('<img><img><img><img><img><img>'));

    expect(result.findings.map((finding) => finding.rule)).toContain('image-heavy');
  });

  it('detects URL shorteners', async () => {
    const result = await scan(plainEml('Open https://bit.ly/reset now.'));

    expect(result.findings.map((finding) => finding.rule)).toContain('url-shortener');
  });

  it('detects suspicious sender-style TLDs in URLs', async () => {
    const result = await scan(plainEml('Open https://example.tk/offer now.'));

    expect(result.findings.map((finding) => finding.rule)).toContain('suspicious-tld');
  });

  it('detects IP address URLs', async () => {
    const result = await scan(plainEml('Open https://10.0.0.1/login now.'));

    expect(result.findings.map((finding) => finding.rule)).toContain('ip-url');
  });

  it('detects mismatched link text URLs', async () => {
    const result = await scan(
      multipartEml({
        html: '<a href="https://example.net/login">https://example.com/login</a>',
        plain: 'https://example.com/login'
      })
    );

    expect(result.findings.map((finding) => finding.rule)).toContain('link-mismatch');
  });

  it.skip('unsupported: ClamAV virus scanning requires server-side ClamAV integration', () => {});
  it.skip('unsupported: DKIM verification requires DNS and mailauth behavior', () => {});
  it.skip('unsupported: SPF checks require DNS and SMTP session metadata', () => {});
  it.skip('unsupported: DMARC checks require DNS and authentication alignment', () => {});
  it.skip('unsupported: reputation checks require network service calls', () => {});
  it.skip('unsupported: attachment macro scanning is outside generated template scope', () => {});
  it.skip('unsupported: NSFW image model scanning is intentionally excluded', () => {});

  it.todo('not-applicable: CLI tests belong to spamscanner executable behavior');
  it.todo('not-applicable: ARF parser tests target feedback reports');
  it.todo('not-applicable: SEA binary tests target Node packaging');
  it.todo('not-applicable: raw inbound MIME fixture tests exceed generated EML scope');
  it.todo('not-applicable: performance-only benchmarks are not compatibility assertions');
});
