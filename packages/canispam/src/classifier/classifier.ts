import NaiveBayes from '@ladjs/naivebayes';

import classifierData from './spamscanner-classifier.json' with { type: 'json' };
import { getClassifierTokens } from './tokenize.js';
import type { CanispamClassifierResult, CanispamFinding, ParsedEml } from '../types.js';

const classifier = NaiveBayes.fromJson(classifierData);
classifier.tokenizer = (text: string) => text.split(/\s+/).filter(Boolean);

const classifierScore = 6;

export const classifyEmail = async (parsed: ParsedEml): Promise<CanispamClassifierResult> => {
  const tokens = await getClassifierTokens(parsed);
  const input = tokens.join(' ');
  const probabilities = classifier.probabilities(input);
  const category = probabilities[0]?.category || 'ham';

  return {
    category,
    isSpam: category === 'spam',
    probabilities,
    tokenCount: tokens.length
  };
};

export const getClassifierFindings = (result: CanispamClassifierResult): CanispamFinding[] => {
  if (!result.isSpam) return [];

  return [
    {
      evidence: `category=${result.category}; tokens=${result.tokenCount}`,
      message: 'Naive Bayes classifier predicts spam.',
      rule: 'naive-bayes',
      score: classifierScore
    }
  ];
};
