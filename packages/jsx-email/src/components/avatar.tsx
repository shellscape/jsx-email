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
  const fallbackText = (fallback ?? deriveInitials(name) ?? '?').trim() || '?';
  const resolvedAlt = alt ?? name ?? fallbackText ?? 'Avatar';

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
              textDecoration: 'none'
            }),
        ...style
      }}
    />
  );
};

Avatar.displayName = 'Avatar';
