"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Walker = void 0;
class Walker {
    static walkDownSyncSkipSelf(node, tree, cb) {
        let stopped = false;
        let buffer = tree.children(node);
        while (!stopped) {
            const nextBuffer = [];
            for (let i = 0; i < buffer.length; i++) {
                const child = buffer[i];
                cb(child, tree.parent(child), tree);
                nextBuffer.push(...tree.children(child));
            }
            buffer = nextBuffer;
            if (buffer.length === 0)
                stopped = true;
        }
    }
    static walkUpSyncSkipSelf(node, tree, cb) {
        let stopped = false;
        let buffer = tree.parent(node);
        while (!stopped) {
            if (!buffer) {
                stopped = true;
                continue;
            }
            ;
            const parent = tree.parent(buffer);
            cb(buffer, parent, tree);
            buffer = parent;
        }
    }
}
exports.Walker = Walker;
//# sourceMappingURL=tree-manager.walker.js.map