import { TreeController } from '../index';
import { Tree1 } from '../test-util';

describe('Tree', () => {

    describe('nodes', () => {

        test('default', () => {
            const tree = new TreeController.Tree(Tree1.root);
            expect(tree.root).toBe(Tree1.root);
            expect(tree.nodes[0]).toBe(Tree1.root);
            expect(tree.nodes[1]).toBe(Tree1.node_1);
            expect(tree.nodes[2]).toBe(Tree1.node_2);
            expect(tree.nodes[3]).toBe(Tree1.node_1_1);
            expect(tree.nodes[4]).toBe(Tree1.node_1_2);
            expect(tree.nodes[5]).toBe(Tree1.node_2_1);
            expect(tree.nodes[6]).toBe(Tree1.node_2_2);
        });

        test('custom', () => {
            const fillNodesArray = (instance: TreeController.Tree) => {
                const nodes = [instance.root];
                function pushChildren(node: any) {
                    node.children.forEach((child: any) => {
                        nodes.push(child);
                        pushChildren(child);
                    })
                }
                pushChildren(instance.root);
                return nodes;
            }
            const tree = new TreeController.Tree(Tree1.root, {
                fillNodesArray,
            });
            expect(tree.root).toBe(Tree1.root);
            expect(tree.nodes[0]).toBe(Tree1.root);
            expect(tree.nodes[1]).toBe(Tree1.node_1);
            expect(tree.nodes[2]).toBe(Tree1.node_1_1);
            expect(tree.nodes[3]).toBe(Tree1.node_1_2);
            expect(tree.nodes[4]).toBe(Tree1.node_2);
            expect(tree.nodes[5]).toBe(Tree1.node_2_1);
            expect(tree.nodes[6]).toBe(Tree1.node_2_2);
        });

    })

    describe('method node', () => {

        test('default', () => {
            const tree = new TreeController.Tree(Tree1.root);
            expect(tree.node(Tree1.root)).toBe(Tree1.root);
            expect(tree.node(Tree1.node_1)).toBe(Tree1.node_1);
            expect(tree.node(Tree1.node_1_1)).toBe(Tree1.node_1_1);
            expect(tree.node(Tree1.node_1_2)).toBe(Tree1.node_1_2);
            expect(tree.node(Tree1.node_2)).toBe(Tree1.node_2);
            expect(tree.node(Tree1.node_2_1)).toBe(Tree1.node_2_1);
            expect(tree.node(Tree1.node_2_2)).toBe(Tree1.node_2_2);
        })
    
        test('custom', () => {
            const dummy = { id: 'dummy', children: [] };
            const tree = new TreeController.Tree(Tree1.root, {
                node: () => (node) => dummy,
            });
            expect(tree.node(Tree1.root)).toBe(dummy);
            expect(tree.node(Tree1.node_1)).toBe(dummy);
            expect(tree.node(Tree1.node_1_1)).toBe(dummy);
            expect(tree.node(Tree1.node_1_2)).toBe(dummy);
            expect(tree.node(Tree1.node_2)).toBe(dummy);
            expect(tree.node(Tree1.node_2_1)).toBe(dummy);
            expect(tree.node(Tree1.node_2_2)).toBe(dummy);
        })

    })

    describe('method children', () => {

        test('default', () => {
            const tree = new TreeController.Tree(Tree1.root);
            expect(tree.children(Tree1.root)).toBe(Tree1.root.children);
            expect(tree.children(Tree1.node_1)).toBe(Tree1.node_1.children);
            expect(tree.children(Tree1.node_1_1)).toBe(Tree1.node_1_1.children);
            expect(tree.children(Tree1.node_1_2)).toBe(Tree1.node_1_2.children);
            expect(tree.children(Tree1.node_2)).toBe(Tree1.node_2.children);
            expect(tree.children(Tree1.node_2_1)).toBe(Tree1.node_2_1.children);
            expect(tree.children(Tree1.node_2_2)).toBe(Tree1.node_2_2.children);
        })
    
        test('custom', () => {
            const tree = new TreeController.Tree(Tree1.root, {
                children: () => (node) => node.children,
            });
            expect(tree.root).toBe(Tree1.root);
            expect(tree.children(Tree1.root)).toBe(Tree1.root.children);
            expect(tree.children(Tree1.node_1)).toBe(Tree1.node_1.children);
            expect(tree.children(Tree1.node_1_1)).toBe(Tree1.node_1_1.children);
            expect(tree.children(Tree1.node_1_2)).toBe(Tree1.node_1_2.children);
            expect(tree.children(Tree1.node_2)).toBe(Tree1.node_2.children);
            expect(tree.children(Tree1.node_2_1)).toBe(Tree1.node_2_1.children);
            expect(tree.children(Tree1.node_2_2)).toBe(Tree1.node_2_2.children);
        })

    })

    describe('method parent', () => {
        
        test('default', () => {
            const tree = new TreeController.Tree(Tree1.root);
            expect(tree.parent(Tree1.root)).toBe(undefined);
            expect(tree.parent(Tree1.node_1)).toBe(Tree1.root);
            expect(tree.parent(Tree1.node_1_1)).toBe(Tree1.node_1);
            expect(tree.parent(Tree1.node_1_2)).toBe(Tree1.node_1);
            expect(tree.parent(Tree1.node_2)).toBe(Tree1.root);
            expect(tree.parent(Tree1.node_2_1)).toBe(Tree1.node_2);
            expect(tree.parent(Tree1.node_2_2)).toBe(Tree1.node_2);
        })
    
        test('custom', () => {
            const parentMap = new Map([
                [Tree1.root, null],
                [Tree1.node_1, Tree1.root],
                [Tree1.node_1_1, Tree1.node_1],
                [Tree1.node_1_2, Tree1.node_1],
                [Tree1.node_2, Tree1.root],
                [Tree1.node_2_1, Tree1.node_2],
                [Tree1.node_2_2, Tree1.node_2],
            ])
            const tree = new TreeController.Tree(Tree1.root, {
                parent: () => (node: any) => parentMap.get(node),
            });
            expect(tree.parent(Tree1.root)).toBe(null);
            expect(tree.parent(Tree1.node_1)).toBe(Tree1.root);
            expect(tree.parent(Tree1.node_1_1)).toBe(Tree1.node_1);
            expect(tree.parent(Tree1.node_1_2)).toBe(Tree1.node_1);
            expect(tree.parent(Tree1.node_2)).toBe(Tree1.root);
            expect(tree.parent(Tree1.node_2_1)).toBe(Tree1.node_2);
            expect(tree.parent(Tree1.node_2_2)).toBe(Tree1.node_2);
        })

    })

})