import { Tree } from '../tree/tree-manager.tree';
import { Walker } from '../walker/tree-manager.walker';

/**
 * `State` contains holds each tree node's state object. For example,
 * for a file explorer tree with checkboxes, this class could be used to
 * tell if any or multiple nodes are selected and/or indeterminate.
 * Built in are functions to individually configure and initialize
 * state properties, propagate them up and down and
 * force single or multi selection mode
 * 
 * @class State
 */
export class State<N=any, S=any>
implements State.Interface<N, S>
{

    /**
     * default configuration, whose properties will be used to complete
     * any key's state configuration that has been partially or not provided.
     * @field configDefault
     */
    public static readonly configDefault: State.Config = {
        propagation: 'none',
        selection: 'multi',
        defaultValue: undefined,
    }

    public readonly tree: State.Interface<N, S>['tree'];
    public readonly defaultState: State.Interface<N, S>['defaultState'];
    public readonly nodeStateMap: State.Interface<N, S>['nodeStateMap'];
    public readonly keyConfigMap: State.Interface<N, S>['keyConfigMap'];

    /**
     * # Examples
     * 
     * ## Example 1: empty
     * This class can be initialized without arguments. It will build empty maps
     * and this can be useful to avoid breaking your application if
     * you're dynamically filling its parameters and output something undefined.
     * @example
     * ```
     * const state = new TreeController.State<any, S>();
     * ```
     * 
     * ## Example 2: with a tree but no keys containing configs or values
     * Give it a tree only, and it will build an empty state for its nodes.
     * It could initialize the state with a value using the `state` param,
     * as in other examples
     * @example
     * ```
     * const tree = new TreeController.Tree(Tree1.root);
     * const state = new TreeController.State<any, S>(tree);
     * ```
     * 
     * ## Example 3: with a tree and keys containing configs but no values
     * The second parameter tells the State instance what properties
     * each node's state should have and how they should behave.
     * Let's suppose you're building a file explorer with checkboxes.
     * You would assign each nodes check value to that node's state 'checked'
     * property. So, the second argument would contains an object with the
     * 'checked' property and its configurations. Not all configuration
     * options are required, so you could assign to an empty object to default
     * every value.
     * @example
     * ```
     * const tree = new TreeController.Tree(Tree1.root);
     * const state = new TreeController.State<any, S>(
     *     tree,
     *     {
     *         checked: <TreeController.State.Constructor.Params.Keys.KeyRecord<boolean>>{
     *             selection: 'single',
     *             propagation: 'none',
     *             defaultValue: false,
     *         },
     *     },
     * );
     * ```
     * 
     * ## Example 4: with a tree and keys containing no configs but values
     * Just as in the previous example, the second argument tells what the
     * instance should do while initializing states. But as the property is
     * assigned to an Array, the State constructor assumes that that property
     * has no configurations, but should be assigned a value for some nodes.
     * @example
     * ```
     * const tree = new TreeController.Tree(Tree1.root);
     * const state = new TreeController.State<any, S>(
     *     tree,
     *     {
     *         checked: [
     *             <TreeController.State.ValueNodesMap<any, boolean>>{
     *                 value: true,
     *                 nodes: [tree.root],
     *             }
     *         ]
     *     },
     * );
     * ```
     * 
     * ## Example 5: with a tree and keys containing configs and values
     * If you wanna merge both of the last two examples, you can do it initializing
     * an instance using the following pattern:
     * @example
     * ```
     * const tree = new TreeController.Tree(Tree1.root);
     * const state = new TreeController.State<any, S>(
     *     tree,
     *     {
     *         checked: <TreeController.State.Constructor.Params.Keys.KeyRecord<boolean>>{
     *             selection: 'single',
     *             propagation: 'up',
     *             defaultValue: false,
     *             values: [
     *                 <TreeController.State.ValueNodesMap<any, boolean>>{
     *                     value: true,
     *                     nodes: [tree.root],
     *                 }
     *             ]
     *         },
     *     },
     * );
     * ```
     * 
     * @param tree It's a TreeController.Tree<N> whose nodes will be used to
     * initialize a map of node => state
     * @param keys configuration that tells the constructor how each
     * state property should be initialized and behave
     */
    constructor(
        tree?: State.Constructor.Params.Tree<N, S>|null|undefined,
        keys?: State.Constructor.Params.Keys<N, S>|null|undefined,
    ) {
        // Provided a keys object, this constructor will loop trough
        // that object's keys, building a map that links each key
        // to a new configuration object. This loop is also used to fetch
        // or assume each key's default value that in their turn are assigned to
        // the defaultState. An object that will be used as the default state
        // for every node.
        this.keyConfigMap = {};
        this.defaultState = {} as State.Shape<S>;
        if(keys) for (const key in keys) {
            const record = keys[key] as State.Constructor.Params.Keys.KeyRecord<any>;

            const propagation = record.hasOwnProperty('propagation') ?
                (record as State.Config).propagation :
                State.configDefault.propagation;

            const selection = record.hasOwnProperty('selection') ?
                (record as State.Config).selection :
                State.configDefault.selection;

            const defaultValue = record.hasOwnProperty('defaultValue') ?
                (record as State.Config).defaultValue :
                State.configDefault.defaultValue;

            this.keyConfigMap[key] = { propagation, selection, defaultValue };
            this.defaultState[key] = defaultValue;
        }

        // As soon as the defaultState has been built, each node state can be
        // initialized using it. Given a tree has been provided.
        this.nodeStateMap = new Map();
        if(tree) this.tree = tree;
        if (this.tree) {
            for (const node of this.tree.nodes) {
                this._assertState(node, this.defaultState);
            }
        }

        // The, we loop again trough the keys object, now checking if any node
        // must be initialized with a value other than its default.
        if (keys) for (const key in keys) {
            const record = keys[key] as State.Constructor.Params.Keys.KeyRecord<any>;

            let valuesNodesMap: State.ValueNodesMap<N>[];
            if (record.hasOwnProperty('values'))
                valuesNodesMap = (record as { values: State.ValueNodesMap<N>[] }).values;
            else if (Array.isArray(record))
                valuesNodesMap = (record as unknown as State.ValueNodesMap<N>[] );
            else
                continue;

            for (let i=0; i < valuesNodesMap.length; i++) {
                const { value, nodes } = valuesNodesMap[i];

                for (let j=0; j < nodes.length; j++) {
                    this.setState(nodes[j], key, value);
                }
            }
        }
    }

    private _assertState(node: N, baseState: State.Shape<S>): State.Shape<S> {
        if (!this.nodeStateMap.has(node))
            this.nodeStateMap.set(node, Object.assign({}, baseState));
        return this.nodeStateMap.get(node) as State.Shape<S>;
    }

    /**
     * @method getConfig For the provided key, returns its configuration's
     * object or, if it has been configured, the State configDefault.
     * @param key key used to index configuration's objects
     * @returns the configuration object for the provided key
     */
    public getConfig(key: Extract<keyof State.Shape<S>, string>): State.Config {
        return this.keyConfigMap.hasOwnProperty(key) ?
            this.keyConfigMap[key] as State.Config :
            State.configDefault;
    }

    /**
     * @method getStateObject gets a node state object
     * @param node tree's node
     * @returns the whole node's state object
     */
    public getStateObject(node: N): State.Shape<S>|null|undefined {
        return this.nodeStateMap.get(node);
    }

    /**
     * @method getState gets the value of a node state object's property key
     * @param node tree's node
     * @param key node's state object property key
     * @returns the value for that node state object's property key
     */
    public getState(node: N, key: Extract<keyof State.Shape<S>, string>): any|null|undefined {
        const state = this.nodeStateMap.get(node);
        if (!state || !state.hasOwnProperty(key)) return;
        return state[key];
    }

    /**
     * @method setState gets the provided node's state object and assigns
     * it the provided value for the provided property key.
     * 
     * Then, if that key's configuration's is set to selection 'single', it will
     * also reset's every other node's state for that key to their
     * configuration's defaultValue.
     * 
     * Else it assumed the selection is 'multi' and depending
     * on that key's configuration for propagation does on of the following:
     *  - if propagation is set to 'none', then it does nothing;
     *  - if propagation is set to 'down', then it does the same to that node's every children, and their children and so on;
     *  - if propagation is set to 'up', Then does the same to that node's parent, and their parent and so on.
     * @param node tree's entry point node
     * @param key node's state object property key
     * @param value value to be assigned to that node state's property
     */
    public setState(node: N, key: Extract<keyof State.Shape<S>, string>, value: any): void {
        const { selection } = this.getConfig(key);
        if (selection === 'single') {
            this.setStateSingleSelection(node, key, value);
        } else {
            this.setStateMultiSelection(node, key, value);
        }
    }

    /**
     * @method resetStateKey loops trough all node's states, assign the provided
     * key to its configured defaultValue. That if not provided will be assumed
     * from this classes static property configDefault.defaultValue.
     * @param key the states key to be reset
     */
    public resetStateKey(key: Extract<keyof State.Shape<S>, string>): void {
        const { defaultValue } = this.getConfig(key);
        this.nodeStateMap.forEach((state) => {
            state[key] = defaultValue;
        })
    }

    /**
     * @method setStateSingleSelection gets the provided node's state object and assigns
     * it the provided value for the provided property key. Also reset's every
     * other node's state for that key to their configuration's defaultValue.
     * @param node tree's node
     * @param key node's state object property key
     * @param value value to be assigned to that node state's property
     */
    public setStateSingleSelection(node: N, key: Extract<keyof State.Shape<S>, string>, value: any): void {
        this.resetStateKey(key);
        this.setWalkingNone(node, key, value);
    }

    /**
     * @method setStateMultiSelection gets the provided node's state object and assigns
     * it the provided value for the provided property key. Then, depending
     * on that key's configuration for propagation does on of the following:
     *  - if propagation is set to 'none', then it does nothing;
     *  - if propagation is set to 'down', then it does the same to that node's every children, and their children and so on;
     *  - if propagation is set to 'up', Then does the same to that node's parent, and their parent and so on.
     * @param node tree's entry point node
     * @param key node's state object property key
     * @param value value to be assigned to that node state's property
     */
    public setStateMultiSelection(node: N, key: Extract<keyof State.Shape<S>, string>, value: any): void {
        const { propagation } = this.getConfig(key);
        if (propagation === 'down') {
            this.setStateWalkingDown(node, key, value);
        }
        if (propagation === 'up') {
            this.setStateWalkingUp(node, key, value);
        }
        if (propagation === 'none') {
            this.setWalkingNone(node, key, value);
        }
    }

    /**
     * @method setWalkingNone gets the provided node's state object and assigns
     * it the provided value for the provided property key.
     * @param node tree's node
     * @param key node's state object property key
     * @param value value to be assigned to that node state's property
     */
    public setWalkingNone(node: N, key: Extract<keyof State.Shape<S>, string>, value: any): void {
        const nodeState = this._assertState(node, this.defaultState);
        nodeState[key] = value;
    }

    /**
     * @method setStateWalkingDown gets the provided node's state object and assigns
     * it the provided value for the provided property key. Then does the same
     * to that node's every children, and their children and so on.
     * @param node tree's entry point node
     * @param key node's state object property key
     * @param value value to be assigned to that node state's property
     */
    public setStateWalkingDown(node: N, key: Extract<keyof State.Shape<S>, string>, value: any): void {
        this.setWalkingNone(node, key, value);

        if (!this.tree) return;
        Walker.walkDownSyncSkipSelf(
            node,
            this.tree,
            (child: N): void => { this.setWalkingNone(child, key, value) },
        )
    }

    /**
     * @method setStateWalkingUp gets the provided node's state object and assigns
     * it the provided value for the provided property key. Then does the same
     * to that node's parent, and their parent and so on.
     * @param node tree's entry point node
     * @param key node's state object property key
     * @param value value to be assigned to that node state's property
     */
    public setStateWalkingUp(node: N, key: Extract<keyof State.Shape<S>, string>, value: any): void {
        this.setWalkingNone(node, key, value);

        if (!this.tree) return;
        Walker.walkUpSyncSkipSelf(
            node,
            this.tree,
            (child: N): void => { this.setWalkingNone(child, key, value) },
        )
    }
}

