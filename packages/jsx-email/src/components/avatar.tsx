import * as config from '../config.js';
import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface AvatarProps extends Omit<BaseProps<'img'>, 'children'> {
  decorative?: boolean;
  fallback?: string;
  name?: string;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/avatar' } : {};

const numericValueRegex = /^\d+(?:\.\d+)?$/;

const toCssSize = (value: number | string): string => {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return numericValueRegex.test(value) ? `${value}px` : value;
};

const deriveInitials = (value?: string): string => {
  if (!value) {
    return '';
  }

  const words = value.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) {
    return '';
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[1][0]}`.toUpperCase();
};

const normalizeText = (value?: string): string | undefined => {
  if (typeof value === 'undefined') {
    return void 0;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : void 0;
};

const resolveFallbackText = (fallback?: string, name?: string): string => {
  return normalizeText(fallback) ?? normalizeText(deriveInitials(name)) ?? '?';
};

const resolveAccessibleLabel = ({
  alt,
  fallbackText,
  name
}: {
  alt?: string;
  fallbackText: string;
  name?: string;
}): string => {
  return normalizeText(alt) ?? normalizeText(name) ?? normalizeText(fallbackText) ?? 'Avatar';
};

export const Avatar: JsxEmailComponent<AvatarProps> = ({
  alt,
  decorative = false,
  disableDefaultStyle,
  fallback,
  height,
  name,
  src,
  style,
  width,
  ...props
}) => {
  const configDds = config.current().render.disableDefaultStyle;
  const disableStyles = configDds || disableDefaultStyle;
  const resolvedWidth = width ?? height ?? 40;
  const resolvedHeight = height ?? width ?? 40;
  const fallbackText = resolveFallbackText(fallback, name);
  const resolvedAlt = resolveAccessibleLabel({ alt, fallbackText, name });

  if (!src) {
    return (
      <span
        {...props}
        {...debugProps}
        role={decorative ? 'presentation' : 'img'}
        aria-label={decorative ? void 0 : resolvedAlt}
        aria-hidden={decorative ? true : void 0}
        style={{
          ...(disableStyles
            ? {}
            : {
                alignItems: 'center',
                backgroundColor: '#E2E8F0',
                borderRadius: '9999px',
                color: '#475569',
                display: 'inline-flex',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                height: toCssSize(resolvedHeight),
                justifyContent: 'center',
                lineHeight: toCssSize(resolvedHeight),
                textTransform: 'uppercase',
                verticalAlign: 'middle',
                width: toCssSize(resolvedWidth)
              }),
          ...style
        }}
      >
        {fallbackText}
      </span>
    );
  }

  return (
    <img
      {...props}
      {...debugProps}
      alt={decorative ? '' : resolvedAlt}
      data-jsx-email-avatar="true"
      data-jsx-email-avatar-fallback={fallbackText}
      src={src}
      width={resolvedWidth}
      height={resolvedHeight}
      role={decorative ? 'presentation' : void 0}
      aria-hidden={decorative ? true : void 0}
      style={{
        ...(disableStyles
          ? {}
          : {
              border: 'none',
              borderRadius: '9999px',
              display: 'inline-block',
              objectFit: 'cover',
              outline: 'none',
              textDecoration: 'none',
              verticalAlign: 'middle'
            }),
        ...style
      }}
    />
  );
};

Avatar.displayName = 'Avatar';
