[tree-controller](../README.md) / [Exports](../modules.md) / [TreeController](../modules/TreeController.md) / [Tree](../modules/TreeController.Tree.md) / Methods

# Interface: Methods<N\>

[TreeController](../modules/TreeController.md).[Tree](../modules/TreeController.Tree.md).Methods

## Type parameters

| Name | Type |
| :------ | :------ |
| `N` | `any` |

## Implemented by

- [`Tree`](../classes/TreeController.Tree-1.md)

## Table of contents

### Methods

- [children](TreeController.Tree.Methods.md#children)
- [node](TreeController.Tree.Methods.md#node)
- [parent](TreeController.Tree.Methods.md#parent)

## Methods

### children

▸ **children**(`node`): `N`[]

**`Method`**

`children` receives a node and returns its children

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `N` |

#### Returns

`N`[]

#### Defined in

[tree/tree-manager.tree.ts:119](https://github.com/aexklon/tree-controller/blob/cc5f0c3/src/tree/tree-manager.tree.ts#L119)

___

### node

▸ **node**(`node`): `N`

**`Method`**

`node` simply receives a node and return that node

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `N` |

#### Returns

`N`

#### Defined in

[tree/tree-manager.tree.ts:109](https://github.com/aexklon/tree-controller/blob/cc5f0c3/src/tree/tree-manager.tree.ts#L109)

___

### parent

▸ **parent**(`node`): `undefined` \| ``null`` \| `N`

**`Method`**

`parent` receives a node and returns its parent

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `N` |

#### Returns

`undefined` \| ``null`` \| `N`

#### Defined in

[tree/tree-manager.tree.ts:114](https://github.com/aexklon/tree-controller/blob/cc5f0c3/src/tree/tree-manager.tree.ts#L114)
