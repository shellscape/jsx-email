import type { CanispamClassification, CanispamFinding, CanispamScoreBreakdown } from './types.js';

export const classifyScore = (score: number): CanispamClassification => {
  if (score >= 10) return 'fail';
  if (score >= 5) return 'warn';

  return 'pass';
};

export const getScoreBreakdown = (findings: CanispamFinding[]): CanispamScoreBreakdown => {
  const breakdown = {
    classifier: 0,
    content: 0,
    html: 0,
    links: 0,
    subject: 0
  };

  for (const finding of findings) {
    if (finding.rule === 'naive-bayes') breakdown.classifier += finding.score;
    else if (finding.rule.startsWith('subject-')) breakdown.subject += finding.score;
    else if (['hidden-text', 'base64-image', 'image-heavy'].includes(finding.rule)) {
      breakdown.html += finding.score;
    } else if (
      finding.rule.includes('url') ||
      finding.rule.includes('link') ||
      finding.rule.includes('idn')
    ) {
      breakdown.links += finding.score;
    } else {
      breakdown.content += finding.score;
    }
  }

  return breakdown;
};
