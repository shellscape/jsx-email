/**
 * gmail-dark-mode-approx.js
 *
 * Approximate Gmail dark-mode color transforms for email rendering.
 *
 * IMPORTANT:
 * - Gmail's actual color inversion/darkening algorithms are not documented.
 * - These are practical approximations based on public reverse-engineering,
 *   email-client testing, and observable Gmail behavior.
 * - Gmail iOS is modeled separately from Gmail Android.
 * - Gmail Android includes a Chromium/WebView-style approximation because
 *   public Gmail-specific numeric thresholds are not available.
 *
 * Intended usage:
 *   import {
 *     approximateGmailColor,
 *     approximateGmailCssColor,
 *     presets,
 *   } from "./gmail-dark-mode-approx.js";
 *
 *   approximateGmailCssColor("#000", "background-color", "gmail-ios");
 */

export const presets = {
  /**
   * Gmail web generally does not perform the same aggressive full inversion
   * observed in Gmail iOS. Treat as no-op unless your own tests show otherwise.
   */
  "gmail-web": {
    description: "Mostly no-op / theme-dependent.",
    transform: "none",
    preserveBackgroundImage: true,
    transformLargeImages: false,
    transformTinyImages: false,
  },

  /**
   * Gmail iOS is the clearest aggressive/full-inversion case.
   *
   * Observed:
   * - black background + white text can render as white background + black text
   * - source HTML remains unchanged when copied/forwarded
   * - background-color is transformed
   * - background-image linear-gradient hacks may survive differently
   */
  "gmail-ios": {
    description: "Aggressive full inversion over CSS paint colors.",
    transform: "full-rgb-invert",
    preserveBackgroundImage: true,
    transformLargeImages: false,
    transformTinyImages: "unknown",
    contrastCorrection: true,
  },

  /**
   * Gmail Android appears to use partial/algorithmic darkening, not the same
   * full inversion as Gmail iOS.
   *
   * The numeric thresholds here are NOT documented Gmail values.
   * They are Chromium/WebView-style forced-dark defaults used as a practical
   * approximation until calibrated against real Gmail Android screenshots.
   */
  "gmail-android": {
    description: "Partial role-aware darkening, Chromium/WebView-style approximation.",
    transform: "role-aware-lab-lightness-invert",
    foregroundBrightnessThreshold: 150,
    backgroundBrightnessThreshold: 205,
    preserveBackgroundImage: true,
    transformLargeImages: false,
    transformTinyImages: "maybe",
    contrastCorrection: true,
  },
};

const ROLE_ALIASES = {
  color: "text",
  "text-color": "text",
  foreground: "text",
  "background": "background-color",
  bg: "background-color",
  border: "border-color",
  "border-top-color": "border-color",
  "border-right-color": "border-color",
  "border-bottom-color": "border-color",
  "border-left-color": "border-color",
  image: "image",
  img: "image",
  "background-image": "background-image",
  gradient: "background-image",
};

export function approximateGmailCssColor(input, role, platform, options = {}) {
  const rgb = parseCssColor(input);
  if (!rgb) return input;

  const output = approximateGmailColor(rgb, normalizeRole(role), platform, options);
  return rgbToHex(output);
}

export function approximateGmailColor(rgb, role, platform, options = {}) {
  const normalizedRole = normalizeRole(role);
  const normalizedPlatform = normalizePlatform(platform);

  switch (normalizedPlatform) {
    case "gmail-web":
      return clampRgb(rgb);

    case "gmail-ios":
      return approximateGmailIos(rgb, normalizedRole, options);

    case "gmail-android":
      return approximateGmailAndroid(rgb, normalizedRole, options);

    default:
      throw new Error(`Unsupported Gmail platform: ${platform}`);
  }
}

export function approximateGmailIos(rgb, role, options = {}) {
  const {
    preserveBackgroundImage = true,
    transformLargeImages = false,
    transformTinyImages = false,
    imageSize = null,
    contrastCorrection = true,
  } = options;

  if (role === "background-image" && preserveBackgroundImage) {
    return clampRgb(rgb);
  }

  if (role === "image") {
    if (transformLargeImages === true) {
      return invertRgb(rgb);
    }

    if (
      transformTinyImages === true ||
      (transformTinyImages === "maybe" && isTinyImage(imageSize))
    ) {
      return invertRgb(rgb);
    }

    return clampRgb(rgb);
  }

  const inverted = invertRgb(rgb);

  if (!contrastCorrection) {
    return inverted;
  }

  return contrastSnap(inverted, role, "gmail-ios");
}

