[tree-controller](../README.md) / [Exports](../modules.md) / [TreeController](../modules/TreeController.md) / [Tree](../modules/TreeController.Tree.md) / MethodsFactories

# Interface: MethodsFactories<N\>

[TreeController](../modules/TreeController.md).[Tree](../modules/TreeController.Tree.md).MethodsFactories

## Type parameters

| Name | Type |
| :------ | :------ |
| `N` | `any` |

## Table of contents

### Methods

- [children](TreeController.Tree.MethodsFactories.md#children)
- [node](TreeController.Tree.MethodsFactories.md#node)
- [parent](TreeController.Tree.MethodsFactories.md#parent)

## Methods

### children

▸ **children**(`instance`, ...`args`): (`node`: `N`) => `N`[]

**`Method`**

`children` is a factory function that will be called in
the Store constructor passing the Store instance as the
first parameter. It will override that instance's default method
for retrieving a node's children

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | [`Tree`](../classes/TreeController.Tree-1.md)<`N`\> | of Storage |
| `...args` | `any`[] | extra arguments you can provide as necessary |

#### Returns

`fn`

▸ (`node`): `N`[]

**`Method`**

`children` receives a node and returns its children

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `N` |

##### Returns

`N`[]

#### Defined in

[tree/tree-manager.tree.ts:152](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L152)

___

### node

▸ **node**(`instance`, ...`args`): (`node`: `N`) => `N`

**`Method`**

`node` is a factory function that will be called in
the Store constructor passing the Store instance as the
first parameter. It will override that instance's default method
for retrieving a node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | [`Tree`](../classes/TreeController.Tree-1.md)<`N`\> | of Storage |
| `...args` | `any`[] | extra arguments you can provide as necessary |

#### Returns

`fn`

▸ (`node`): `N`

**`Method`**

`node` simply receives a node and return that node

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `N` |

##### Returns

`N`

#### Defined in

[tree/tree-manager.tree.ts:132](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L132)

___

### parent

▸ **parent**(`instance`, ...`args`): (`node`: `N`) => `undefined` \| ``null`` \| `N`

**`Method`**

`parent` is a factory function that will be called in
the Store constructor passing the Store instance as the
first parameter. It will override that instance's default method
for retrieving a node's parent

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | [`Tree`](../classes/TreeController.Tree-1.md)<`N`\> | of Storage |
| `...args` | `any`[] | extra arguments you can provide as necessary |

#### Returns

`fn`

▸ (`node`): `undefined` \| ``null`` \| `N`

**`Method`**

`parent` receives a node and returns its parent

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `N` |

##### Returns

`undefined` \| ``null`` \| `N`

#### Defined in

[tree/tree-manager.tree.ts:142](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L142)
