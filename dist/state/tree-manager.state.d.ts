import { Tree } from '../tree/tree-manager.tree';
import { Observable, BehaviorSubject } from 'rxjs';
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
export declare class State<N = any, S = any> implements State.Interface<N, S> {
    /**
     * default configuration, whose properties will be used to complete
     * any key's state configuration that has been partially or not provided.
     * @field configDefault
     */
    static readonly configDefault: State.Config;
    readonly tree: State.Interface<N, S>['tree'];
    readonly defaultState: State.Interface<N, S>['defaultState'];
    readonly nodeStateMap: State.Interface<N, S>['nodeStateMap'];
    readonly node$StateMap: State.Interface<N, S>['node$StateMap'];
    readonly keyConfigMap: State.Interface<N, S>['keyConfigMap'];
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
    constructor(tree?: State.Constructor.Params.Tree<N, S> | null | undefined, keys?: State.Constructor.Params.Keys<N, S> | null | undefined);
    private _assertState;
    /**
     * @method getConfig For the provided key, returns its configuration's
     * object or, if it has been configured, the State configDefault.
     * @param key key used to index configuration's objects
     * @returns the configuration object for the provided key
     */
    getConfig(key: Extract<keyof State.Shape<S>, string>): State.Config;
    /**
     * @method getStateObject gets a node state object
     * @param node tree's node
     * @returns the whole node's state object
     */
    getStateObject(node: N): State.Shape<S> | null | undefined;
    /**
     * @method $getStateObject gets a node state object as an Observable
     * @param node tree's node
     * @returns the whole node's state object
     */
    $getStateObject(node: N): BehaviorSubject<State.Shape<S>>;
    /**
     * @method $getState gets the value of a node state object's property key
     * as an Observable
     * @param node tree's node
     * @param key node's state object property key
     * @returns the value for that node state object's property key
     */
    $getState(node: N, key: Extract<keyof State.Shape<S>, string>): Observable<any>;
    /**
     * @method getState gets the value of a node state object's property key
     * @param node tree's node
     * @param key node's state object property key
     * @returns the value for that node state object's property key
     */
    getState(node: N, key: Extract<keyof State.Shape<S>, string>): any | null | undefined;
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
    setState(node: N, key: Extract<keyof State.Shape<S>, string>, value: any): void;
    /**
     * @method resetStateKey loops trough all node's states, assign the provided
     * key to its configured defaultValue. That if not provided will be assumed
     * from this classes static property configDefault.defaultValue.
     * @param key the states key to be reset
     */
    resetStateKey(key: Extract<keyof State.Shape<S>, string>): void;
    /**
     * @method setStateSingleSelection gets the provided node's state object and assigns
     * it the provided value for the provided property key. Also reset's every
     * other node's state for that key to their configuration's defaultValue.
     * @param node tree's node
     * @param key node's state object property key
     * @param value value to be assigned to that node state's property
     */
    setStateSingleSelection(node: N, key: Extract<keyof State.Shape<S>, string>, value: any): void;
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
    setStateMultiSelection(node: N, key: Extract<keyof State.Shape<S>, string>, value: any): void;
    /**
     * @method setWalkingNone gets the provided node's state object and assigns
     * it the provided value for the provided property key.
     * @param node tree's node
     * @param key node's state object property key
     * @param value value to be assigned to that node state's property
     */
    setWalkingNone(node: N, key: Extract<keyof State.Shape<S>, string>, value: any): void;
    /**
     * @method setStateWalkingDown gets the provided node's state object and assigns
     * it the provided value for the provided property key. Then does the same
     * to that node's every children, and their children and so on.
     * @param node tree's entry point node
     * @param key node's state object property key
     * @param value value to be assigned to that node state's property
     */
    setStateWalkingDown(node: N, key: Extract<keyof State.Shape<S>, string>, value: any): void;
    /**
     * @method setStateWalkingUp gets the provided node's state object and assigns
     * it the provided value for the provided property key. Then does the same
     * to that node's parent, and their parent and so on.
     * @param node tree's entry point node
     * @param key node's state object property key
     * @param value value to be assigned to that node state's property
     */
    setStateWalkingUp(node: N, key: Extract<keyof State.Shape<S>, string>, value: any): void;
}
export declare namespace State {
    type Shape<S> = S & {};
    interface Interface<N, S> {
        /**
         * points to a TreeController.Tree instance
         * @field tree
         */
        readonly tree: Tree<N> | undefined;
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
        /**
         * Maps every tree node's to an Observable that emits its state object
         * @field nodeStateMap
         */
        readonly node$StateMap: Map<N, BehaviorSubject<State.Shape<S>>>;
    }
    namespace Constructor {
        namespace Params {
            type Tree<N, S> = State.Interface<N, S>['tree'];
            type Keys<N, S, T = any> = Partial<Record<keyof State.Shape<S>, State.Constructor.Params.Keys.KeyRecord<T, N>>>;
            namespace Keys {
                type KeyRecord<T, N = any> = Partial<State.Config<T> | State.ValueNodesMap<N, T>[] | (State.Config<T> & {
                    values?: State.ValueNodesMap<N, T>[];
                })>;
            }
        }
    }
    interface Config<T = any> {
        readonly propagation: 'none' | 'down' | 'up';
        readonly selection: 'multi' | 'single' | 'multi-leaf' | 'single-leaf' | 'multi-branch' | 'single-branch';
        readonly defaultValue: T;
    }
    interface ValueNodesMap<N, T = any> {
        value: T;
        nodes: N[];
    }
}
//# sourceMappingURL=tree-manager.state.d.ts.map