import { firstValueFrom } from 'rxjs';
import { TreeController } from '../index';
import { Tree1 } from '../test-util';

describe('State', () => {
    type S = { checked: boolean }

    describe('constructor', () => {

        test('empty', () => {
            const state = new TreeController.State<any, S>();
            expect(state.keyConfigMap?.checked?.defaultValue).toBe(undefined);
            expect(state.keyConfigMap?.checked?.propagation).toBe(undefined);
            expect(state.keyConfigMap?.checked?.selection).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(undefined);
        })

        test('no tree, key not configured, value=true root', () => {
            const state = new TreeController.State<any, S>(
                null,
                {
                    checked: [
                        <TreeController.State.ValueNodesMap<any, boolean>>{
                            value: true,
                            nodes: [Tree1.root],
                        }
                    ]
                }
            );

            expect(state.keyConfigMap.checked?.defaultValue).toBe(undefined);
            expect(state.keyConfigMap.checked?.propagation).toBe('none');
            expect(state.keyConfigMap.checked?.selection).toBe('multi');
            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
        })

        test('no tree, key=checked defaultValue=false, values not configured', () => {
            const state = new TreeController.State<any, S>(
                null,
                {
                    checked: <TreeController.State.Config<boolean>>{
                        defaultValue: false,
                    },
                },
            );

            expect(state.keyConfigMap.checked?.defaultValue).toBe(false);
            expect(state.keyConfigMap.checked?.propagation).toBe('none');
            expect(state.keyConfigMap.checked?.selection).toBe('multi');
            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(undefined);
        })

        test('no tree, key=checked defaultValue=false, value=true root', () => {
            const state = new TreeController.State<any, S>(
                null,
                {
                    checked: <TreeController.State.Constructor.Params.Keys.KeyRecord<boolean>>{
                        defaultValue: false,
                        values: [
                            {
                                value: true,
                                nodes: [Tree1.root],
                            }
                        ]
                    },
                },
            );

            expect(state.keyConfigMap.checked?.defaultValue).toBe(false);
            expect(state.keyConfigMap.checked?.propagation).toBe('none');
            expect(state.keyConfigMap.checked?.selection).toBe('multi');
            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
        })

        test('tree=Tree1, key=checked defaultValue=false, value=true root, tree=Tree1', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(
                tree,
                {
                    checked: <TreeController.State.Constructor.Params.Keys.KeyRecord<boolean>>{
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
            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(false);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(false);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(false);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(false);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(false);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(false);
            expect(state.tree).toBe(tree);
        })

    })

    describe('setState', () => {

        test('root checked=true (without propagation)', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(tree);
            state.setState(Tree1.root, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('root checked=true (propagating down)', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(
                tree,
                {
                    checked: {
                        propagation: 'down',
                    }
                },
            );
            state.setState(Tree1.root, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(true);
        })

        test('brach checked=true (propagating down)', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(
                tree,
                {
                    checked: {
                        propagation: 'down',
                    }
                },
            );
            state.setState(Tree1.node_1, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('leaf checked=true (propagating down)', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(
                tree,
                {
                    checked: {
                        propagation: 'down',
                    }
                },
            );
            state.setState(Tree1.node_1_1, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('leaf checked=true (propagating up)', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(
                tree,
                {
                    checked: {
                        propagation: 'up',
                    }
                },
            );
            state.setState(Tree1.node_1_1, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('branch checked=true (propagating up)', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(
                tree,
                {
                    checked: {
                        propagation: 'up',
                    }
                },
            );
            state.setState(Tree1.node_1, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('root checked=true (propagating up)', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(
                tree,
                {
                    checked: {
                        propagation: 'up',
                    }
                },
            );
            state.setState(Tree1.root, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

    })

    describe('setWalkingNone', () => {

        test('root checked=true', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(tree);
            state.setWalkingNone(Tree1.root, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('branch checked=true', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(tree);
            state.setWalkingNone(Tree1.node_1, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('leaf checked=true', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(tree);
            state.setWalkingNone(Tree1.node_2_2, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(true);
        })

    })

    describe('setWalkingDown', () => {

        test('root checked=true', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(tree);
            state.setStateWalkingDown(Tree1.root, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(true);
        })

        test('branch checked=true', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(tree);
            state.setStateWalkingDown(Tree1.node_1, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('leaf checked=true', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(tree);
            state.setStateWalkingDown(Tree1.node_2_2, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(true);
        })

    })

    describe('setWalkingUp', () => {

        test('root checked=true', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(tree);
            state.setStateWalkingUp(Tree1.root, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('branch checked=true', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(tree);
            state.setStateWalkingUp(Tree1.node_1, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('leaf checked=true', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(tree);
            state.setStateWalkingUp(Tree1.node_2_2, 'checked', true);

            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(true);
        })

    })

    describe('$getState', () => {

        test('emits', async () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State<any, S>(tree);

            const value1 = await firstValueFrom(state.$getState(Tree1.root, 'checked'))
            expect(value1).toBe(undefined);

            state.setWalkingNone(Tree1.root, 'checked', true);
            const value2 = await firstValueFrom(state.$getState(Tree1.root, 'checked'))
            expect(value2).toBe(true);

            state.setWalkingNone(Tree1.root, 'checked', false);
            const value3 = await firstValueFrom(state.$getState(Tree1.root, 'checked'))
            expect(value3).toBe(false);

            console.log({ value1, value2, value3 })
        })
    })

})