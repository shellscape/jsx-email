const roleAliases = {
  color: 'text',
  'text-color': 'text',
  foreground: 'text',
  background: 'background-color',
  bg: 'background-color',
  border: 'border-color',
  'border-top-color': 'border-color',
  'border-right-color': 'border-color',
  'border-bottom-color': 'border-color',
  'border-left-color': 'border-color',
  image: 'image',
  img: 'image',
  'background-image': 'background-image',
  gradient: 'background-image'
};

const namedColors = {
  black: '#000000',
  white: '#ffffff',
  red: '#ff0000',
  green: '#008000',
  blue: '#0000ff',
  transparent: '#00000000'
};

export function approximateGmailIosCssColor(input, role, options = {}) {
  const rgb = parseCssColor(input);
  if (!rgb) return input;

  const output = approximateGmailIosColor(rgb, normalizeRole(role), options);
  return rgbToCssColor(output);
}

function approximateGmailIosColor(rgb, role, options = {}) {
  const {
    preserveBackgroundImage = true,
    transformLargeImages = false,
    transformTinyImages = false,
    imageSize = null,
    saturationScale = 0.8
  } = options;

  if (role === 'background-image' && preserveBackgroundImage) {
    return clampRgb(rgb);
  }

  if (role === 'image') {
    if (transformLargeImages === true) {
      return transformDarkModeLightness(rgb, 'foreground', saturationScale);
    }

    if (
      transformTinyImages === true ||
      (transformTinyImages === 'maybe' && isTinyImage(imageSize))
    ) {
      return transformDarkModeLightness(rgb, 'foreground', saturationScale);
    }

    return clampRgb(rgb);
  }

  return transformDarkModeLightness(
    rgb,
    role === 'background-color' || role === 'border-color' ? 'background' : 'foreground',
    saturationScale
  );
}

function transformDarkModeLightness(rgb, role, saturationScale = 0.8) {
  const hsl = rgbToHsl(rgb);
  const isNeutral = hsl.s < 0.12;

  if (role === 'background') {
    if (hsl.l >= 0.5) {
      hsl.l = 0.5 - (hsl.l - 0.5) * 0.75;
    }
  } else if (isNeutral && hsl.l < 0.5) {
    hsl.l = 0.95 - hsl.l * 0.75;
  } else if (!isNeutral && hsl.l <= 0.52) {
    hsl.l = 0.92 - hsl.l * 0.56;
  } else if (isNeutral && hsl.l < 0.7) {
    hsl.l += 0.1;
  }

  hsl.s *= saturationScale;

  return hslToRgb(hsl);
}

function normalizeRole(role) {
  const key = String(role || '')
    .toLowerCase()
    .trim();
  return roleAliases[key] || key;
}

function isTinyImage(imageSize) {
  if (!imageSize) return false;
  const { width, height } = imageSize;
  return Number(width) > 0 && Number(height) > 0 && Number(width) < 15 && Number(height) < 15;
}

function parseCssColor(input) {
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

function parseHexColor(raw) {
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

function parseRgbFunction(raw) {
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

function parseCssChannel(value) {
  if (value.endsWith('%')) {
    return (parseFloat(value) / 100) * 255;
  }

  return parseFloat(value);
}

function parseAlpha(value) {
  if (value.endsWith('%')) {
    return clamp(parseFloat(value) / 100, 0, 1);
  }

  return clamp(parseFloat(value), 0, 1);
}

function rgbToCssColor(rgb) {
  const c = clampRgb(rgb);

  if (c.a < 1) {
    return `rgba(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)}, ${formatAlpha(c.a)})`;
  }

  return `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
}

function formatAlpha(value) {
  return String(Math.round(clamp(value, 0, 1) * 1000) / 1000);
}

function toHex(value) {
  return Math.round(clamp(value, 0, 255))
    .toString(16)
    .padStart(2, '0');
}

function clampRgb(rgb) {
  return {
    r: clamp(Number(rgb.r), 0, 255),
    g: clamp(Number(rgb.g), 0, 255),
    b: clamp(Number(rgb.b), 0, 255),
    a: rgb.a == null ? 1 : clamp(Number(rgb.a), 0, 1)
  };
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function rgbToHsl(rgb) {
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

function hslToRgb(hsl) {
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
    r: (r1 + m) * 255,
    g: (g1 + m) * 255,
    b: (b1 + m) * 255,
    a: hsl.a == null ? 1 : hsl.a
  });
}
