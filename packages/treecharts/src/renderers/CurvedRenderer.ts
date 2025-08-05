import { BaseRenderer } from "./BaseRenderer";
import { getNodeKey } from "../utils/svgHelpers";

/**
 * CurvedRenderer creates a tree with curved connections between nodes
 */
export class CurvedRenderer extends BaseRenderer {
  /**
   * Draw curved bezier connections between parent and child nodes
   */
  protected drawConnections(): void {
    const { horizontalAlign } = this.options;

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

            this.connectionDrawer.drawConnection(
              { x: x1, y: y1 },
              { x: x2, y: y2 },
              {
                type: "curved", // Always use curved connections for CurvedRenderer
                color: this.options.edgeConfig!.color,
                width: this.options.edgeConfig!.width,
                dasharray: this.options.edgeConfig!.dasharray,
                showArrows: this.options.edgeConfig!.showArrows,
                arrowDirection: this.options.edgeConfig!.arrowDirection,
                arrowSize: this.options.edgeConfig!.arrowSize,
                curveRadius: this.options.edgeConfig!.curveRadius,
                edgeText: node.edgeText || undefined,
                textSize: this.options.edgeConfig!.textSize,
                textColor: this.options.edgeConfig!.textColor,
                textBackgroundColor:
                  this.options.edgeConfig!.textBackgroundColor,
              }
            );
          }
        }
      });
    });
  }
}
