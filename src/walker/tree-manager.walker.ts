import { Tree } from '../tree/tree-manager.tree';

export abstract class Walker {
    public static walkDownSyncSkipSelf<N=any>(node: N, tree: Tree<N>, cb: (node: N, parent: N|null|undefined, tree: Tree<N>) => any|void) {
        let stopped = false;
        let buffer: N[] = tree.children(node);
        while(!stopped) {
            const nextBuffer: N[] = [];
            for (let i=0; i<buffer.length; i++) {
                const child = buffer[i];
                cb(child, tree.parent(child), tree);
                nextBuffer.push(...tree.children(child))
            }
            buffer = nextBuffer;
            if (buffer.length===0) stopped = true;
        }
    }

    public static walkUpSyncSkipSelf<N=any>(node: N, tree: Tree<N>, cb: (node: N, parent: N|null|undefined, tree: Tree<N>) => any|void) {
        let stopped = false;
        let buffer: N|null|undefined = tree.parent(node);
        while(!stopped) {
            if (!buffer) {
                stopped = true;
                continue;
            };
            const parent = tree.parent(buffer);
            cb(buffer, parent, tree);
            buffer = parent
        }
    }
}