export function approximateGmailAndroid(rgb, role, options = {}) {
  const {
    foregroundBrightnessThreshold = presets["gmail-android"].foregroundBrightnessThreshold,
    backgroundBrightnessThreshold = presets["gmail-android"].backgroundBrightnessThreshold,
    preserveBackgroundImage = true,
    transformLargeImages = false,
    transformTinyImages = "maybe",
    imageSize = null,
    inversionSpace = "lab",
    contrastCorrection = true,
  } = options;

  if (role === "background-image" && preserveBackgroundImage) {
    return clampRgb(rgb);
  }

  if (role === "image") {
    if (transformLargeImages === true) {
      return invertBySpace(rgb, inversionSpace);
    }

    if (
      transformTinyImages === true ||
      (transformTinyImages === "maybe" && isTinyImage(imageSize))
    ) {
      return invertBySpace(rgb, inversionSpace);
    }

    return clampRgb(rgb);
  }

  const brightnessValue = brightness(rgb);

  if (role === "text") {
    // Chromium-style forced dark approximation:
    // dark foreground colors are inverted/lightened; already-light text often stays.
    if (brightnessValue >= foregroundBrightnessThreshold) {
      return clampRgb(rgb);
    }

    const transformed = invertBySpace(rgb, inversionSpace);
    return contrastCorrection ? contrastSnap(transformed, role, "gmail-android") : transformed;
  }

  if (role === "background-color" || role === "border-color") {
    // Chromium-style forced dark approximation:
    // light backgrounds are inverted/darkened; already-dark backgrounds often stay.
    if (brightnessValue <= backgroundBrightnessThreshold) {
      return clampRgb(rgb);
    }

    const transformed = invertBySpace(rgb, inversionSpace);
    return contrastCorrection ? contrastSnap(transformed, role, "gmail-android") : transformed;
  }

  return clampRgb(rgb);
}

export function invertBySpace(rgb, space = "lab") {
  switch (space) {
    case "rgb":
      return invertRgb(rgb);
    case "hsl":
      return invertHslLightness(rgb);
    case "lab":
    case "cielab":
      return invertLabLightness(rgb);
    default:
      throw new Error(`Unsupported inversion space: ${space}`);
  }
}

export function invertRgb(rgb) {
  const c = clampRgb(rgb);
  return {
    r: 255 - c.r,
    g: 255 - c.g,
    b: 255 - c.b,
    a: c.a,
  };
}

export function invertHslLightness(rgb) {
  const hsl = rgbToHsl(rgb);
  hsl.l = 1 - hsl.l;
  return hslToRgb(hsl);
}

export function invertLabLightness(rgb) {
  const lab = rgbToLab(rgb);
  lab.l = 100 - lab.l;
  return labToRgb(lab);
}

/**
 * Small post-pass to avoid especially bad low-contrast midtones.
 *
 * This is intentionally conservative. Gmail's real correction, if any, is not
 * public. Tune these values against screenshots from your own test emails.
 */
export function contrastSnap(rgb, role, platform = "gmail-ios") {
  const c = clampRgb(rgb);
  const b = brightness(c);

  if (role === "text") {
    if (platform === "gmail-ios") {
      if (b > 96 && b < 160) return setRgbLightnessApprox(c, 24);
      return c;
    }

    if (platform === "gmail-android") {
      if (b > 80 && b < 170) return setRgbLightnessApprox(c, 88);
      return c;
    }
  }

  if (role === "background-color") {
    if (platform === "gmail-ios") {
      if (b > 96 && b < 160) return setRgbLightnessApprox(c, 92);
      return c;
    }

    if (platform === "gmail-android") {
      if (b > 80 && b < 170) return setRgbLightnessApprox(c, 14);
      return c;
    }
  }

  return c;
}

export function normalizePlatform(platform) {
  const key = String(platform || "").toLowerCase().trim();

  if (key === "web" || key === "desktop" || key === "gmail-web") return "gmail-web";
  if (key === "ios" || key === "iphone" || key === "ipad" || key === "gmail-ios") return "gmail-ios";
  if (key === "android" || key === "gmail-android") return "gmail-android";

  return key;
}

export function normalizeRole(role) {
  const key = String(role || "").toLowerCase().trim();
  return ROLE_ALIASES[key] || key;
}

export function brightness(rgb) {
  const c = clampRgb(rgb);
  return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
}

export function isTinyImage(imageSize) {
  if (!imageSize) return false;
  const { width, height } = imageSize;
  return Number(width) > 0 && Number(height) > 0 && Number(width) < 15 && Number(height) < 15;
}

export function parseCssColor(input) {
  if (typeof input !== "string") return null;

  const value = input.trim().toLowerCase();

  if (NAMED_COLORS[value]) {
    return parseCssColor(NAMED_COLORS[value]);
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
    h = h.split("").map((x) => x + x).join("");
  }

  if (h.length !== 6 && h.length !== 8) return null;

  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;

  return { r, g, b, a };
}

