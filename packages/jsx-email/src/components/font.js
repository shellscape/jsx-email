import { jsx as _jsx } from "react/jsx-runtime";
/** The component MUST be place inside the <head> tag */
export const Font = ({ fontFamily, fallbackFontFamily, webFont, fontStyle = 'normal', fontWeight = 400 }) => {
    const src = webFont ? `src: url(${webFont.url}) format('${webFont.format}');` : '';
    const style = `
    @font-face {
      font-family: '${fontFamily}';
      font-style: ${fontStyle};
      font-weight: ${fontWeight};
      mso-font-alt: '${Array.isArray(fallbackFontFamily) ? fallbackFontFamily[0] : fallbackFontFamily}';
      ${src}
    }

    * {
      font-family: '${fontFamily}', ${Array.isArray(fallbackFontFamily) ? fallbackFontFamily.join(', ') : fallbackFontFamily};
    }
  `;
    return _jsx("style", { dangerouslySetInnerHTML: { __html: style } });
};
Font.displayName = 'Font';
//# sourceMappingURL=font.js.map