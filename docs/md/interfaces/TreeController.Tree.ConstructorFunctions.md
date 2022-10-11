[tree-controller](../README.md) / [Exports](../modules.md) / [TreeController](../modules/TreeController.md) / [Tree](../modules/TreeController.Tree.md) / ConstructorFunctions

# Interface: ConstructorFunctions<N\>

[TreeController](../modules/TreeController.md).[Tree](../modules/TreeController.Tree.md).ConstructorFunctions

## Type parameters

| Name | Type |
| :------ | :------ |
| `N` | `any` |

## Table of contents

### Methods

- [fillNodesArray](TreeController.Tree.ConstructorFunctions.md#fillnodesarray)

## Methods

### fillNodesArray

▸ **fillNodesArray**(`instance`, ...`args`): `N`[]

**`Function`**

`fillNodesArray` will be called in Storage constructor
to fill that instance's nodes property, that is a flat array
containing the tree's every nodes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | [`Tree`](../classes/TreeController.Tree-1.md)<`N`\> | of Storage |
| `...args` | `any`[] | extra arguments you can provide as necessary |

#### Returns

`N`[]

#### Defined in

[tree/tree-manager.tree.ts:164](https://github.com/aexklon/tree-controller/blob/cc5f0c3/src/tree/tree-manager.tree.ts#L164)
