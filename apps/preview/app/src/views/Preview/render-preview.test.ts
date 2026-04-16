import { describe, expect, it } from 'vitest';

import { buildPreviewSrcDoc } from './render-preview';

describe('buildPreviewSrcDoc', () => {
  const htmlTemplate =
    '<html><head><title>Avatar test</title></head><body><img data-jsx-email-avatar="true" src="https://example.test/avatar.png" /></body></html>';

  it('injects broken-avatar fallback wiring that waits for DOM readiness', () => {
    const srcDoc = buildPreviewSrcDoc({
      emulateBrokenImageFallback: true,
      html: htmlTemplate,
      tableWidthPolicy: 'root-only'
    });

    expect(srcDoc).toContain("document.readyState === 'loading'");
    expect(srcDoc).toContain("document.addEventListener('DOMContentLoaded', wireAvatarImages");
    expect(srcDoc).toContain('img[data-jsx-email-avatar="true"]');
    expect(srcDoc).toContain("fallbackEl.style.verticalAlign = 'middle'");
  });

  it('does not inject broken-avatar fallback script when emulation is disabled', () => {
    const srcDoc = buildPreviewSrcDoc({
      emulateBrokenImageFallback: false,
      html: htmlTemplate,
      tableWidthPolicy: 'root-only'
    });

    expect(srcDoc).not.toContain('img[data-jsx-email-avatar="true"]');
    expect(srcDoc).not.toContain('wireAvatarImages');
  });
});
