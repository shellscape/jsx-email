import { describe, expect, it } from 'vitest';

import { scan } from '../src/index.js';
import { plainEml } from './helpers.js';

describe('Naive Bayes classifier', () => {
  it('returns classifier metadata for every scan', async () => {
    const result = await scan(plainEml('Your invoice is ready.', 'Invoice ready'));

    expect(result.classifier).toEqual(
      expect.objectContaining({
        category: expect.any(String),
        isSpam: expect.any(Boolean),
        probabilities: expect.any(Array),
        tokenCount: expect.any(Number)
      })
    );
  });

  it('adds classifier score to the score breakdown for spam', async () => {
    const result = await scan(plainEml('Free winner prize lottery viagra.'));

    expect(result.classifier.isSpam).toBe(true);
    expect(result.scoreBreakdown.classifier).toBeGreaterThan(0);
  });

  it('does not add classifier score for ham', async () => {
    const result = await scan(plainEml('Your receipt is ready. View your invoice.'));

    expect(result.classifier.isSpam).toBe(false);
    expect(result.scoreBreakdown.classifier).toBe(0);
  });
});
