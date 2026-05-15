// @vitest-environment happy-dom

import { describe, expect, it } from 'vitest';

import {
  analyzeTemplateSpam,
  getSpamLabelTitle,
  getSpamLabelVariant
} from '../../src/helpers/spam-analysis';

describe('spam analysis helpers', () => {
  it('maps spam states to label variants', () => {
    expect(getSpamLabelVariant({ status: 'pass' })).toBe('green');
    expect(getSpamLabelVariant({ status: 'warn' })).toBe('yellow');
    expect(getSpamLabelVariant({ status: 'fail' })).toBe('red');
    expect(getSpamLabelVariant({ status: 'scanning' })).toBe('grey');
    expect(getSpamLabelVariant({ status: 'error' })).toBe('grey');
    expect(getSpamLabelVariant()).toBe('grey');
  });

  it('creates descriptive label titles', () => {
    expect(getSpamLabelTitle()).toBe('Spam analysis pending');
    expect(getSpamLabelTitle({ status: 'scanning' })).toBe('Spam analysis running');
    expect(getSpamLabelTitle({ message: 'Failed', status: 'error' })).toBe('Failed');
    expect(getSpamLabelTitle({ classification: 'warn', score: 6, status: 'warn' })).toBe(
      'Spam warn; score 6'
    );
  });

  it('analyzes clean template output as not spam', async () => {
    const result = await analyzeTemplateSpam({
      html: '<p>Your receipt is ready.</p><a href="https://example.com/receipt">View receipt</a>',
      plain: 'Your receipt is ready. View receipt: https://example.com/receipt',
      templateName: 'Receipt'
    });

    expect(result.status).toBe('pass');
    expect(result.classification).toBe('pass');
    expect(result.score).toBe(0);
  });

  it('returns an error state when EML generation fails', async () => {
    const result = await analyzeTemplateSpam({
      html: '',
      plain: '',
      templateName: 'Empty'
    });

    expect(result.status).toBe('error');
    expect(result.message).toContain('toEml requires html or plain content');
  });
});
