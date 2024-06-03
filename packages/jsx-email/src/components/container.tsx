import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

export interface ContainerProps extends Omit<BaseProps<'table'>, 'align' | 'width'> {
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
}) => (
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
        {...props}
        role="presentation"
        cellSpacing="0"
        cellPadding="0"
        border={0}
        style={{ ...(disableDefaultStyle ? {} : { maxWidth: `${containerWidth}px` }), ...style }}
      >
        <tbody>
          <tr style={disableDefaultStyle ? {} : { width: '100%' }}>
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

Container.displayName = 'Container';
