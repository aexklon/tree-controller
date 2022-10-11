import { TreeController } from '../index';
import { Tree1 } from '../test-util';

describe('Tree Walker', () => {

    describe('walkDownSync', () => {

        test('leaf', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State(tree);
            TreeController.Walker.walkDownSyncSkipSelf(
                Tree1.node_2_2,
                tree,
                (node) => {
                    const nodeState = state.nodeStateMap.get(node);
                    nodeState.checked = true;
                }
            )
            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('branch', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State(tree);
            TreeController.Walker.walkDownSyncSkipSelf(
                Tree1.node_2,
                tree,
                (node) => {
                    const nodeState = state.nodeStateMap.get(node);
                    nodeState.checked = true;
                }
            )
            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(true);
        })

        test('root', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State(tree);
            TreeController.Walker.walkDownSyncSkipSelf(
                Tree1.root,
                tree,
                (node) => {
                    const nodeState = state.nodeStateMap.get(node);
                    nodeState.checked = true;
                }
            )
            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(true);
        })

    })

    describe('walkUpSync', () => {

        test('root', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State(tree);
            TreeController.Walker.walkUpSyncSkipSelf(
                Tree1.root,
                tree,
                (node) => {
                    const nodeState = state.nodeStateMap.get(node);
                    nodeState.checked = true;
                }
            )
            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('branch', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State(tree);
            TreeController.Walker.walkUpSyncSkipSelf(
                Tree1.node_1,
                tree,
                (node) => {
                    const nodeState = state.nodeStateMap.get(node);
                    nodeState.checked = true;
                }
            )
            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

        test('leaf', () => {
            const tree = new TreeController.Tree(Tree1.root);
            const state = new TreeController.State(tree);
            TreeController.Walker.walkUpSyncSkipSelf(
                Tree1.node_2_2,
                tree,
                (node) => {
                    const nodeState = state.nodeStateMap.get(node);
                    nodeState.checked = true;
                }
            )
            expect(state.nodeStateMap.get(Tree1.root)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2)?.checked).toBe(true);
            expect(state.nodeStateMap.get(Tree1.node_1_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_1_2)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_1)?.checked).toBe(undefined);
            expect(state.nodeStateMap.get(Tree1.node_2_2)?.checked).toBe(undefined);
        })

    })

})