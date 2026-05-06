const roleAliases: Record<string, string> = {
  background: 'background-color',
  'background-image': 'background-image',
  bg: 'background-color',
  border: 'border-color',
  'border-bottom-color': 'border-color',
  'border-left-color': 'border-color',
  'border-right-color': 'border-color',
  'border-top-color': 'border-color',
  color: 'text',
  foreground: 'text',
  gradient: 'background-image',
  image: 'image',
  img: 'image',
  'text-color': 'text'
};

const namedColors: Record<string, string> = {
  black: '#000000',
  blue: '#0000ff',
  green: '#008000',
  red: '#ff0000',
  transparent: '#00000000',
  white: '#ffffff'
};

type RgbaColor = {
  a?: number;
  b: number;
  g: number;
  r: number;
};

type HslaColor = {
  a?: number;
  h: number;
  l: number;
  s: number;
};

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

function approximateGmailIosCssColor(input: string, role: string) {
  const rgb = parseCssColor(input);
  if (!rgb) return input;

  const output = approximateGmailIosColor(rgb, normalizeRole(role));
  return rgbToCssColor(output);
}

function approximateGmailIosColor(rgb: RgbaColor, role: string) {
  if (role === 'background-image') {
    return clampRgb(rgb);
  }

  return transformDarkModeLightness(
    rgb,
    role === 'background-color' || role === 'border-color' ? 'background' : 'foreground'
  );
}

function transformDarkModeLightness(rgb: RgbaColor, role: string) {
  const hsl = rgbToHsl(rgb);
  const isNeutral = hsl.s < 0.12;

  if (role === 'background') {
    if (hsl.l >= 0.5) {
      hsl.l = 0.875 - hsl.l * 0.75;
    }
  } else if (isNeutral && hsl.l < 0.5) {
    hsl.l = 0.95 - hsl.l * 0.75;
  } else if (!isNeutral && hsl.l <= 0.52) {
    hsl.l = 0.92 - hsl.l * 0.56;
  } else if (isNeutral && hsl.l < 0.7) {
    hsl.l += 0.1;
  }

  hsl.s -= hsl.s * 0.2;

  return hslToRgb(hsl);
}

function normalizeRole(role: string) {
  const key = String(role || '')
    .toLowerCase()
    .trim();
  return roleAliases[key] || key;
}

function parseCssColor(input: string) {
  if (typeof input !== 'string') return null;

  const value = input.trim().toLowerCase();

  if (namedColors[value]) {
    return parseCssColor(namedColors[value]);
  }

  const hex = value.match(/^#([0-9a-f]{3,8})$/i);
  if (hex) return parseHexColor(hex[1]);

  const rgb = value.match(/^rgba?\((.+)\)$/i);
  if (rgb) return parseRgbFunction(rgb[1]);

  return null;
}

function parseHexColor(raw: string) {
  let h = raw;

  if (h.length === 3 || h.length === 4) {
    h = h
      .split('')
      .map((x) => x + x)
      .join('');
  }

  if (h.length !== 6 && h.length !== 8) return null;

  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;

  return { r, g, b, a };
}

function parseRgbFunction(raw: string) {
  const normalized = raw.replace(/\s*\/\s*/g, ',');
  const parts = normalized
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);

  if (parts.length < 3) return null;

  const r = parseCssChannel(parts[0]);
  const g = parseCssChannel(parts[1]);
  const b = parseCssChannel(parts[2]);
  const a = parts[3] == null ? 1 : parseAlpha(parts[3]);

  if ([r, g, b, a].some((v) => Number.isNaN(v))) return null;

  return clampRgb({ r, g, b, a });
}

function parseCssChannel(value: string) {
  if (value.endsWith('%')) {
    return (parseFloat(value) / 100) * 255;
  }

  return parseFloat(value);
}

function parseAlpha(value: string) {
  if (value.endsWith('%')) {
    return clamp(parseFloat(value) / 100, 0, 1);
  }

  return clamp(parseFloat(value), 0, 1);
}

function rgbToCssColor(rgb: RgbaColor) {
  const c = clampRgb(rgb);

  if (c.a < 1) {
    return `rgba(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)}, ${formatAlpha(c.a)})`;
  }

  return `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
}

function formatAlpha(value: number) {
  return String(Math.round(clamp(value, 0, 1) * 1000) / 1000);
}

function toHex(value: number) {
  return Math.round(clamp(value, 0, 255))
    .toString(16)
    .padStart(2, '0');
}

function clampRgb(rgb: RgbaColor) {
  return {
    a: rgb.a == null ? 1 : clamp(Number(rgb.a), 0, 1),
    b: clamp(Number(rgb.b), 0, 255),
    g: clamp(Number(rgb.g), 0, 255),
    r: clamp(Number(rgb.r), 0, 255)
  };
}

function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function rgbToHsl(rgb: RgbaColor) {
  const c = clampRgb(rgb);
  const r = c.r / 255;
  const g = c.g / 255;
  const b = c.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    switch (max) {
      case r:
        h = 60 * (((g - b) / delta) % 6);
        break;
      case g:
        h = 60 * ((b - r) / delta + 2);
        break;
      case b:
        h = 60 * ((r - g) / delta + 4);
        break;
    }
  }

  if (h < 0) h += 360;

  return { h, s, l, a: c.a };
}

function hslToRgb(hsl: HslaColor) {
  const h = ((hsl.h % 360) + 360) % 360;
  const s = clamp(hsl.s, 0, 1);
  const l = clamp(hsl.l, 0, 1);

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r1 = 0;
  let g1 = 0;
  let b1 = 0;

  if (h < 60) [r1, g1, b1] = [c, x, 0];
  else if (h < 120) [r1, g1, b1] = [x, c, 0];
  else if (h < 180) [r1, g1, b1] = [0, c, x];
  else if (h < 240) [r1, g1, b1] = [0, x, c];
  else if (h < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];

  return clampRgb({
    a: hsl.a == null ? 1 : hsl.a,
    b: (b1 + m) * 255,
    g: (g1 + m) * 255,
    r: (r1 + m) * 255
  });
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
