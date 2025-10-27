/**
 * Returns a rehype plugin that replaces `<jsx-email-cond>` elements (from
 * the Conditional component) with conditional comment wrappers, based on the
 * `data-mso` and `data-expression` attributes.
 *
 * Mirrors the async factory pattern used by `getRawPlugin()`.
 */
export const getConditionalPlugin = async () => {
    const { visit } = await import('unist-util-visit');
    return function conditionalPlugin() {
        return function transform(tree) {
            const matches = [];
            let headEl;
            visit(tree, 'element', (node, index, parent) => {
                if (node.tagName === 'head')
                    headEl = node;
                if (!parent || typeof index !== 'number')
                    return;
                if (node.tagName !== 'jsx-email-cond')
                    return;
                matches.push({ index, node, parent });
            });
            for (const { node, parent, index } of matches) {
                const props = (node.properties || {});
                const msoProp = (props['data-mso'] ?? props.dataMso);
                const msoAttr = typeof msoProp === 'undefined' ? void 0 : msoProp === 'false' ? false : Boolean(msoProp);
                const exprRaw = (props['data-expression'] ?? props.dataExpression);
                const exprAttr = typeof exprRaw === 'string' ? exprRaw : void 0;
                const headProp = (props['data-head'] ?? props.dataHead);
                const toHead = typeof headProp === 'undefined'
                    ? false
                    : headProp === 'false'
                        ? false
                        : Boolean(headProp);
                let openRaw;
                let closeRaw;
                if (msoAttr === false) {
                    // Not MSO: <!--[if !mso]><!--> ... <!--<![endif]-->
                    openRaw = '<!--[if !mso]><!-->';
                    closeRaw = '<!--<![endif]-->';
                }
                else {
                    // MSO / expression path
                    const expression = exprAttr || (msoAttr === true ? 'mso' : void 0);
                    if (expression) {
                        openRaw = `<!--[if ${expression}]>`;
                        // Older Outlook/Word HTML parsers prefer the self-closing
                        // conditional terminator variant to avoid comment spillover
                        // when adjacent comments appear. Use the `<![endif]/-->` form
                        // for maximum compatibility.
                        closeRaw = '<![endif]/-->';
                    }
                }
                // If no directive attributes present, leave the element in place.
                // eslint-disable-next-line no-continue
                if (!openRaw || !closeRaw)
                    continue;
                const before = { type: 'raw', value: openRaw };
                const after = { type: 'raw', value: closeRaw };
                const children = (node.children || []);
                if (toHead && headEl) {
                    if (parent === headEl) {
                        // Replace in place: open raw, original children, close raw.
                        parent.children.splice(index, 1, before, ...children, after);
                    }
                    else {
                        // Remove wrapper from current location
                        parent.children.splice(index, 1);
                        // Append the conditional to the <head>
                        headEl.children.push(before, ...children, after);
                    }
                }
                else {
                    // Replace in place: open raw, original children, close raw.
                    parent.children.splice(index, 1, before, ...children, after);
                }
            }
        };
    };
};
//# sourceMappingURL=conditional.js.map