function parseRgbFunction(raw) {
  const normalized = raw.replace(/\s*\/\s*/g, ",");
  const parts = normalized
    .split(",")
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
  if (value.endsWith("%")) {
    return (parseFloat(value) / 100) * 255;
  }

  return parseFloat(value);
}

function parseAlpha(value) {
  if (value.endsWith("%")) {
    return clamp(parseFloat(value) / 100, 0, 1);
  }

  return clamp(parseFloat(value), 0, 1);
}

export function rgbToHex(rgb) {
  const c = clampRgb(rgb);
  return `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
}

function toHex(value) {
  return Math.round(clamp(value, 0, 255)).toString(16).padStart(2, "0");
}

export function clampRgb(rgb) {
  return {
    r: clamp(Number(rgb.r), 0, 255),
    g: clamp(Number(rgb.g), 0, 255),
    b: clamp(Number(rgb.b), 0, 255),
    a: rgb.a == null ? 1 : clamp(Number(rgb.a), 0, 1),
  };
}

function clamp(value, min, max) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function setRgbLightnessApprox(rgb, targetBrightness) {
  const c = clampRgb(rgb);
  const current = brightness(c);

  if (current === 0) {
    return { r: targetBrightness, g: targetBrightness, b: targetBrightness, a: c.a };
  }

  const scale = targetBrightness / current;

  return clampRgb({
    r: c.r * scale,
    g: c.g * scale,
    b: c.b * scale,
    a: c.a,
  });
}

/**
 * RGB <-> HSL
 */
export function rgbToHsl(rgb) {
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

export function hslToRgb(hsl) {
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
    a: hsl.a == null ? 1 : hsl.a,
  });
}

/**
 * RGB <-> CIELAB via XYZ/D65.
 *
 * These conversions are approximate but sufficient for emulator-style color
 * transformation. No external dependencies required.
 */
export function rgbToLab(rgb) {
  const xyz = rgbToXyz(rgb);
  return xyzToLab(xyz);
}

export function labToRgb(lab) {
  const xyz = labToXyz(lab);
  return xyzToRgb(xyz, lab.a);
}

export function rgbToXyz(rgb) {
  const c = clampRgb(rgb);

  let r = c.r / 255;
  let g = c.g / 255;
  let b = c.b / 255;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  r *= 100;
  g *= 100;
  b *= 100;

  return {
    x: r * 0.4124 + g * 0.3576 + b * 0.1805,
    y: r * 0.2126 + g * 0.7152 + b * 0.0722,
    z: r * 0.0193 + g * 0.1192 + b * 0.9505,
    a: c.a,
  };
}

export function xyzToRgb(xyz, alpha = 1) {
  let x = xyz.x / 100;
  let y = xyz.y / 100;
  let z = xyz.z / 100;

  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let b = x * 0.0557 + y * -0.2040 + z * 1.0570;

  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

  return clampRgb({
    r: r * 255,
    g: g * 255,
    b: b * 255,
    a: alpha,
  });
}

export function xyzToLab(xyz) {
  const refX = 95.047;
  const refY = 100.000;
  const refZ = 108.883;

  let x = xyz.x / refX;
  let y = xyz.y / refY;
  let z = xyz.z / refZ;

  x = labPivotForward(x);
  y = labPivotForward(y);
  z = labPivotForward(z);

  return {
    l: 116 * y - 16,
    a: 500 * (x - y),
    b: 200 * (y - z),
    alpha: xyz.a == null ? 1 : xyz.a,
  };
}

export function labToXyz(lab) {
  const refX = 95.047;
  const refY = 100.000;
  const refZ = 108.883;

  const y = (lab.l + 16) / 116;
  const x = lab.a / 500 + y;
  const z = y - lab.b / 200;

  return {
    x: refX * labPivotReverse(x),
    y: refY * labPivotReverse(y),
    z: refZ * labPivotReverse(z),
    a: lab.alpha == null ? 1 : lab.alpha,
  };
}

function labPivotForward(value) {
  return value > 0.008856 ? Math.cbrt(value) : (7.787 * value) + (16 / 116);
}

function labPivotReverse(value) {
  const cube = value ** 3;
  return cube > 0.008856 ? cube : (value - 16 / 116) / 7.787;
}

const NAMED_COLORS = {
  black: "#000000",
  white: "#ffffff",
  red: "#ff0000",
  green: "#008000",
  blue: "#0000ff",
  transparent: "#00000000",
};

/**
 * Tiny smoke tests. Uncomment to run directly with Node:
 *
 * console.log("iOS bg #000", approximateGmailCssColor("#000", "background-color", "gmail-ios"));
 * console.log("iOS text #fff", approximateGmailCssColor("#fff", "text", "gmail-ios"));
 * console.log("Android bg #fff", approximateGmailCssColor("#fff", "background-color", "gmail-android"));
 * console.log("Android text #000", approximateGmailCssColor("#000", "text", "gmail-android"));
 */