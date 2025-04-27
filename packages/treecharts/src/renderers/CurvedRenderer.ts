import { BaseRenderer } from "./BaseRenderer";
import { getNodeKey, createCurvedPath } from "../utils/svgHelpers";

/**
 * CurvedRenderer creates a tree with curved connections between nodes
 */
export class CurvedRenderer extends BaseRenderer {
  /**
   * Draw curved bezier connections between parent and child nodes
   */
  protected drawConnections(): void {
    const { lineColor, horizontalAlign } = this.options;

    this.formattedTree.forEach((level, levelIndex) => {
      level.forEach((node, nodeIndex) => {
        if (node.parent) {
          const parent = JSON.parse(node.parent);
          const childKey = getNodeKey(levelIndex, nodeIndex);
          const parentKey = getNodeKey(parent.level, parent.position);

          const child = this.nodeMap[childKey];
          const parentNode = this.nodeMap[parentKey];

          if (child && parentNode) {
            // X values stay the same (center of each node)
            const x1 = parentNode.centerX!;
            const x2 = child.centerX!;

            let y1, y2;
            if (horizontalAlign === "bottom-to-top") {
              // Parent is visually below the child
              y1 = parentNode.topY!; // top of parent
              y2 = child.bottomY!; // bottom of child
            } else {
              // Default: top to bottom
              y1 = parentNode.bottomY!; // bottom of parent
              y2 = child.topY!; // top of child
            }

            // Create a curved path with 0.5 curvature
            createCurvedPath(this.svg, x1, y1, x2, y2, 0.5, lineColor);
          }
        }
      });
    });
  }
}
