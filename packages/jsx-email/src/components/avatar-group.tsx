import React from 'react';

import * as config from '../config.js';
import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';
import { Avatar } from './avatar.js';

type OverflowAvatarSizing = {
  height?: number | string;
  width?: number | string;
};

const getOverflowAvatarSizing = (avatars: React.ReactNode[]): OverflowAvatarSizing => {
  for (const avatar of avatars) {
    if (React.isValidElement(avatar)) {
      const avatarProps = avatar.props as {
        height?: number | string;
        style?: React.CSSProperties;
        width?: number | string;
      };
      const width = avatarProps.width ?? avatarProps.style?.width;
      const height = avatarProps.height ?? avatarProps.style?.height;

      if (typeof width !== 'undefined' || typeof height !== 'undefined') {
        return { width, height };
      }
    }
  }

  return {};
};

export interface AvatarGroupProps extends Omit<BaseProps<'table'>, 'cellPadding' | 'cellSpacing'> {
  direction?: 'ltr' | 'rtl';
  max?: number;
  overlap?: boolean;
  spacing?: number;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/avatar-group' } : {};

export const AvatarGroup: JsxEmailComponent<AvatarGroupProps> = ({
  children,
  direction = 'ltr',
  disableDefaultStyle,
  max,
  overlap = false,
  spacing = 8,
  style,
  ...props
}) => {
  const configDds = config.current().render.disableDefaultStyle;
  const disableStyles = configDds || disableDefaultStyle;
  const avatars = React.Children.toArray(children);
  const normalizedSpacing = Math.abs(spacing);
  const orderedAvatars = direction === 'rtl' ? [...avatars].reverse() : avatars;
  const normalizedMax =
    typeof max === 'number' && Number.isFinite(max) ? Math.max(0, Math.floor(max)) : null;
  const visibleAvatars =
    normalizedMax === null ? orderedAvatars : orderedAvatars.slice(0, normalizedMax);
  const overflowCount =
    normalizedMax === null || orderedAvatars.length <= normalizedMax
      ? 0
      : orderedAvatars.length - normalizedMax;
  const overflowAvatarSizing = getOverflowAvatarSizing(orderedAvatars);
  const avatarsToRender =
    overflowCount > 0
      ? [
          ...visibleAvatars,
          <Avatar
            key="avatar-group-overflow-token"
            fallback={`+${overflowCount}`}
            disableDefaultStyle={disableDefaultStyle}
            name={`${overflowCount} more`}
            height={overflowAvatarSizing.height}
            width={overflowAvatarSizing.width}
          />
        ]
      : visibleAvatars;

  const avatarCellStyle: React.CSSProperties = disableStyles
    ? {}
    : { padding: 0, verticalAlign: 'middle' };

  const getAvatarWrapperStyle = (index: number): React.CSSProperties => {
    if (disableStyles) {
      return {};
    }

    return {
      display: 'inline-block',
      fontSize: 0,
      lineHeight: 0,
      verticalAlign: 'middle',
      ...(index === 0
        ? {}
        : overlap
          ? { marginLeft: `${-normalizedSpacing}px`, position: 'relative' }
          : { marginLeft: `${normalizedSpacing}px` })
    };
  };

  return (
    <table
      {...props}
      {...debugProps}
      role="presentation"
      border={0}
      cellPadding="0"
      cellSpacing="0"
      style={{
        ...(disableStyles ? {} : { borderCollapse: 'collapse' }),
        ...style
      }}
    >
      <tbody>
        <tr>
          {avatarsToRender.map((avatar, index) => (
            <td key={index} style={avatarCellStyle}>
              <span style={getAvatarWrapperStyle(index)}>{avatar}</span>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

AvatarGroup.displayName = 'AvatarGroup';
