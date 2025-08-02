import { BaseRenderer } from "./BaseRenderer";
import { getNodeKey } from "../utils/svgHelpers";
import { createParentChildMap as buildParentChildMap } from "../utils/treeFormatter";

/**
 * RightAngleRenderer creates a tree with right-angle connections between nodes
 */
export class RightAngleRenderer extends BaseRenderer {
  /**
   * Draw right-angle connections between parent and child nodes
   */
  protected drawConnections(): void {
    const { horizontalAlign, verticalGap } = this.options;

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

          this.connectionDrawer.drawConnection(
            { x: x1, y: y1 },
            { x: x2, y: y2 },
            {
              type: "direct",
              color: this.options.lineColor,
              width: this.options.lineWidth,
              dasharray: this.options.lineDasharray,
              showArrows: this.options.showArrows,
              arrowDirection: this.options.arrowDirection,
              arrowSize: this.options.arrowSize,
              edgeText: childNode.node?.edgeText || undefined,
              textSize: this.options.textSize,
              textColor: this.options.textColor,
              textBackgroundColor: this.options.textBackgroundColor,
            }
          );
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
        this.connectionDrawer.drawConnection(
          { x: leftmostChild.centerX!, y: horizontalY },
          { x: rightmostChild.centerX!, y: horizontalY },
          {
            type: "direct",
            color: this.options.lineColor,
            width: this.options.lineWidth,
            dasharray: this.options.lineDasharray,
          }
        );

        // Draw vertical line from parent to horizontal line
        let parentY;
        if (horizontalAlign === "bottom-to-top") {
          parentY = parentNode.topY!;
        } else {
          parentY = parentNode.bottomY!;
        }

        this.connectionDrawer.drawConnection(
          { x: parentNode.centerX!, y: parentY },
          { x: parentNode.centerX!, y: horizontalY },
          {
            type: "direct",
            color: this.options.lineColor,
            width: this.options.lineWidth,
            dasharray: this.options.lineDasharray,
            showArrows: this.options.showArrows,
            arrowDirection: this.options.arrowDirection,
            arrowSize: this.options.arrowSize,
          }
        );

        // Extend horizontal line to parent's vertical line if needed
        const parentX = parentNode.centerX!;
        if (
          parentX < leftmostChild.centerX! ||
          parentX > rightmostChild.centerX!
        ) {
          // Parent is outside the range of children, extend horizontal line
          const extendToX = Math.min(parentX, leftmostChild.centerX!);
          const extendFromX = Math.max(parentX, rightmostChild.centerX!);

          if (parentX < leftmostChild.centerX!) {
            // Extend left
            this.connectionDrawer.drawConnection(
              { x: parentX, y: horizontalY },
              { x: leftmostChild.centerX!, y: horizontalY },
              {
                type: "direct",
                color: this.options.lineColor,
                width: this.options.lineWidth,
                dasharray: this.options.lineDasharray,
              }
            );
          } else if (parentX > rightmostChild.centerX!) {
            // Extend right
            this.connectionDrawer.drawConnection(
              { x: rightmostChild.centerX!, y: horizontalY },
              { x: parentX, y: horizontalY },
              {
                type: "direct",
                color: this.options.lineColor,
                width: this.options.lineWidth,
                dasharray: this.options.lineDasharray,
              }
            );
          }
        }

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

            this.connectionDrawer.drawConnection(
              { x: childNode.centerX!, y: horizontalY },
              { x: childNode.centerX!, y: childY },
              {
                type: "direct",
                color: this.options.lineColor,
                width: this.options.lineWidth,
                dasharray: this.options.lineDasharray,
                edgeText: childNode.node?.edgeText || undefined,
                textSize: this.options.textSize,
                textColor: this.options.textColor,
                textBackgroundColor: this.options.textBackgroundColor,
              }
            );
          }
        });
      }
    });
  }
}
