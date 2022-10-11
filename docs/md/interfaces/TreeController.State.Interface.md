[tree-controller](../README.md) / [Exports](../modules.md) / [TreeController](../modules/TreeController.md) / [State](../modules/TreeController.State.md) / Interface

# Interface: Interface<N, S\>

[TreeController](../modules/TreeController.md).[State](../modules/TreeController.State.md).Interface

## Type parameters

| Name |
| :------ |
| `N` |
| `S` |

## Implemented by

- [`State`](../classes/TreeController.State-1.md)

## Table of contents

### Properties

- [defaultState](TreeController.State.Interface.md#defaultstate)
- [keyConfigMap](TreeController.State.Interface.md#keyconfigmap)
- [nodeStateMap](TreeController.State.Interface.md#nodestatemap)
- [tree](TreeController.State.Interface.md#tree)

## Properties

### defaultState

• `Readonly` **defaultState**: [`Shape`](../modules/TreeController.State.md#shape)<`S`\>

The state that will be used as the default for the provided tree's
nodes.

**`Filed`**

defaultState

#### Defined in

[state/tree-manager.state.ts:376](https://github.com/aexklon/tree-controller/blob/cc5f0c3/src/state/tree-manager.state.ts#L376)

___

### keyConfigMap

• `Readonly` **keyConfigMap**: `Partial`<`Record`<keyof [`Shape`](../modules/TreeController.State.md#shape)<`S`\>, [`Config`](TreeController.State.Config.md)<`any`\>\>\>

Maps every state property key name to a configuration object

**`Field`**

keyConfigMap

#### Defined in

[state/tree-manager.state.ts:382](https://github.com/aexklon/tree-controller/blob/cc5f0c3/src/state/tree-manager.state.ts#L382)

___

### nodeStateMap

• `Readonly` **nodeStateMap**: `Map`<`N`, [`Shape`](../modules/TreeController.State.md#shape)<`S`\>\>

Maps every tree node's to a state object

**`Field`**

nodeStateMap

#### Defined in

[state/tree-manager.state.ts:388](https://github.com/aexklon/tree-controller/blob/cc5f0c3/src/state/tree-manager.state.ts#L388)

___

### tree

• `Readonly` **tree**: `undefined` \| [`Tree`](../classes/TreeController.Tree-1.md)<`N`\>

points to a TreeController.Tree instance

**`Field`**

tree

#### Defined in

[state/tree-manager.state.ts:369](https://github.com/aexklon/tree-controller/blob/cc5f0c3/src/state/tree-manager.state.ts#L369)
