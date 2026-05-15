import { stripHtml } from './html.js';
import type { CanispamFinding } from './types.js';

const spamKeywords = new Map([
  ['free', 1],
  ['winner', 2],
  ['prize', 2],
  ['lottery', 3],
  ['act now', 2],
  ['click here', 1],
  ['verify your account', 2],
  ['suspended', 2],
  ['wire transfer', 3],
  ['western union', 3],
  ['viagra', 3],
  ['cialis', 3],
  ['bitcoin', 1],
  ['guaranteed', 1],
  ['risk free', 2]
]);

const phrasePatterns = [
  /\bcongratulations.*won\b/i,
  /\bconfirm your identity\b/i,
  /\bupdate your account\b/i,
  /\blimited time offer\b/i,
  /\binvestment opportunity\b/i
];

export const scanContent = (text: string, html: string): CanispamFinding[] => {
  const findings: CanispamFinding[] = [];
  const content = `${text} ${stripHtml(html)}`.toLowerCase();
  const rawContent = `${text} ${html}`;

  if (rawContent.includes('XJS*C4JDBQADN1.NSBN3*2IDNEN*GTUBE-STANDARD-ANTI-UBE-TEST-EMAIL*C.34X')) {
    findings.push({
      message: 'GTUBE spam test pattern detected.',
      rule: 'gtube',
      score: 10
    });
  }

  for (const [keyword, score] of spamKeywords) {
    if (content.includes(keyword)) {
      findings.push({
        evidence: keyword,
        message: `Spam keyword detected: ${keyword}.`,
        rule: 'spam-keyword',
        score
      });
    }
  }

  for (const pattern of phrasePatterns) {
    const match = content.match(pattern);
    if (match) {
      findings.push({
        evidence: match[0],
        message: 'Spam phrase pattern detected.',
        rule: 'spam-phrase',
        score: 2
      });
    }
  }

  if (html && !text.trim()) {
    findings.push({
      message: 'HTML email is missing a plain text part.',
      rule: 'missing-plain-text',
      score: 1
    });
  }

  return findings;
};
