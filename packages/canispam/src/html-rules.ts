import { countImages, hasBase64Image, hasHiddenOrTinyText, stripHtml } from './html.js';
import type { CanispamFinding } from './types.js';

export const scanHtml = (text: string, html: string): CanispamFinding[] => {
  const findings: CanispamFinding[] = [];
  if (!html) return findings;

  if (hasHiddenOrTinyText(html)) {
    findings.push({
      message: 'HTML contains hidden or tiny text.',
      rule: 'hidden-text',
      score: 3
    });
  }

  if (hasBase64Image(html)) {
    findings.push({
      message: 'HTML embeds base64 image data.',
      rule: 'base64-image',
      score: 1
    });
  }

  const imageCount = countImages(html);
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
