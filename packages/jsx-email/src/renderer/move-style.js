export const getMovePlugin = async () => {
    const { visit } = await import('unist-util-visit');
    return function moveStylePlugin() {
        return function move(tree) {
            const matches = [];
            let head;
            visit(tree, 'element', (node, _, parent) => {
                if (node.tagName === 'head') {
                    head = node;
                }
                if (parent &&
                    node.tagName === 'style' &&
                    (parent.type !== 'element' || parent.tagName !== 'head')) {
                    const found = node;
                    found.parent = parent;
                    found.index = parent.children.indexOf(node);
                    matches.push(found);
                }
            });
            if (head) {
                head.children.push(...matches);
                for (const node of matches) {
                    node.parent.children.splice(node.index, 1);
                }
            }
        };
    };
};
//# sourceMappingURL=move-style.js.map