"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tree = void 0;
/**
 * `Tree` holds a tree by its root and provides a flat array of
 * nodes built when its contructor is called. To do so, it assumes that
 * the provided nodes have a `children` property that is an array of its
 * children.
 *
 * If you're dealing with nodes shaped differently, the second paramenter
 * can be provided to override default methods.
 *
 * @class Tree
 */
class Tree {
    constructor(root, options) {
        this.root = root;
        this.node = (options === null || options === void 0 ? void 0 : options.node) ?
            options.node(this) :
            Tree._defaultGetNodeFactory(this);
        this.children = (options === null || options === void 0 ? void 0 : options.children) ?
            options.children(this) :
            Tree._defaultGetChildrenFactory(this);
        this.nodes = (options === null || options === void 0 ? void 0 : options.fillNodesArray) ?
            options.fillNodesArray(this) :
            Tree._defaultFillNodesArray(this); // needs the children method
        this.parent = (options === null || options === void 0 ? void 0 : options.parent) ?
            options.parent(this) :
            Tree._defaultGeParentFactory(this); // needs the nodes array filled
    }
}
exports.Tree = Tree;
Tree._defaultGetNodeFactory = (instance) => (node) => node;
Tree._defaultGetChildrenFactory = (instance) => (node) => node.children;
Tree._defaultFillNodesArray = (instance) => {
    const nodes = [instance.root];
    let stop = false;
    let currentNodes = [instance.root];
    while (!stop) {
        const nextNodes = [];
        for (let i = 0; i < currentNodes.length; i++) {
            const node = currentNodes[i];
            const children = instance.children(node);
            if (Array.isArray(children)) {
                for (let j = 0; j < children.length; j++) {
                    nodes.push(children[j]);
                    nextNodes.push(children[j]);
                }
            }
        }
        currentNodes = nextNodes;
        if (nextNodes.length === 0)
            stop = true;
    }
    return nodes;
};
Tree._defaultGeParentFactory = (instance) => (child) => {
    for (const node of instance.nodes) {
        const children = instance.children(node);
        if (children.indexOf(child) !== -1)
            return node;
    }
};
//# sourceMappingURL=tree-manager.tree.js.map