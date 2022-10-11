[tree-controller](../README.md) / [Exports](../modules.md) / [TreeController](../modules/TreeController.md) / State

# Class: State<N, S\>

[TreeController](../modules/TreeController.md).State

`State` contains holds each tree node's state object. For example,
for a file explorer tree with checkboxes, this class could be used to
tell if any or multiple nodes are selected and/or indeterminate.
Built in are functions to individually configure and initialize
state properties, propagate them up and down and
force single or multi selection mode

## Type parameters

| Name | Type |
| :------ | :------ |
| `N` | `any` |
| `S` | `any` |

## Implements

- [`Interface`](../interfaces/TreeController.State.Interface.md)<`N`, `S`\>

## Table of contents

### Constructors

- [constructor](TreeController.State-1.md#constructor)

### Properties

- [defaultState](TreeController.State-1.md#defaultstate)
- [keyConfigMap](TreeController.State-1.md#keyconfigmap)
- [node$StateMap](TreeController.State-1.md#node$statemap)
- [nodeStateMap](TreeController.State-1.md#nodestatemap)
- [tree](TreeController.State-1.md#tree)
- [configDefault](TreeController.State-1.md#configdefault)

### Methods

- [$getState](TreeController.State-1.md#$getstate)
- [$getStateObject](TreeController.State-1.md#$getstateobject)
- [\_assertState](TreeController.State-1.md#_assertstate)
- [getConfig](TreeController.State-1.md#getconfig)
- [getState](TreeController.State-1.md#getstate)
- [getStateObject](TreeController.State-1.md#getstateobject)
- [resetStateKey](TreeController.State-1.md#resetstatekey)
- [setState](TreeController.State-1.md#setstate)
- [setStateMultiSelection](TreeController.State-1.md#setstatemultiselection)
- [setStateSingleSelection](TreeController.State-1.md#setstatesingleselection)
- [setStateWalkingDown](TreeController.State-1.md#setstatewalkingdown)
- [setStateWalkingUp](TreeController.State-1.md#setstatewalkingup)
- [setWalkingNone](TreeController.State-1.md#setwalkingnone)

## Constructors

### constructor

• **new State**<`N`, `S`\>(`tree?`, `keys?`)

# Examples

## Example 1: empty
This class can be initialized without arguments. It will build empty maps
and this can be useful to avoid breaking your application if
you're dynamically filling its parameters and output something undefined.

**`Example`**

```
const state = new TreeController.State<any, S>();
```

## Example 2: with a tree but no keys containing configs or values
Give it a tree only, and it will build an empty state for its nodes.
It could initialize the state with a value using the `state` param,
as in other examples

**`Example`**

```
const tree = new TreeController.Tree(Tree1.root);
const state = new TreeController.State<any, S>(tree);
```

## Example 3: with a tree and keys containing configs but no values
The second parameter tells the State instance what properties
each node's state should have and how they should behave.
Let's suppose you're building a file explorer with checkboxes.
You would assign each nodes check value to that node's state 'checked'
property. So, the second argument would contains an object with the
'checked' property and its configurations. Not all configuration
options are required, so you could assign to an empty object to default
every value.

**`Example`**

```
const tree = new TreeController.Tree(Tree1.root);
const state = new TreeController.State<any, S>(
    tree,
    {
        checked: <TreeController.State.Constructor.Params.Keys.KeyRecord<boolean>>{
            selection: 'single',
            propagation: 'none',
            defaultValue: false,
        },
    },
);
```

## Example 4: with a tree and keys containing no configs but values
Just as in the previous example, the second argument tells what the
instance should do while initializing states. But as the property is
assigned to an Array, the State constructor assumes that that property
has no configurations, but should be assigned a value for some nodes.

**`Example`**

```
const tree = new TreeController.Tree(Tree1.root);
const state = new TreeController.State<any, S>(
    tree,
    {
        checked: [
            <TreeController.State.ValueNodesMap<any, boolean>>{
                value: true,
                nodes: [tree.root],
            }
        ]
    },
);
```

## Example 5: with a tree and keys containing configs and values
If you wanna merge both of the last two examples, you can do it initializing
an instance using the following pattern:

**`Example`**

```
const tree = new TreeController.Tree(Tree1.root);
const state = new TreeController.State<any, S>(
    tree,
    {
        checked: <TreeController.State.Constructor.Params.Keys.KeyRecord<boolean>>{
            selection: 'single',
            propagation: 'up',
            defaultValue: false,
            values: [
                <TreeController.State.ValueNodesMap<any, boolean>>{
                    value: true,
                    nodes: [tree.root],
                }
            ]
        },
    },
);
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | `any` |
| `S` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tree?` | ``null`` \| [`Tree`](TreeController.Tree-1.md)<`N`\> | It's a TreeController.Tree<N> whose nodes will be used to initialize a map of node => state |
| `keys?` | ``null`` \| `Partial`<`Record`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, [`KeyRecord`](../modules/TreeController.State.Constructor.Params.Keys.md#keyrecord)<`any`, `N`\>\>\> | configuration that tells the constructor how each state property should be initialized and behave |

#### Defined in

[state/tree-manager.state.ts:132](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L132)

## Properties

### defaultState

• `Readonly` **defaultState**: [`Shape`](../modules/TreeController.State.md#shape)<`S`\>

The state that will be used as the default for the provided tree's
nodes.

**`Filed`**

defaultState

#### Implementation of

[Interface](../interfaces/TreeController.State.Interface.md).[defaultState](../interfaces/TreeController.State.Interface.md#defaultstate)

#### Defined in

[state/tree-manager.state.ts:31](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L31)

___

### keyConfigMap

• `Readonly` **keyConfigMap**: `Partial`<`Record`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, [`Config`](../interfaces/TreeController.State.Config.md)<`any`\>\>\>

Maps every state property key name to a configuration object

**`Field`**

keyConfigMap

#### Implementation of

[Interface](../interfaces/TreeController.State.Interface.md).[keyConfigMap](../interfaces/TreeController.State.Interface.md#keyconfigmap)

#### Defined in

[state/tree-manager.state.ts:34](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L34)

___

### node$StateMap

• `Readonly` **node$StateMap**: `Map`<`N`, `BehaviorSubject`<[`Shape`](../modules/TreeController.State.md#shape)<`S`\>\>\>

Maps every tree node's to an Observable that emits its state object

**`Field`**

nodeStateMap

#### Implementation of

[Interface](../interfaces/TreeController.State.Interface.md).[node$StateMap](../interfaces/TreeController.State.Interface.md#node$statemap)

#### Defined in

[state/tree-manager.state.ts:33](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L33)

___

### nodeStateMap

• `Readonly` **nodeStateMap**: `Map`<`N`, [`Shape`](../modules/TreeController.State.md#shape)<`S`\>\>

Maps every tree node's to a state object

**`Field`**

nodeStateMap

#### Implementation of

[Interface](../interfaces/TreeController.State.Interface.md).[nodeStateMap](../interfaces/TreeController.State.Interface.md#nodestatemap)

#### Defined in

[state/tree-manager.state.ts:32](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L32)

___

### tree

• `Readonly` **tree**: `undefined` \| [`Tree`](TreeController.Tree-1.md)<`N`\>

points to a TreeController.Tree instance

**`Field`**

tree

#### Implementation of

[Interface](../interfaces/TreeController.State.Interface.md).[tree](../interfaces/TreeController.State.Interface.md#tree)

#### Defined in

[state/tree-manager.state.ts:30](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L30)

___

### configDefault

▪ `Static` `Readonly` **configDefault**: [`Config`](../interfaces/TreeController.State.Config.md)<`any`\>

default configuration, whose properties will be used to complete
any key's state configuration that has been partially or not provided.

**`Field`**

configDefault

#### Defined in

[state/tree-manager.state.ts:24](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L24)

## Methods

### $getState

▸ **$getState**(`node`, `key`): `Observable`<`any`\>

**`Method`**

$getState gets the value of a node state object's property key
as an Observable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `N` | tree's node |
| `key` | `Extract`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, `string`\> | node's state object property key |

#### Returns

`Observable`<`any`\>

the value for that node state object's property key

#### Defined in

[state/tree-manager.state.ts:244](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L244)

___

### $getStateObject

▸ **$getStateObject**(`node`): `BehaviorSubject`<[`Shape`](../modules/TreeController.State.md#shape)<`S`\>\>

**`Method`**

$getStateObject gets a node state object as an Observable

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `N` | tree's node |

#### Returns

`BehaviorSubject`<[`Shape`](../modules/TreeController.State.md#shape)<`S`\>\>

the whole node's state object

#### Defined in

[state/tree-manager.state.ts:229](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L229)

___

### \_assertState

▸ `Private` **_assertState**(`node`, `baseState`): [`Shape`](../modules/TreeController.State.md#shape)<`S`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `N` |
| `baseState` | [`Shape`](../modules/TreeController.State.md#shape)<`S`\> |

#### Returns

[`Shape`](../modules/TreeController.State.md#shape)<`S`\>

#### Defined in

[state/tree-manager.state.ts:197](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L197)

___

### getConfig

▸ **getConfig**(`key`): [`Config`](../interfaces/TreeController.State.Config.md)<`any`\>

**`Method`**

getConfig For the provided key, returns its configuration's
object or, if it has been configured, the State configDefault.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Extract`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, `string`\> | key used to index configuration's objects |

#### Returns

[`Config`](../interfaces/TreeController.State.Config.md)<`any`\>

the configuration object for the provided key

#### Defined in

[state/tree-manager.state.ts:209](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L209)

___

### getState

▸ **getState**(`node`, `key`): `any`

**`Method`**

getState gets the value of a node state object's property key

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `N` | tree's node |
| `key` | `Extract`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, `string`\> | node's state object property key |

#### Returns

`any`

the value for that node state object's property key

#### Defined in

[state/tree-manager.state.ts:257](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L257)

___

### getStateObject

▸ **getStateObject**(`node`): `undefined` \| ``null`` \| [`Shape`](../modules/TreeController.State.md#shape)<`S`\>

**`Method`**

getStateObject gets a node state object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `N` | tree's node |

#### Returns

`undefined` \| ``null`` \| [`Shape`](../modules/TreeController.State.md#shape)<`S`\>

the whole node's state object

#### Defined in

[state/tree-manager.state.ts:220](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L220)

___

### resetStateKey

▸ **resetStateKey**(`key`): `void`

**`Method`**

resetStateKey loops trough all node's states, assign the provided
key to its configured defaultValue. That if not provided will be assumed
from this classes static property configDefault.defaultValue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `Extract`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, `string`\> | the states key to be reset |

#### Returns

`void`

#### Defined in

[state/tree-manager.state.ts:295](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L295)

___

### setState

▸ **setState**(`node`, `key`, `value`): `void`

**`Method`**

setState gets the provided node's state object and assigns
it the provided value for the provided property key.

Then, if that key's configuration's is set to selection 'single', it will
also reset's every other node's state for that key to their
configuration's defaultValue.

Else it assumed the selection is 'multi' and depending
on that key's configuration for propagation does on of the following:
 - if propagation is set to 'none', then it does nothing;
 - if propagation is set to 'down', then it does the same to that node's every children, and their children and so on;
 - if propagation is set to 'up', Then does the same to that node's parent, and their parent and so on.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `N` | tree's entry point node |
| `key` | `Extract`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, `string`\> | node's state object property key |
| `value` | `any` | value to be assigned to that node state's property |

#### Returns

`void`

#### Defined in

[state/tree-manager.state.ts:280](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L280)

___

### setStateMultiSelection

▸ **setStateMultiSelection**(`node`, `key`, `value`): `void`

**`Method`**

setStateMultiSelection gets the provided node's state object and assigns
it the provided value for the provided property key. Then, depending
on that key's configuration for propagation does on of the following:
 - if propagation is set to 'none', then it does nothing;
 - if propagation is set to 'down', then it does the same to that node's every children, and their children and so on;
 - if propagation is set to 'up', Then does the same to that node's parent, and their parent and so on.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `N` | tree's entry point node |
| `key` | `Extract`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, `string`\> | node's state object property key |
| `value` | `any` | value to be assigned to that node state's property |

#### Returns

`void`

#### Defined in

[state/tree-manager.state.ts:326](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L326)

___

### setStateSingleSelection

▸ **setStateSingleSelection**(`node`, `key`, `value`): `void`

**`Method`**

setStateSingleSelection gets the provided node's state object and assigns
it the provided value for the provided property key. Also reset's every
other node's state for that key to their configuration's defaultValue.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `N` | tree's node |
| `key` | `Extract`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, `string`\> | node's state object property key |
| `value` | `any` | value to be assigned to that node state's property |

#### Returns

`void`

#### Defined in

[state/tree-manager.state.ts:310](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L310)

___

### setStateWalkingDown

▸ **setStateWalkingDown**(`node`, `key`, `value`): `void`

**`Method`**

setStateWalkingDown gets the provided node's state object and assigns
it the provided value for the provided property key. Then does the same
to that node's every children, and their children and so on.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `N` | tree's entry point node |
| `key` | `Extract`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, `string`\> | node's state object property key |
| `value` | `any` | value to be assigned to that node state's property |

#### Returns

`void`

#### Defined in

[state/tree-manager.state.ts:359](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L359)

___

### setStateWalkingUp

▸ **setStateWalkingUp**(`node`, `key`, `value`): `void`

**`Method`**

setStateWalkingUp gets the provided node's state object and assigns
it the provided value for the provided property key. Then does the same
to that node's parent, and their parent and so on.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `N` | tree's entry point node |
| `key` | `Extract`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, `string`\> | node's state object property key |
| `value` | `any` | value to be assigned to that node state's property |

#### Returns

`void`

#### Defined in

[state/tree-manager.state.ts:378](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L378)

___

### setWalkingNone

▸ **setWalkingNone**(`node`, `key`, `value`): `void`

**`Method`**

setWalkingNone gets the provided node's state object and assigns
it the provided value for the provided property key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `node` | `N` | tree's node |
| `key` | `Extract`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, `string`\> | node's state object property key |
| `value` | `any` | value to be assigned to that node state's property |

#### Returns

`void`

#### Defined in

[state/tree-manager.state.ts:346](https://github.com/aexklon/tree-controller/blob/2573bbd/src/state/tree-manager.state.ts#L346)
