import type { CanispamFinding } from './types.js';

const urgentSubjectPattern =
  /\b(urgent|immediate|action required|act now|limited time|expires?|deadline|verify|suspend|locked)\b/i;

export const scanSubject = (subject: string): CanispamFinding[] => {
  const findings: CanispamFinding[] = [];
  if (!subject) return findings;

  if (urgentSubjectPattern.test(subject)) {
    findings.push({
      evidence: subject,
      message: 'Subject uses urgency or account-action language.',
      rule: 'subject-urgency',
      score: 2
    });
  }

  const upperCount = (subject.match(/[A-Z]/g) || []).length;
  const letterCount = (subject.match(/[a-zA-Z]/g) || []).length;
  if (letterCount > 10 && upperCount / letterCount > 0.7) {
    findings.push({
      evidence: subject,
      message: 'Subject is mostly uppercase.',
      rule: 'subject-all-caps',
      score: 2
    });
  }

  if ((subject.match(/[!?$]/g) || []).length >= 3) {
    findings.push({
      evidence: subject,
      message: 'Subject uses excessive punctuation.',
      rule: 'subject-punctuation',
      score: 1
    });
  }

  return findings;
};
