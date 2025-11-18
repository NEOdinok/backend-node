/*
    The task is to remove from the object tree all nodes
    where the Alive property is false. However, if a node
    has an Alive property that is true, all of its parents
    and children should remain in the tree.
    
    Extra:
    Perform the task using recursive and iterative algorithms,
    explain in which cases each one should be used, as well as
    the advantages and disadvantages of each approach.

    Tip:
    Think of it as a file structure.
*/

/*

const helperFunctionVisualExample = `
      F           F
     / \         /
    T  F        T

     F           F
    / \         / \
   T   F       T   F
      / \         /
     T   F       T
`;

*/

export class BaseNode {
  constructor(
    public id: number,
    public alive: boolean,
    public children: BaseNode[],
    public parent?: BaseNode
  ) {}
}

/** SOLUTION */
class NodeItem extends BaseNode {
  constructor(
    public id: number,
    public alive: boolean,
    public children: NodeItem[],
    public parent?: NodeItem
  ) {
    super(id, alive, children, parent);
  }
}

export function nodeCleaner(rootNode: NodeItem) {
  if (rootNode.alive) return;

  const cleanedChildren = rootNode.children.map((child) => nodeCleaner(child));
}
