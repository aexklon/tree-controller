import { Tree } from '../tree/tree-manager.tree';
export declare abstract class Walker {
    static walkDownSyncSkipSelf<N = any>(node: N, tree: Tree<N>, cb: (node: N, parent: N | null | undefined, tree: Tree<N>) => any | void): void;
    static walkUpSyncSkipSelf<N = any>(node: N, tree: Tree<N>, cb: (node: N, parent: N | null | undefined, tree: Tree<N>) => any | void): void;
}
//# sourceMappingURL=tree-manager.walker.d.ts.map