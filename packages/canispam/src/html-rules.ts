import { countPattern, stripHtml } from './html.js';
import type { CanispamFinding } from './types.js';

export const scanHtml = (text: string, html: string): CanispamFinding[] => {
  const findings: CanispamFinding[] = [];
  if (!html) return findings;

  if (/color\s*:\s*(#fff|#ffffff|white)\b/i.test(html) || /font-size\s*:\s*[01]px/i.test(html)) {
    findings.push({
      message: 'HTML contains hidden or tiny text.',
      rule: 'hidden-text',
      score: 3
    });
  }

  if (/data:image\/[^;]+;base64,/i.test(html)) {
    findings.push({
      message: 'HTML embeds base64 image data.',
      rule: 'base64-image',
      score: 1
    });
  }

  const imageCount = countPattern(html, /<img\b/gi);
  const visibleText = text || stripHtml(html);
  if (imageCount > 5 && visibleText.length < 100) {
    findings.push({
      evidence: `${imageCount} images`,
      message: 'Email is image-heavy with little text.',
      rule: 'image-heavy',
      score: 2
    });
  }

  return findings;
};
