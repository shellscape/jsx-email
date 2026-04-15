import React from 'react';

import * as config from '../config.js';
import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface AvatarGroupProps extends Omit<BaseProps<'table'>, 'cellPadding' | 'cellSpacing'> {
  overlap?: boolean;
  spacing?: number;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/avatar-group' } : {};

export const AvatarGroup: JsxEmailComponent<AvatarGroupProps> = ({
  children,
  disableDefaultStyle,
  overlap = false,
  spacing = 8,
  style,
  ...props
}) => {
  const configDds = config.current().render.disableDefaultStyle;
  const avatars = React.Children.toArray(children);
  const normalizedSpacing = Math.abs(spacing);

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
          {avatars.map((avatar, index) => (
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
