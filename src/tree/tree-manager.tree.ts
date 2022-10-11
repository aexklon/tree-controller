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
export class Tree<N=any>
implements Tree.Interface<N>, Tree.Methods<N>
{
    private static readonly _defaultGetNodeFactory: Tree.MethodsFactories['node'] =
        <N=any>(instance: Tree<N>) =>
            (node) => node

    private static readonly _defaultGetChildrenFactory: Tree.MethodsFactories['children'] =
        <N=any>(instance: Tree<N>) =>
            (node) => node.children

    private static readonly _defaultFillNodesArray =
        <N=any>(instance: Tree<N>): N[] =>
        {
            const nodes = [instance.root];
            let stop = false;
            let currentNodes = [instance.root];
            while (!stop) {
                const nextNodes: any[] = [];
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
                if (nextNodes.length === 0) stop = true;
            }
            return nodes;
        }

    private static readonly _defaultGeParentFactory: Tree.MethodsFactories['parent'] =
        <N=any>(instance: Tree<N>) => 
            (child) => {
                for (const node of instance.nodes) {
                    const children = instance.children(node);
                    if (children.indexOf(child) !== -1) return node;
                }
            }

    public readonly root: Tree.Interface<N>['root'];
    public readonly nodes: Tree.Interface<N>['nodes'];

    public readonly node: Tree.Methods<N>['node'];
    public readonly parent: Tree.Methods<N>['parent'];
    public readonly children: Tree.Methods<N>['children'];

    constructor(
        root: Tree<N>['root'],
        options?: Partial<Tree.MethodsFactories<N> & Tree.ConstructorFunctions<N>>,
    ) {
        this.root = root;

        this.node = options?.node ?
            options.node(this) :
            Tree._defaultGetNodeFactory(this);

        this.children = options?.children ?
            options.children(this) :
            Tree._defaultGetChildrenFactory(this);

        this.nodes = options?.fillNodesArray ?
            options.fillNodesArray(this) :
            Tree._defaultFillNodesArray(this); // needs the children method

        this.parent = options?.parent ?
            options.parent(this) :
            Tree._defaultGeParentFactory(this); // needs the nodes array filled
    }
}

export namespace Tree
{
    export interface Interface<N=any>
    {
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

    export interface Methods<N=any>
    {
        /**
         * @method `node` simply receives a node and return that node
         */
        node(node: N): N;

        /**
         * @method `parent` receives a node and returns its parent
         */
        parent(node: N): N|undefined|null;

        /**
         * @method `children` receives a node and returns its children
         */
        children(node: N): N[];
    }

    export interface MethodsFactories<N=any>
    {
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

    export interface ConstructorFunctions<N=any>
    {
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
