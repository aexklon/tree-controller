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
export declare class Tree<N = any> implements Tree.Interface<N>, Tree.Methods<N> {
    private static readonly _defaultGetNodeFactory;
    private static readonly _defaultGetChildrenFactory;
    private static readonly _defaultFillNodesArray;
    private static readonly _defaultGeParentFactory;
    readonly root: Tree.Interface<N>['root'];
    readonly nodes: Tree.Interface<N>['nodes'];
    readonly node: Tree.Methods<N>['node'];
    readonly parent: Tree.Methods<N>['parent'];
    readonly children: Tree.Methods<N>['children'];
    constructor(root: Tree<N>['root'], options?: Partial<Tree.MethodsFactories<N> & Tree.ConstructorFunctions<N>>);
}
export declare namespace Tree {
    interface Interface<N = any> {
        /**
         * @field `root` is the provided tree root
         */
        readonly root: N;
        /**
         * @field `nodes` is a flat array containing every tree's nodes:
         * the root, each one of its childrens, and their children's
         * and so on.
         */
        readonly nodes: N[];
    }
    interface Methods<N = any> {
        /**
         * @method `node` simply receives a node and return that node
         */
        node(node: N): N;
        /**
         * @method `parent` receives a node and returns its parent
         */
        parent(node: N): N | undefined | null;
        /**
         * @method `children` receives a node and returns its children
         */
        children(node: N): N[];
    }
    interface MethodsFactories<N = any> {
        /**
         * @method `node` is a factory function that will be called in
         * the Store constructor passing the Store instance as the
         * first parameter. It will override that instance's default method
         * for retrieving a node
         * @param instance of Storage
         * @param args extra arguments you can provide as necessary
         */
        node(instance: Tree<N>, ...args: any[]): Tree.Methods<N>['node'];
        /**
         * @method `parent` is a factory function that will be called in
         * the Store constructor passing the Store instance as the
         * first parameter. It will override that instance's default method
         * for retrieving a node's parent
         * @param instance of Storage
         * @param args extra arguments you can provide as necessary
         */
        parent(instance: Tree<N>, ...args: any[]): Tree.Methods<N>['parent'];
        /**
         * @method `children` is a factory function that will be called in
         * the Store constructor passing the Store instance as the
         * first parameter. It will override that instance's default method
         * for retrieving a node's children
         * @param instance of Storage
         * @param args extra arguments you can provide as necessary
         */
        children(instance: Tree<N>, ...args: any[]): Tree.Methods<N>['children'];
    }
    interface ConstructorFunctions<N = any> {
        /**
         * @function `fillNodesArray` will be called in Storage constructor
         * to fill that instance's nodes property, that is a flat array
         * containing the tree's every nodes.
         * @param instance of Storage
         * @param args extra arguments you can provide as necessary
         */
        fillNodesArray(instance: Tree<N>, ...args: any[]): Tree.Interface<N>['nodes'];
    }
}
//# sourceMappingURL=tree-manager.tree.d.ts.map