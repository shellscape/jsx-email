import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { debug } from '../debug.js';
const debugProps = debug.elements.enabled ? { dataType: 'jsx-email/button' } : {};
export const Button = ({ href, children, width, height, borderRadius = 0, textColor, backgroundColor, borderColor, borderSize = 1, style, fontSize = 16, align = 'left', withBackground = false, ...props }) => {
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
    };
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
    return (_jsx("table", { ...debugProps, width: "100%", border: 0, cellPadding: 0, cellSpacing: 0, style: { borderCollapse: 'collapse' }, role: "presentation", children: _jsx("tr", { children: _jsxs("td", { align: align, children: [!withBackground && (_jsx("span", { dangerouslySetInnerHTML: {
                            __html: `<!--[if mso]>
            <v:roundrect href="${href}" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:${height}px;v-text-anchor:middle;width:${width}px;" arcsize="${arcsize}%" ${borderColor ? `strokecolor=${borderColor}` : ''} ${borderSize ? `strokeweight="${borderSize}px"` : `stroke="false"`} ${backgroundColor ? `fillcolor=${backgroundColor}` : `fill="false"`}>
            <w:anchorlock/>
            <center style="font-size:${fontSize}px;${textColor ? `color:${textColor};` : ''}">
            ${children}
            </center></v:roundrect>
            <![endif]-->`
                        } })), withBackground ? (_jsx("table", { align: align, width: width, border: 0, cellPadding: 0, cellSpacing: 0, role: "presentation", style: {
                            border: `${borderSize ?? '0'}px solid ${borderColor ?? 'inherit'}`,
                            borderRadius
                        }, children: _jsx("tr", { children: _jsx("td", { 
                                // @ts-ignore: `bgcolor` not documented
                                bgcolor: backgroundColor, width: width, height: height, style: {
                                    borderRadius,
                                    height,
                                    maxWidth: width,
                                    textAlign: 'center',
                                    width
                                }, children: _jsx("a", { href: href, style: {
                                        ...baseStyles,
                                        ...(backgroundColor ? { backgroundColor } : {}),
                                        ...(textColor ? { color: textColor } : {}),
                                        ...style,
                                        ...(withBackground ? {} : { msoHide: 'all' })
                                    }, ...props, children: children }) }) }) })) : (_jsx("a", { href: href, style: {
                            ...baseStyles,
                            ...propStyles,
                            ...style,
                            ...(withBackground ? {} : { msoHide: 'all' })
                        }, ...props, children: children }))] }) }) }));
};
//# sourceMappingURL=button.js.map