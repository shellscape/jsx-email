import { debug } from '../debug';
import type { BaseProps, JsxEmailComponent } from '../types';

export interface ButtonProps extends BaseProps<'a'> {
  align?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  borderSize?: number;
  fontSize?: number;
  height: number;
  href?: string;
  textColor?: string;
  width: number;
  /** Only `true` if `Button` is nested in a `Background` component. Neccessary for good Outlook compatibility */
  withBackground?: boolean;
}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/button' } : {};

export const Button: JsxEmailComponent<ButtonProps> = ({
  href,
  children,
  width,
  height,
  borderRadius = 0,
  textColor,
  backgroundColor,
  borderColor,
  borderSize = 1,
  style,
  fontSize = 16,
  align = 'left',
  withBackground = false,
  ...props
}) => {
  // Logic for arcsize
  // Math.floor(borderRadius / Min(Width, Height))
  const arcsize = Math.floor((borderRadius / height) * 100);
  // Logic for line-height
  // Height - (2 * borderSize)
  const lineHeight = borderSize ? height - 2 * borderSize : height;

  const baseStyles = {
    '-webkit-text-size-adjust': 'none',
    borderRadius,
    display: 'inline-block',
    fontSize,
    lineHeight: `${lineHeight}px`,
    maxWidth: width,
    textAlign: 'center',
    textDecoration: 'none',
    width: '100%'
  } as const;

  // border styling
  const borderStyles = {
    border: `${borderSize}px solid ${borderColor}`,
    // @ts-ignore: valid prop `mso-border-alt:none;`
    msoBorderAlt: 'none'
  };

  const propStyles = {
    // border styles
    ...(borderColor ? borderStyles : {}),
    // background styles
    ...(backgroundColor ? { backgroundColor } : {}),
    // text styles
    ...(textColor ? { color: textColor } : {})
  };

  const baseButton = (
    <a
      href={href}
      style={{
        ...baseStyles,
        ...propStyles,
        ...style,
        ...(withBackground ? {} : { msoHide: 'all' })
      }}
      {...props}
    >
      {children}
    </a>
  );

  return (
    <table
      {...debugProps}
      width="100%"
      border={0}
      cellPadding={0}
      cellSpacing={0}
      style={{ borderCollapse: 'collapse' }}
      role="presentation"
    >
      <tr>
        <td align={align}>
          {/* VML Fallback for mso clients */}
          {!withBackground && (
            <span
              dangerouslySetInnerHTML={{
                __html: `<!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:${height}px;v-text-anchor:middle;width:${width}px;" arcsize="${arcsize}%" ${
                  borderColor ? `strokecolor=${borderColor}` : ''
                } ${borderSize ? `strokeweight="${borderSize}px"` : `stroke="false"`} ${
                  backgroundColor ? `fillcolor=${backgroundColor}` : `fill="false"`
                }>
            <w:anchorlock/>
            <center style="font-size:${fontSize}px;${textColor ? `color:${textColor};` : ''}">
            ${children}
            </center></v:roundrect>
            <![endif]-->`
              }}
            />
          )}
          {/* Final fallback for outlook clients when nested in za `Background` component, because mso doesn't work well with nested VML elements */}
          {withBackground ? (
            <table
              align={align}
              width={width}
              border={0}
              cellPadding={0}
              cellSpacing={0}
              role="presentation"
            >
              <tr>
                <td
                  // @ts-ignore: `bgcolor` not documented
                  bgcolor={backgroundColor}
                  width={width}
                  height={height}
                  style={{
                    borderRadius,
                    height,
                    maxWidth: width,
                    textAlign: 'center',
                    width
                  }}
                >
                  {baseButton}
                </td>
              </tr>
            </table>
          ) : (
            baseButton
          )}
        </td>
      </tr>
    </table>
  );
};
