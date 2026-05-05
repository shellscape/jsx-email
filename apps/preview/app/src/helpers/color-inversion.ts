import { approximateGmailIosCssColor } from './gmail-color';

const colorProperties = [
  'color',
  'background-color',
  'border-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'outline-color',
  'text-decoration-color',
  'caret-color',
  'column-rule-color'
];

function transformColorDeclaration(style: CSSStyleDeclaration, property: string) {
  const value = style.getPropertyValue(property);
  if (!value) return;

  const transformed = approximateGmailIosCssColor(value, property);
  if (transformed === value) return;

  style.setProperty(property, transformed, style.getPropertyPriority(property));
}

function transformStyleDeclaration(style: CSSStyleDeclaration) {
  colorProperties.forEach((property) => transformColorDeclaration(style, property));
}

function transformCssRules(rules: CSSRuleList) {
  Array.from(rules).forEach((rule) => {
    if ('style' in rule && rule.style) {
      transformStyleDeclaration(rule.style as CSSStyleDeclaration);
    }

    try {
      if ('cssRules' in rule && rule.cssRules) {
        transformCssRules(rule.cssRules as CSSRuleList);
      }
    } catch {
      // Some grouping rules can reject cssRules access; leave them unchanged.
    }
  });
}

function transformStyleBlock(css: string) {
  if (!window.CSSStyleSheet) return css;

  try {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(css);
    transformCssRules(sheet.cssRules);
    return Array.from(sheet.cssRules)
      .map((rule) => rule.cssText)
      .join('\n');
  } catch {
    return css;
  }
}

export function applyGmailInversion(html: string) {
  try {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    if (doc.body) {
      if (!doc.body.style.color) doc.body.style.color = '#000000';
      if (!doc.body.style.background && !doc.body.style.backgroundColor) {
        doc.body.style.backgroundColor = '#ffffff';
      }
    }

    doc.querySelectorAll<HTMLElement>('[style]').forEach((element) => {
      transformStyleDeclaration(element.style);
    });
    doc.querySelectorAll('style').forEach((styleElement) => {
      styleElement.textContent = transformStyleBlock(styleElement.textContent || '');
    });

    return `<!doctype html>\n${doc.documentElement.outerHTML}`;
  } catch {
    return html;
  }
}
