import type React from 'react';

import { pxToPt, parsePadding } from './utils';

type RootProps = React.ComponentPropsWithoutRef<'a'>;

export interface ButtonProps extends RootProps {}

const buttonStyle = (
  style?: React.CSSProperties & {
    pb: number;
    pl: number;
    pr: number;
    pt: number;
  }
) => {
  const { pt, pr, pb, pl, padding, ...rest } = style || {};

  return {
    ...rest,
    display: 'inline-block',
    lineHeight: '100%',
    maxWidth: '100%',
    padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
    textDecoration: 'none'
  };
};

const buttonTextStyle = (pb?: number) => {
  return {
    display: 'inline-block',
    lineHeight: '120%',
    maxWidth: '100%',
    msoPaddingAlt: '0px',
    msoTextRaise: pxToPt(pb || 0)
  };
};

export const Button: React.FC<Readonly<ButtonProps>> = ({
  children,
  style,
  target = '_blank',
  ...props
}) => {
  const { pt, pr, pb, pl } = parsePadding({
    padding: style?.padding,
    paddingBottom: style?.paddingBottom,
    paddingLeft: style?.paddingLeft,
    paddingRight: style?.paddingRight,
    paddingTop: style?.paddingTop
  });

  const y = pt + pb;
  const textRaise = pxToPt(y);

  return (
    <a
      {...props}
      data-id="@jsx-email/button"
      target={target}
      style={buttonStyle({ ...style, pb, pl, pr, pt })}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]><i style="letter-spacing: ${pl}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`
        }}
      />
      <span style={buttonTextStyle(pb)}>{children}</span>
      <span
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]><i style="letter-spacing: ${pr}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`
        }}
      />
    </a>
  );
};

Button.displayName = 'Button';
