"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
const tree_manager_walker_1 = require("../walker/tree-manager.walker");
const rxjs_1 = require("rxjs");
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
class State {
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
    constructor(tree, keys) {
        // Provided a keys object, this constructor will loop trough
        // that object's keys, building a map that links each key
        // to a new configuration object. This loop is also used to fetch
        // or assume each key's default value that in their turn are assigned to
        // the defaultState. An object that will be used as the default state
        // for every node.
        this.keyConfigMap = {};
        this.defaultState = {};
        if (keys)
            for (const key in keys) {
                const record = keys[key];
                const propagation = record.hasOwnProperty('propagation') ?
                    record.propagation :
                    State.configDefault.propagation;
                const selection = record.hasOwnProperty('selection') ?
                    record.selection :
                    State.configDefault.selection;
                const defaultValue = record.hasOwnProperty('defaultValue') ?
                    record.defaultValue :
                    State.configDefault.defaultValue;
                this.keyConfigMap[key] = { propagation, selection, defaultValue };
                this.defaultState[key] = defaultValue;
            }
        // As soon as the defaultState has been built, each node state can be
        // initialized using it. Given a tree has been provided.
        this.nodeStateMap = new Map();
        this.node$StateMap = new Map(); // this maps does not needs to be initialized with values
        if (tree)
            this.tree = tree;
        if (this.tree) {
            for (const node of this.tree.nodes) {
                this._assertState(node, this.defaultState);
            }
        }
        // The, we loop again trough the keys object, now checking if any node
        // must be initialized with a value other than its default.
        if (keys)
            for (const key in keys) {
                const record = keys[key];
                let valuesNodesMap;
                if (record.hasOwnProperty('values'))
                    valuesNodesMap = record.values;
                else if (Array.isArray(record))
                    valuesNodesMap = record;
                else
                    continue;
                for (let i = 0; i < valuesNodesMap.length; i++) {
                    const { value, nodes } = valuesNodesMap[i];
                    for (let j = 0; j < nodes.length; j++) {
                        this.setState(nodes[j], key, value);
                    }
                }
            }
    }
    _assertState(node, baseState) {
        if (!this.nodeStateMap.has(node))
            this.nodeStateMap.set(node, Object.assign({}, baseState));
        return this.nodeStateMap.get(node);
    }
    /**
     * @method getConfig For the provided key, returns its configuration's
     * object or, if it has been configured, the State configDefault.
     * @param key key used to index configuration's objects
     * @returns the configuration object for the provided key
     */
    getConfig(key) {
        return this.keyConfigMap.hasOwnProperty(key) ?
            this.keyConfigMap[key] :
            State.configDefault;
    }
    /**
     * @method getStateObject gets a node state object
     * @param node tree's node
     * @returns the whole node's state object
     */
    getStateObject(node) {
        return this.nodeStateMap.get(node);
    }
    /**
     * @method $getStateObject gets a node state object as an Observable
     * @param node tree's node
     * @returns the whole node's state object
     */
    $getStateObject(node) {
        if (!this.node$StateMap.has(node)) {
            const state = this.nodeStateMap.get(node);
            this.node$StateMap.set(node, new rxjs_1.BehaviorSubject(state));
        }
        return this.node$StateMap.get(node);
    }
    /**
     * @method $getState gets the value of a node state object's property key
     * as an Observable
     * @param node tree's node
     * @param key node's state object property key
     * @returns the value for that node state object's property key
     */
    $getState(node, key) {
        return this.$getStateObject(node)
            .pipe((0, rxjs_1.map)(state => state && state.hasOwnProperty(key) ? state[key] : undefined));
    }
    /**
     * @method getState gets the value of a node state object's property key
     * @param node tree's node
     * @param key node's state object property key
     * @returns the value for that node state object's property key
     */
    getState(node, key) {
        const state = this.nodeStateMap.get(node);
        if (!state || !state.hasOwnProperty(key))
            return;
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
    setState(node, key, value) {
        const { selection } = this.getConfig(key);
        if (selection === 'single') {
            this.setStateSingleSelection(node, key, value);
        }
        else {
            this.setStateMultiSelection(node, key, value);
        }
    }
    /**
     * @method resetStateKey loops trough all node's states, assign the provided
     * key to its configured defaultValue. That if not provided will be assumed
     * from this classes static property configDefault.defaultValue.
     * @param key the states key to be reset
     */
    resetStateKey(key) {
        const { defaultValue } = this.getConfig(key);
        this.nodeStateMap.forEach((state) => {
            state[key] = defaultValue;
        });
    }
    /**
     * @method setStateSingleSelection gets the provided node's state object and assigns
     * it the provided value for the provided property key. Also reset's every
     * other node's state for that key to their configuration's defaultValue.
     * @param node tree's node
     * @param key node's state object property key
     * @param value value to be assigned to that node state's property
     */
    setStateSingleSelection(node, key, value) {
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
    setStateMultiSelection(node, key, value) {
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
    setWalkingNone(node, key, value) {
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
    setStateWalkingDown(node, key, value) {
        this.setWalkingNone(node, key, value);
        if (!this.tree)
            return;
        tree_manager_walker_1.Walker.walkDownSyncSkipSelf(node, this.tree, (child) => { this.setWalkingNone(child, key, value); });
    }
    /**
     * @method setStateWalkingUp gets the provided node's state object and assigns
     * it the provided value for the provided property key. Then does the same
     * to that node's parent, and their parent and so on.
     * @param node tree's entry point node
     * @param key node's state object property key
     * @param value value to be assigned to that node state's property
     */
    setStateWalkingUp(node, key, value) {
        this.setWalkingNone(node, key, value);
        if (!this.tree)
            return;
        tree_manager_walker_1.Walker.walkUpSyncSkipSelf(node, this.tree, (child) => { this.setWalkingNone(child, key, value); });
    }
}
exports.State = State;
/**
 * default configuration, whose properties will be used to complete
 * any key's state configuration that has been partially or not provided.
 * @field configDefault
 */
State.configDefault = {
    propagation: 'none',
    selection: 'multi',
    defaultValue: undefined,
};
//# sourceMappingURL=tree-manager.state.js.map