export namespace State
{
    export type Shape<S> = S & {};

    export interface Interface<N, S> {
        /**
         * points to a TreeController.Tree instance
         * @field tree
         */
        readonly tree: Tree<N>|undefined;

        /**
         * The state that will be used as the default for the provided tree's
         * nodes.
         * @filed defaultState
         */
        readonly defaultState: State.Shape<S>;

        /**
         * Maps every state property key name to a configuration object
         * @field keyConfigMap
         */
        readonly keyConfigMap: Partial<Record<keyof State.Shape<S>, State.Config>>;

        /**
         * Maps every tree node's to a state object
         * @field nodeStateMap
         */
        readonly nodeStateMap: Map<N, State.Shape<S>>;
    }

    
    export namespace Constructor {
        export namespace Params {
            export type Tree<N, S> = State.Interface<N, S>['tree'];
            export type Keys<N, S, T=any> = Partial<
                Record<keyof State.Shape<S>,
                State.Constructor.Params.Keys.KeyRecord<T, N>>
            >
            export namespace Keys {
                export type KeyRecord<T, N=any> = Partial<
                    State.Config<T> |
                    State.ValueNodesMap<N, T>[] |
                    (State.Config<T>&{ values?: State.ValueNodesMap<N, T>[] })
                >
            }
        }

    }

    export interface Config<T=any> {
        readonly propagation: 'none'|'down'|'up';
        readonly selection: 'multi'|'single'|'multi-leaf'|'single-leaf'|'multi-branch'|'single-branch';
        readonly defaultValue: T;
    }

    export interface ValueNodesMap<N, T=any> {
        value: T;
        nodes: N[];
    }
}