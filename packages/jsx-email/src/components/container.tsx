import * as config from '../config.js';
import { debug } from '../debug.js';
import type { BaseProps, JsxEmailComponent } from '../types.js';

export interface ContainerProps
  extends Omit<BaseProps<'table'>, 'align' | 'cellPadding' | 'cellSpacing' | 'width'> {
  alignment?: 'center' | 'left' | 'right';
  containerWidth?: number;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/container' } : {};

export const Container: JsxEmailComponent<ContainerProps> = ({
  alignment = 'center',
  children,
  disableDefaultStyle,
  style,
  containerWidth = 600,
  ...props
}) => {
  const configDds = config.current().render.disableDefaultStyle;
  return (
    <div {...debugProps} style={{ tableLayout: 'fixed', width: '100%' }}>
      <div style={{ margin: '0 auto', maxWidth: containerWidth }}>
        {/* For Outlook versions < 2013: we need a table wrapper width set to `max-width` */}
        <span
          dangerouslySetInnerHTML={{
            __html: `<!--[if mso]><table align="${alignment}" width="${containerWidth}" style="border-spacing: 0; width:${containerWidth}px;" role="presentation"><tr><td><![endif]-->`
          }}
        />
        <table
          align={alignment}
          width="100%"
          role="presentation"
          cellSpacing="0"
          cellPadding="0"
          border={0}
          {...props}
          style={{
            ...(configDds || disableDefaultStyle ? {} : { maxWidth: `${containerWidth}px` }),
            ...style
          }}
        >
          <tbody>
            <tr style={configDds || disableDefaultStyle ? {} : { width: '100%' }}>
              <td align={alignment}>{children}</td>
            </tr>
          </tbody>
        </table>
        <span
          dangerouslySetInnerHTML={{
            __html: `<!--[if mso]></td></tr></table><![endif]-->`
          }}
        />
      </div>
    </div>
  );
};

Container.displayName = 'Container';
