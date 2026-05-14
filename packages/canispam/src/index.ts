import { classifyEmail, getClassifierFindings } from './classifier/classifier.js';
import { scanContent } from './content-rules.js';
import { parseEml } from './eml.js';
import { scanHtml } from './html-rules.js';
import { scanLinks } from './link-rules.js';
import { classifyScore, getScoreBreakdown } from './scoring.js';
import { scanSubject } from './subject-rules.js';
import type { CanispamScanResult } from './types.js';

export type {
  CanispamClassification,
  CanispamClassifierProbability,
  CanispamClassifierResult,
  CanispamFinding,
  CanispamScanResult,
  CanispamScoreBreakdown
} from './types.js';
export { BaseError, InvalidEmlError, errInvalidEml } from './errors.js';

export const scan = async (eml: string): Promise<CanispamScanResult> => {
  const parsed = parseEml(eml);
  const classifier = await classifyEmail(parsed);
  const findings = [
    ...getClassifierFindings(classifier),
    ...scanSubject(parsed.subject),
    ...scanContent(parsed.text, parsed.html),
    ...scanHtml(parsed.text, parsed.html),
    ...scanLinks(parsed.text, parsed.html)
  ];
  const score = findings.reduce((total, finding) => total + finding.score, 0);

  return {
    classification: classifyScore(score),
    classifier,
    findings,
    html: parsed.html,
    score,
    scoreBreakdown: getScoreBreakdown(findings),
    subject: parsed.subject,
    text: parsed.text
  };
};
