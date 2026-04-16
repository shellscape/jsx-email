import React from 'react';

import * as config from '../config.js';
import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';
import { Avatar } from './avatar.js';

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
  const avatarsToRender =
    overflowCount > 0
      ? [
          ...visibleAvatars,
          <Avatar
            key="avatar-group-overflow-token"
            fallback={`+${overflowCount}`}
            disableDefaultStyle={disableDefaultStyle}
          />
        ]
      : visibleAvatars;

  return (
    <table
      {...props}
      {...debugProps}
      role="presentation"
      border={0}
      cellPadding="0"
      cellSpacing="0"
      style={{
        ...(configDds || disableDefaultStyle ? {} : { borderCollapse: 'collapse' }),
        ...style
      }}
    >
      <tbody>
        <tr>
          {avatarsToRender.map((avatar, index) => (
            <td key={index}>
              <span
                style={
                  configDds || disableDefaultStyle || index === 0
                    ? {}
                    : {
                        display: 'inline-block',
                        ...(overlap
                          ? { marginLeft: `${-normalizedSpacing}px`, position: 'relative' }
                          : { marginLeft: `${normalizedSpacing}px` })
                      }
                }
              >
                {avatar}
              </span>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

AvatarGroup.displayName = 'AvatarGroup';
