import { BaseRenderer } from "./BaseRenderer";
import { createLine, getNodeKey } from "../utils/svgHelpers";
import { createParentChildMap as buildParentChildMap } from "../utils/treeFormatter";

/**
 * RightAngleRenderer creates a tree with right-angle connections between nodes
 */
export class RightAngleRenderer extends BaseRenderer {
  /**
   * Draw right-angle connections between parent and child nodes
   */
  protected drawConnections(): void {
    const { lineColor, horizontalAlign, verticalGap, boxHeight } = this.options;

    // Build a map of parent to children
    const parentChildPair = buildParentChildMap(this.formattedTree);

    // Process each parent-child relationship
    Object.keys(parentChildPair).forEach((parentKey) => {
      const parent = JSON.parse(parentKey);
      const parentNodeKey = getNodeKey(parent.level, parent.position);
      const parentNode = this.nodeMap[parentNodeKey];
      const children = parentChildPair[parentKey];

      if (!parentNode || !children.length) return;

      if (children.length === 1) {
        // Single child - draw direct connection
        const child = children[0];
        const childNodeKey = getNodeKey(child.level, child.position);
        const childNode = this.nodeMap[childNodeKey];

        if (childNode) {
          const x1 = parentNode.centerX!;
          const x2 = childNode.centerX!;

          let y1, y2;
          if (horizontalAlign === "bottom-to-top") {
            // Parent is below child
            y1 = parentNode.topY!;
            y2 = childNode.bottomY!;
          } else {
            // Parent is above child
            y1 = parentNode.bottomY!;
            y2 = childNode.topY!;
          }

          createLine(this.svg, x1, y1, x2, y2, lineColor);
        }
      } else {
        // Multiple children - draw right angle connections
        // Find leftmost and rightmost children
        let leftmostPosition = Number.MAX_SAFE_INTEGER;
        let rightmostPosition = Number.MIN_SAFE_INTEGER;
        const level = children[0].level;

        children.forEach((child) => {
          leftmostPosition = Math.min(leftmostPosition, child.position);
          rightmostPosition = Math.max(rightmostPosition, child.position);
        });

        const leftmostChild = this.nodeMap[getNodeKey(level, leftmostPosition)];
        const rightmostChild =
          this.nodeMap[getNodeKey(level, rightmostPosition)];

        // Calculate horizontal line Y position
        let horizontalY: number;
        if (horizontalAlign === "bottom-to-top") {
          horizontalY = leftmostChild.bottomY! + verticalGap / 2;
        } else {
          horizontalY = leftmostChild.topY! - verticalGap / 2;
        }

        // Draw horizontal connector line
        createLine(
          this.svg,
          leftmostChild.centerX!,
          horizontalY,
          rightmostChild.centerX!,
          horizontalY,
          lineColor
        );

        // Draw vertical line from parent to horizontal line
        let parentY;
        if (horizontalAlign === "bottom-to-top") {
          parentY = parentNode.topY!;
        } else {
          parentY = parentNode.bottomY!;
        }

        createLine(
          this.svg,
          parentNode.centerX!,
          parentY,
          parentNode.centerX!,
          horizontalY,
          lineColor
        );

        // Draw vertical lines from horizontal line to each child
        children.forEach((child) => {
          const childNodeKey = getNodeKey(child.level, child.position);
          const childNode = this.nodeMap[childNodeKey];

          if (childNode) {
            let childY;
            if (horizontalAlign === "bottom-to-top") {
              childY = childNode.bottomY!;
            } else {
              childY = childNode.topY!;
            }

            createLine(
              this.svg,
              childNode.centerX!,
              horizontalY,
              childNode.centerX!,
              childY,
              lineColor
            );
          }
        });
      }
    });
  }
}
