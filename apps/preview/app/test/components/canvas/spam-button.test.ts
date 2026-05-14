import { describe, expect, it } from 'vitest';

import { getTooltipText } from '../../../src/components/canvas/spam-button';

describe('getTooltipText', () => {
  it('returns the clean spam state label without a score', () => {
    expect(getTooltipText({ classification: 'pass', score: 3, status: 'pass' })).toBe(
      'No Spam Here'
    );
  });
});
