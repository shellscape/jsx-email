import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { debug } from '../debug.js';
import { log } from '../log.js';
/**
 * converts padding value to `px` equivalent.
 * @example "1em" => 16
 */
export function convertToPx(value) {
    let px = 0;
    if (!value) {
        return px;
    }
    if (typeof value === 'number') {
        return value;
    }
    const matches = value.match(/^([\d.]+)(px|em|rem|%)$/);
    if (matches && matches.length === 3) {
        const numValue = parseFloat(matches[1]);
        const [, , unit] = matches;
        switch (unit) {
            case 'px':
                return numValue;
            case 'em':
            case 'rem':
                px = numValue * 16;
                return px;
            case '%':
                px = (numValue / 100) * 600;
                return px;
            default:
                return numValue;
        }
    }
    else {
        return 0;
    }
}
/**
 * Parses all the values out of a padding string to get the value for all padding props in `px`
 * @example e.g. "10px" => pt: 10, pr: 10, pb: 10, pl: 10
 */
export function parsePadding({ padding, paddingTop, paddingRight, paddingBottom, paddingLeft }) {
    let pt = 0;
    let pr = 0;
    let pb = 0;
    let pl = 0;
    if (![padding, paddingTop, paddingRight, paddingBottom, paddingLeft].some((thing) => typeof thing !== 'undefined'))
        return void 0;
    if (typeof padding === 'number') {
        pt = padding;
        pr = padding;
        pb = padding;
        pl = padding;
    }
    else if (typeof padding !== 'undefined') {
        const values = padding.split(/\s+/);
        switch (values.length) {
            case 1:
                pt = convertToPx(values[0]);
                pr = convertToPx(values[0]);
                pb = convertToPx(values[0]);
                pl = convertToPx(values[0]);
                break;
            case 2:
                pt = convertToPx(values[0]);
                pb = convertToPx(values[0]);
                pr = convertToPx(values[1]);
                pl = convertToPx(values[1]);
                break;
            case 3:
                pt = convertToPx(values[0]);
                pr = convertToPx(values[1]);
                pl = convertToPx(values[1]);
                pb = convertToPx(values[2]);
                break;
            case 4:
                pt = convertToPx(values[0]);
                pr = convertToPx(values[1]);
                pb = convertToPx(values[2]);
                pl = convertToPx(values[3]);
                break;
            default:
                break;
        }
    }
    return {
        pb: paddingBottom ? convertToPx(paddingBottom) : pb,
        pl: paddingLeft ? convertToPx(paddingLeft) : pl,
        pr: paddingRight ? convertToPx(paddingRight) : pr,
        pt: paddingTop ? convertToPx(paddingTop) : pt
    };
}
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/button' } : {};
export const pxToPt = (px) => typeof px === 'number' && !isNaN(Number(px)) ? (px * 3) / 4 : null;
const buttonStyle = (style) => {
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
const buttonTextStyle = (pb) => {
    return {
        display: 'inline-block',
        lineHeight: '120%',
        maxWidth: '100%',
        msoPaddingAlt: '0px',
        msoTextRaise: pxToPt(pb || 0)
    };
};
export const Butan = ({ children, style, target, ...props }) => {
    log.warn(`The Butan component is deprecated and is provided as a means of migrating to the updated Butan component. It'll be removed in the next major version.`);
    const parsedPadding = parsePadding(style || {});
    let textRaiseTop = '';
    let textRaiseBottom;
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
    return (_jsxs("a", { ...props, ...debugProps, target: target, style: buttonStyle({ ...style, ...parsedPadding }), children: [_jsx("span", { dangerouslySetInnerHTML: {
                    __html: `<!--[if mso]><i style="${letterSpacingLeft}mso-font-width:-100%;${textRaiseTop}" hidden>&nbsp;</i><![endif]-->`
                } }), _jsx("span", { style: buttonTextStyle(textRaiseBottom), children: children }), _jsx("span", { dangerouslySetInnerHTML: {
                    __html: `<!--[if mso]><i style="${letterSpacingRight}mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`
                } })] }));
};
Butan.displayName = 'Butan';
//# sourceMappingURL=butan.js.map