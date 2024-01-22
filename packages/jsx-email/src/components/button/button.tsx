import React from 'react';

import type { BaseProps, JsxEmailComponent } from '../../types';
import { debug } from '../../debug';

import { parsePadding } from './padding';

type RootProps = BaseProps<'a'>;

export interface ButtonProps extends RootProps {}

const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/button' } : {};

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

export const Button: JsxEmailComponent<ButtonProps> = ({ children, style, target, ...props }) => {
  const parsedPadding = parsePadding(style || {});
  let textRaiseTop = '';
  let textRaiseBottom: number | undefined;
  let letterSpacingLeft = '';
  let letterSpacingRight = '';

  if (parsedPadding) {
    const { pt, pb, pl, pr } = parsedPadding;
    const y = pt + pb;
    letterSpacingLeft = `letter-spacing: ${pl}px;`;
    letterSpacingRight = `letter-spacing: ${pr}px;`;
    textRaiseTop = `mso-text-raise: ${pxToPt(y) ?? void 0};`;
    textRaiseBottom = pb;
  }

  return (
    <a
      {...props}
      {...debugProps}
      target={target}
      style={buttonStyle({ ...style, ...parsedPadding })}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]><i style="${letterSpacingLeft}mso-font-width:-100%;${textRaiseTop}" hidden>&nbsp;</i><![endif]-->`
        }}
      />
      <span style={buttonTextStyle(textRaiseBottom)}>{children}</span>
      <span
        dangerouslySetInnerHTML={{
          __html: `<!--[if mso]><i style="${letterSpacingRight}mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`
        }}
      />
    </a>
  );
};

Button.displayName = 'Button';
