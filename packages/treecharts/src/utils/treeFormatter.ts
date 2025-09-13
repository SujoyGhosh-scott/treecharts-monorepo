import { TreeNode, FormattedTree, NodePosition } from "../types";
import { getNodeKey } from "./svgHelpers";

/**
 * Converts a hierarchical tree structure into a level-by-level array representation
 * that's easier to render visually
 *
 * @param tree The hierarchical tree structure
 * @param options Optional formatting options including alignment
 * @returns A formatted representation of the tree organized by levels
 */
export function formatTree(
  tree: TreeNode,
  options?: { horizontalAlign?: string }
): FormattedTree {
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
        collapsibleState: node.tree.collapsibleState || undefined, // Include collapsible state if present
        // Image node properties
        imageUrl: node.tree.imageUrl || undefined,
        title: node.tree.title || undefined,
        subtitle: node.tree.subtitle || undefined,
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
          collapsibleState: node.tree.collapsibleState || undefined, // Include collapsible state if present
          // Image node properties
          imageUrl: node.tree.imageUrl || undefined,
          title: node.tree.title || undefined,
          subtitle: node.tree.subtitle || undefined,
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

  // If bottom-to-top alignment, reverse the levels and update parent references
  if (options?.horizontalAlign === "bottom-to-top") {
    return reverseTreeForBottomToTop(formattedTree);
  }

  return formattedTree;
}

/**
 * Reverses the tree structure for bottom-to-top alignment
 * This places the root at the bottom and children flowing upward
 */
function reverseTreeForBottomToTop(
  formattedTree: FormattedTree
): FormattedTree {
  // Reverse the order of levels
  const reversedTree = [...formattedTree].reverse();

  // Update parent references to match the new level indices
  const maxLevel = formattedTree.length - 1;

  reversedTree.forEach((level, newLevelIndex) => {
    level.forEach((node) => {
      if (node.parent) {
        const parentPos = JSON.parse(node.parent) as NodePosition;
        const newParentLevel = maxLevel - parentPos.level;

        // Update the parent reference to the new level index
        node.parent = JSON.stringify({
          level: newParentLevel,
          position: parentPos.position,
        });
      }
    });
  });

  return reversedTree;
}

/**
 * Creates a map of parent nodes to their child nodes for connection drawing
 * This is specifically useful for renderers that need to group children by parent
 *
 * @param formattedTree The formatted tree
 * @returns A map where keys are parent keys (level-position) and values are arrays of child node info
 */
export function createParentToChildrenMap(
  formattedTree: FormattedTree
): Record<string, Array<{ levelIndex: number; nodeIndex: number; node: any }>> {
  const parentToChildren: Record<
    string,
    Array<{ levelIndex: number; nodeIndex: number; node: any }>
  > = {};

  formattedTree.forEach((level, levelIndex) => {
    level.forEach((node, nodeIndex) => {
      if (node.parent) {
        const parent = JSON.parse(node.parent);
        const parentKey = getNodeKey(parent.level, parent.position);

        if (!parentToChildren[parentKey]) {
          parentToChildren[parentKey] = [];
        }
        parentToChildren[parentKey].push({ levelIndex, nodeIndex, node });
      }
    });
  });

  return parentToChildren;
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

/**
 * Calculate height offset for parent-child connections to avoid overlapping
 * Uses a repeating pattern to create visual distinction between connection levels
 *
 * @param parentIndex The global index of the parent (across all levels)
 * @param pattern Optional custom pattern array (defaults to [0, -10, 10, -20, 20, -5])
 * @returns Height offset in pixels
 */
export function calculateHeightOffset(
  parentIndex: number,
  pattern: number[] = [0, -10, 10, -20, 20, -5]
): number {
  return pattern[parentIndex % pattern.length];
}
