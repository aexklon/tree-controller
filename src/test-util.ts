const nodeFactory = (id: string, parent: any) => {
    const children: any[] = [];
    const node = { id, children  };
    if (parent) parent.children.push(node);
    return node;
}

export namespace Tree1 {
    export const root = nodeFactory('Bike', null);
    export const node_1 = nodeFactory('Body', root);
    export const node_1_1 = nodeFactory('Handlebar', node_1);
    export const node_1_2 = nodeFactory('Chassi', node_1);
    export const node_2 = nodeFactory('Wheel', root);
    export const node_2_1 = nodeFactory('Rim', node_2);
    export const node_2_2 = nodeFactory('Tire', node_2);
}