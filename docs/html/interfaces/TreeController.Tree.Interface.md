[tree-controller](../README.md) / [Exports](../modules.md) / [TreeController](../modules/TreeController.md) / [Tree](../modules/TreeController.Tree.md) / Interface

# Interface: Interface<N\>

[TreeController](../modules/TreeController.md).[Tree](../modules/TreeController.Tree.md).Interface

## Type parameters

| Name | Type |
| :------ | :------ |
| `N` | `any` |

## Implemented by

- [`Tree`](../classes/TreeController.Tree-1.md)

## Table of contents

### Properties

- [nodes](TreeController.Tree.Interface.md#nodes)
- [root](TreeController.Tree.Interface.md#root)

## Properties

### nodes

• `Readonly` **nodes**: `N`[]

**`Field`**

`nodes` is a flat array containing every tree's nodes:
the root, each one of its childrens, and their children's
and so on.

#### Defined in

[tree/tree-manager.tree.ts:101](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L101)

___

### root

• `Readonly` **root**: `N`

**`Field`**

`root` is the provided tree root

#### Defined in

[tree/tree-manager.tree.ts:94](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L94)
