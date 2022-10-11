[tree-controller](../README.md) / [Exports](../modules.md) / [TreeController](../modules/TreeController.md) / Walker

# Class: Walker

[TreeController](../modules/TreeController.md).Walker

## Table of contents

### Constructors

- [constructor](TreeController.Walker.md#constructor)

### Methods

- [walkDownSyncSkipSelf](TreeController.Walker.md#walkdownsyncskipself)
- [walkUpSyncSkipSelf](TreeController.Walker.md#walkupsyncskipself)

## Constructors

### constructor

• **new Walker**()

## Methods

### walkDownSyncSkipSelf

▸ `Static` **walkDownSyncSkipSelf**<`N`\>(`node`, `tree`, `cb`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `N` |
| `tree` | [`Tree`](TreeController.Tree-1.md)<`N`\> |
| `cb` | (`node`: `N`, `parent`: `undefined` \| ``null`` \| `N`, `tree`: [`Tree`](TreeController.Tree-1.md)<`N`\>) => `any` |

#### Returns

`void`

#### Defined in

[walker/tree-manager.walker.ts:4](https://github.com/aexklon/tree-controller/blob/2573bbd/src/walker/tree-manager.walker.ts#L4)

___

### walkUpSyncSkipSelf

▸ `Static` **walkUpSyncSkipSelf**<`N`\>(`node`, `tree`, `cb`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `N` |
| `tree` | [`Tree`](TreeController.Tree-1.md)<`N`\> |
| `cb` | (`node`: `N`, `parent`: `undefined` \| ``null`` \| `N`, `tree`: [`Tree`](TreeController.Tree-1.md)<`N`\>) => `any` |

#### Returns

`void`

#### Defined in

[walker/tree-manager.walker.ts:19](https://github.com/aexklon/tree-controller/blob/2573bbd/src/walker/tree-manager.walker.ts#L19)
