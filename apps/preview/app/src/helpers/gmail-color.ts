interface RgbColor {
  a?: number;
  b: number;
  g: number;
  r: number;
}

interface HslColor {
  a?: number;
  h: number;
  l: number;
  s: number;
}

const roleAliases: Record<string, string> = {
  background: 'background-color',
  bg: 'background-color',
  border: 'border-color',
  'border-bottom-color': 'border-color',
  'border-left-color': 'border-color',
  'border-right-color': 'border-color',
  'border-top-color': 'border-color',
  color: 'text',
  foreground: 'text',
  'text-color': 'text'
};

/*
 * Background-image handling is intentionally absent from this helper.
 *
 * The original canvas preview prototype accepted roles like `background-image`,
 * `gradient`, `image`, and `img`, and preserved background-image colors instead
 * of applying the Gmail iOS foreground transform. That behavior was removed when
 * this logic moved from the standalone prototype into the app helper because the
 * current `applyGmailInversion` path only transforms concrete CSS color
 * declarations such as `color`, `background-color`, and `border-color`.
 *
 * Do not re-add `background-image` to `colorProperties` in `color-inversion.ts`
 * unless there is a real parser for full CSS image values. `parseCssColor` only
 * accepts named colors, hex, rgb, and rgba values; it does not parse
 * `url(...)`, `linear-gradient(...)`, `radial-gradient(...)`, or color stops
 * inside those functions.
 *
 * If a future caller extracts individual color tokens from a background image
 * value and needs to preserve them, reintroduce support here, where the color
 * approximation lives:
 *
 * 1. Add role aliases:
 *
 *    'background-image': 'background-image',
 *    gradient: 'background-image',
 *
 * 2. Normalize the role once in `approximateGmailIosCssColor`:
 *
 *    const normalizedRole = normalizeRole(role);
 *
 * 3. Preserve extracted background-image color tokens before the foreground /
 *    background transform:
 *
 *    if (normalizedRole === 'background-image') {
 *      return rgbToCssColor(clampRgb(rgb));
 *    }
 *
 * 4. Use `normalizedRole` for the existing background-color / border-color
 *    branch, and add tests showing that full gradient strings remain unchanged
 *    while separately extracted color tokens are preserved.
 */

const namedColors: Record<string, string> = {
  black: '#000000',
  blue: '#0000ff',
  green: '#008000',
  red: '#ff0000',
  transparent: '#00000000',
  white: '#ffffff'
};

export function approximateGmailIosCssColor(input: string, role: string) {
  const rgb = parseCssColor(input);
  if (!rgb) return input;

  const output = transformDarkModeLightness(
    rgb,
    normalizeRole(role) === 'background-color' || normalizeRole(role) === 'border-color'
      ? 'background'
      : 'foreground'
  );

  return rgbToCssColor(output);
}

function transformDarkModeLightness(rgb: RgbColor, role: 'background' | 'foreground') {
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
  const value = input.trim().toLowerCase();

  if (namedColors[value]) return parseCssColor(namedColors[value]);

  const hex = value.match(/^#([0-9a-f]{3,8})$/i);
  if (hex) return parseHexColor(hex[1]);

  const rgb = value.match(/^rgba?\((.+)\)$/i);
  if (rgb) return parseRgbFunction(rgb[1]);

  return null;
}

function parseHexColor(raw: string) {
  let hex = raw;

  if (hex.length === 3 || hex.length === 4) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (hex.length !== 6 && hex.length !== 8) return null;

  return {
    a: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1,
    b: parseInt(hex.slice(4, 6), 16),
    g: parseInt(hex.slice(2, 4), 16),
    r: parseInt(hex.slice(0, 2), 16)
  };
}

function parseRgbFunction(raw: string) {
  const parts = raw
    .replace(/\s*\/\s*/g, ',')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length < 3) return null;

  const color = {
    a: parts[3] == null ? 1 : parseAlpha(parts[3]),
    b: parseCssChannel(parts[2]),
    g: parseCssChannel(parts[1]),
    r: parseCssChannel(parts[0])
  };

  if (Object.values(color).some((value) => Number.isNaN(value))) return null;

  return clampRgb(color);
}

function parseCssChannel(value: string) {
  if (value.endsWith('%')) return (parseFloat(value) / 100) * 255;
  return parseFloat(value);
}

function parseAlpha(value: string) {
  if (value.endsWith('%')) return clamp(parseFloat(value) / 100, 0, 1);
  return clamp(parseFloat(value), 0, 1);
}

function rgbToCssColor(rgb: RgbColor) {
  const color = clampRgb(rgb);

  if (color.a < 1) {
    return `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${formatAlpha(color.a)})`;
  }

  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}

function formatAlpha(value: number) {
  return String(Math.round(clamp(value, 0, 1) * 1000) / 1000);
}

function toHex(value: number) {
  return Math.round(clamp(value, 0, 255))
    .toString(16)
    .padStart(2, '0');
}

function clampRgb(rgb: RgbColor): Required<RgbColor> {
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

function rgbToHsl(rgb: RgbColor): HslColor {
  const color = clampRgb(rgb);
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    if (max === r) h = 60 * (((g - b) / delta) % 6);
    else if (max === g) h = 60 * ((b - r) / delta + 2);
    else h = 60 * ((r - g) / delta + 4);
  }

  if (h < 0) h += 360;

  return { a: color.a, h, l, s };
}

function hslToRgb(hsl: HslColor) {
  const h = ((hsl.h % 360) + 360) % 360;
  const s = clamp(hsl.s, 0, 1);
  const l = clamp(hsl.l, 0, 1);
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return clampRgb({
    a: hsl.a == null ? 1 : hsl.a,
    b: (b + m) * 255,
    g: (g + m) * 255,
    r: (r + m) * 255
  });
}
