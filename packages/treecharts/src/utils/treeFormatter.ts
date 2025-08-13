import { TreeNode, FormattedTree, NodePosition } from "../types";

/**
 * Converts a hierarchical tree structure into a level-by-level array representation
 * that's easier to render visually
 *
 * @param tree The hierarchical tree structure
 * @returns A formatted representation of the tree organized by levels
 */
export function formatTree(tree: TreeNode): FormattedTree {
  const formattedTree: FormattedTree = [];
  const stack: Array<{
    level: number;
    parent?: NodePosition;
    tree: TreeNode;
  }> = [];

  // Start with the root node
  stack.push({ level: 0, tree });

  while (stack.length > 0) {
    const node = stack.pop()!;
    let position = 0;

    // Add the node to its level in the formatted tree
    if (formattedTree.length > node.level) {
      // Add to existing level
      position = formattedTree[node.level].length;
      formattedTree[node.level].push({
        text: node.tree.value,
        description: node.tree.description || undefined, // Include description if present
        parent: node.parent ? JSON.stringify(node.parent) : null,
        edgeText: node.tree.edgeText || null, // Preserve edge text if present
        nodeConfig: node.tree.nodeConfig || undefined, // Preserve node-specific config if present
      });
    } else {
      // Create a new level
      formattedTree.push([
        {
          text: node.tree.value,
          description: node.tree.description || undefined, // Include description if present
          parent: node.parent ? JSON.stringify(node.parent) : null,
          edgeText: node.tree.edgeText || null, // Preserve edge text if present
          nodeConfig: node.tree.nodeConfig || undefined, // Preserve node-specific config if present
        },
      ]);
    }

    // Process children (if any)
    if (node.tree.child && node.tree.child.length) {
      // We need to process the nodes in reverse order for the desired display order
      // since we're using unshift to add to the beginning of the stack
      for (let i = node.tree.child.length - 1; i >= 0; i--) {
        const childNode = node.tree.child[i];
        stack.push({
          level: node.level + 1,
          parent: { level: node.level, position },
          tree: childNode,
        });
      }
    }
  }

  return formattedTree;
}

/**
 * Creates a map of parent nodes to their child nodes
 *
 * @param formattedTree The formatted tree
 * @returns A map of parent positions to child positions
 */
export function createParentChildMap(
  formattedTree: FormattedTree
): Record<string, Array<NodePosition>> {
  const parentChildPair: Record<string, Array<NodePosition>> = {};

  // Start from level 1 (skip root level)
  for (let i = 1; i < formattedTree.length; i++) {
    for (let j = 0; j < formattedTree[i].length; j++) {
      const node = formattedTree[i][j];

      if (node.parent) {
        if (parentChildPair[node.parent]) {
          parentChildPair[node.parent].push({ level: i, position: j });
        } else {
          parentChildPair[node.parent] = [{ level: i, position: j }];
        }
      }
    }
  }

  return parentChildPair;
}
