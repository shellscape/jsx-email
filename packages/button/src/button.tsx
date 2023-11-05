import React from 'react';

import { parsePadding } from './padding';

type RootProps = React.ComponentPropsWithoutRef<'a'>;

export interface ButtonProps extends RootProps {}

export const pxToPt = (px: number): number | null =>
  typeof px === 'number' && !isNaN(Number(px)) ? (px * 3) / 4 : null;

const buttonStyle = (
  style?: React.CSSProperties & {
    pb?: number;
    pl?: number;
    pr?: number;
    pt?: number;
  }
) => {
  const { pt, pr, pb, pl, padding, ...rest } = style || {};

  const addPadding = [pt, pr, pb, pl].some((thing) => typeof thing !== 'undefined');

  return {
    ...rest,
    display: 'inline-block',
    lineHeight: '100%',
    maxWidth: '100%',
    padding: addPadding ? `${pt}px ${pr}px ${pb}px ${pl}px` : void 0,
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
  const parsedPadding = parsePadding((style as any) || {});
  let textRaiseTop: number | undefined;
  let textRaiseBottom: number | undefined;
  let letterSpacingLeft: number | undefined;
  let letterSpacingRight: number | undefined;

  if (parsedPadding) {
    const { pt, pb, pl, pr } = parsedPadding;
    const y = pt + pb;
    letterSpacingLeft = pl;
    letterSpacingRight = pr;
    textRaiseTop = pxToPt(y) ?? void 0;
    textRaiseTop = pb;
  }

  return (
    <a
      {...props}
      data-id="@jsx-email/button"
      target={target}
      style={buttonStyle({ ...style, ...parsedPadding })}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]><i style="letter-spacing: ${letterSpacingLeft}px;mso-font-width:-100%;mso-text-raise:${textRaiseTop}" hidden>&nbsp;</i><![endif]-->`
        }}
      />
      <span style={buttonTextStyle(textRaiseBottom)}>{children}</span>
      <span
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]><i style="letter-spacing: ${letterSpacingRight}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`
        }}
      />
    </a>
  );
};

Button.displayName = 'Button';
