[tree-controller](../README.md) / [Exports](../modules.md) / [TreeController](../modules/TreeController.md) / Tree

# Class: Tree<N\>

[TreeController](../modules/TreeController.md).Tree

`Tree` holds a tree by its root and provides a flat array of
nodes built when its contructor is called. To do so, it assumes that
the provided nodes have a `children` property that is an array of its
children.

If you're dealing with nodes shaped differently, the second paramenter
can be provided to override default methods.

## Type parameters

| Name | Type |
| :------ | :------ |
| `N` | `any` |

## Implements

- [`Interface`](../interfaces/TreeController.Tree.Interface.md)<`N`\>
- [`Methods`](../interfaces/TreeController.Tree.Methods.md)<`N`\>

## Table of contents

### Constructors

- [constructor](TreeController.Tree-1.md#constructor)

### Properties

- [children](TreeController.Tree-1.md#children)
- [node](TreeController.Tree-1.md#node)
- [nodes](TreeController.Tree-1.md#nodes)
- [parent](TreeController.Tree-1.md#parent)
- [root](TreeController.Tree-1.md#root)
- [\_defaultGeParentFactory](TreeController.Tree-1.md#_defaultgeparentfactory)
- [\_defaultGetChildrenFactory](TreeController.Tree-1.md#_defaultgetchildrenfactory)
- [\_defaultGetNodeFactory](TreeController.Tree-1.md#_defaultgetnodefactory)

### Methods

- [\_defaultFillNodesArray](TreeController.Tree-1.md#_defaultfillnodesarray)

## Constructors

### constructor

• **new Tree**<`N`\>(`root`, `options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | `N` |
| `options?` | `Partial`<[`MethodsFactories`](../interfaces/TreeController.Tree.MethodsFactories.md)<`N`\> & [`ConstructorFunctions`](../interfaces/TreeController.Tree.ConstructorFunctions.md)<`N`\>\> |

#### Defined in

[tree/tree-manager.tree.ts:63](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L63)

## Properties

### children

• `Readonly` **children**: (`node`: `N`) => `N`[]

#### Type declaration

▸ (`node`): `N`[]

**`Method`**

`children` receives a node and returns its children

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `N` |

##### Returns

`N`[]

#### Implementation of

[Methods](../interfaces/TreeController.Tree.Methods.md).[children](../interfaces/TreeController.Tree.Methods.md#children)

#### Defined in

[tree/tree-manager.tree.ts:61](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L61)

___

### node

• `Readonly` **node**: (`node`: `N`) => `N`

#### Type declaration

▸ (`node`): `N`

**`Method`**

`node` simply receives a node and return that node

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `N` |

##### Returns

`N`

#### Implementation of

[Methods](../interfaces/TreeController.Tree.Methods.md).[node](../interfaces/TreeController.Tree.Methods.md#node)

#### Defined in

[tree/tree-manager.tree.ts:59](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L59)

___

### nodes

• `Readonly` **nodes**: `N`[]

**`Field`**

`nodes` is a flat array containing every tree's nodes:
the root, each one of its childrens, and their children's
and so on.

#### Implementation of

[Interface](../interfaces/TreeController.Tree.Interface.md).[nodes](../interfaces/TreeController.Tree.Interface.md#nodes)

#### Defined in

[tree/tree-manager.tree.ts:57](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L57)

___

### parent

• `Readonly` **parent**: (`node`: `N`) => `undefined` \| ``null`` \| `N`

#### Type declaration

▸ (`node`): `undefined` \| ``null`` \| `N`

**`Method`**

`parent` receives a node and returns its parent

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `N` |

##### Returns

`undefined` \| ``null`` \| `N`

#### Implementation of

[Methods](../interfaces/TreeController.Tree.Methods.md).[parent](../interfaces/TreeController.Tree.Methods.md#parent)

#### Defined in

[tree/tree-manager.tree.ts:60](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L60)

___

### root

• `Readonly` **root**: `N`

**`Field`**

`root` is the provided tree root

#### Implementation of

[Interface](../interfaces/TreeController.Tree.Interface.md).[root](../interfaces/TreeController.Tree.Interface.md#root)

#### Defined in

[tree/tree-manager.tree.ts:56](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L56)

___

### \_defaultGeParentFactory

▪ `Static` `Private` `Readonly` **\_defaultGeParentFactory**: (`instance`: [`Tree`](TreeController.Tree-1.md)<`any`\>, ...`args`: `any`[]) => (`node`: `any`) => `any`

#### Type declaration

▸ (`instance`, ...`args`): (`node`: `any`) => `any`

**`Method`**

`parent` is a factory function that will be called in
the Store constructor passing the Store instance as the
first parameter. It will override that instance's default method
for retrieving a node's parent

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | [`Tree`](TreeController.Tree-1.md)<`any`\> | of Storage |
| `...args` | `any`[] | extra arguments you can provide as necessary |

##### Returns

`fn`

▸ (`node`): `any`

**`Method`**

`parent` receives a node and returns its parent

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `any` |

##### Returns

`any`

#### Defined in

[tree/tree-manager.tree.ts:47](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L47)

___

### \_defaultGetChildrenFactory

▪ `Static` `Private` `Readonly` **\_defaultGetChildrenFactory**: (`instance`: [`Tree`](TreeController.Tree-1.md)<`any`\>, ...`args`: `any`[]) => (`node`: `any`) => `any`[]

#### Type declaration

▸ (`instance`, ...`args`): (`node`: `any`) => `any`[]

**`Method`**

`children` is a factory function that will be called in
the Store constructor passing the Store instance as the
first parameter. It will override that instance's default method
for retrieving a node's children

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | [`Tree`](TreeController.Tree-1.md)<`any`\> | of Storage |
| `...args` | `any`[] | extra arguments you can provide as necessary |

##### Returns

`fn`

▸ (`node`): `any`[]

**`Method`**

`children` receives a node and returns its children

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `any` |

##### Returns

`any`[]

#### Defined in

[tree/tree-manager.tree.ts:19](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L19)

___

### \_defaultGetNodeFactory

▪ `Static` `Private` `Readonly` **\_defaultGetNodeFactory**: (`instance`: [`Tree`](TreeController.Tree-1.md)<`any`\>, ...`args`: `any`[]) => (`node`: `any`) => `any`

#### Type declaration

▸ (`instance`, ...`args`): (`node`: `any`) => `any`

**`Method`**

`node` is a factory function that will be called in
the Store constructor passing the Store instance as the
first parameter. It will override that instance's default method
for retrieving a node

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `instance` | [`Tree`](TreeController.Tree-1.md)<`any`\> | of Storage |
| `...args` | `any`[] | extra arguments you can provide as necessary |

##### Returns

`fn`

▸ (`node`): `any`

**`Method`**

`node` simply receives a node and return that node

##### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `any` |

##### Returns

`any`

#### Defined in

[tree/tree-manager.tree.ts:15](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L15)

## Methods

### \_defaultFillNodesArray

▸ `Static` `Private` `Readonly` **_defaultFillNodesArray**<`N`\>(`instance`): `N`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `N` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `instance` | [`Tree`](TreeController.Tree-1.md)<`N`\> |

#### Returns

`N`[]

#### Defined in

[tree/tree-manager.tree.ts:24](https://github.com/aexklon/tree-controller/blob/2573bbd/src/tree/tree-manager.tree.ts#L24)
