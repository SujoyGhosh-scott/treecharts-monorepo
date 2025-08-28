import { BaseRenderer } from "./BaseRenderer";
import { getNodeKey } from "../utils/svgHelpers";
import { createParentChildMap } from "../utils/treeFormatter";

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
    const parentChildPair = createParentChildMap(this.formattedTree);

    // Group parents by their children's level to handle alternating offsets properly
    const parentsByChildLevel: { [childLevel: number]: string[] } = {};
    Object.keys(parentChildPair).forEach((parentKey) => {
      const children = parentChildPair[parentKey];
      if (children.length > 0) {
        // Consider ALL parents with children
        const childLevel = children[0].level;
        if (!parentsByChildLevel[childLevel]) {
          parentsByChildLevel[childLevel] = [];
        }
        parentsByChildLevel[childLevel].push(parentKey);
      }
    });

    // Create alternating offset map for each child level
    const alternatingOffsetMap: { [parentKey: string]: number } = {};
    const offsetIncrement = 10; // 10px offset for alternating lines

    Object.keys(parentsByChildLevel).forEach((childLevel) => {
      const parents = parentsByChildLevel[parseInt(childLevel)];
      parents.forEach((parentKey, index) => {
        // Alternate: 0, +10, -10, +20, -20, +30, -30, etc.
        const offsetMultiplier = Math.ceil((index + 1) / 2);
        const isPositive = index % 2 === 1;
        alternatingOffsetMap[parentKey] = isPositive
          ? offsetIncrement * offsetMultiplier
          : -offsetIncrement * offsetMultiplier;
        if (index === 0) alternatingOffsetMap[parentKey] = 0; // First parent gets no offset
      });
    });

    // Process each parent-child relationship
    Object.keys(parentChildPair).forEach((parentKey) => {
      const parent = JSON.parse(parentKey);
      const parentNodeKey = getNodeKey(parent.level, parent.position);
      const parentNode = this.nodeMap[parentNodeKey];
      const children = parentChildPair[parentKey];

      if (!parentNode || !children.length) return;

      if (children.length === 1) {
        // Single child - draw direct connection with alternating offset if needed
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

          // Check if we need alternating offset for single child (when other parents have children at same level)
          const alternatingOffset = alternatingOffsetMap[parentKey] || 0;
          if (alternatingOffset !== 0) {
            // Create a right-angle connection with offset to avoid overlapping with other parent-child connections
            const baseY =
              horizontalAlign === "bottom-to-top"
                ? y2 + verticalGap / 2
                : y2 - verticalGap / 2;
            const offsetY =
              horizontalAlign === "bottom-to-top"
                ? baseY - alternatingOffset
                : baseY + alternatingOffset;

            // Draw vertical line from parent
            this.connectionDrawer.drawConnection(
              { x: x1, y: y1 },
              { x: x1, y: offsetY },
              {
                type: "right-angle",
                color: this.options.edgeConfig!.color,
                width: this.options.edgeConfig!.width,
                dasharray: this.options.edgeConfig!.dasharray,
                // Only show arrows on parent-to-horizontal segment for target-to-source direction
                showArrows:
                  this.options.edgeConfig!.showArrows &&
                  (this.options.edgeConfig!.arrowDirection ===
                    "target-to-source" ||
                    this.options.edgeConfig!.arrowDirection === "both"),
                arrowDirection: this.options.edgeConfig!.arrowDirection,
                arrowSize: this.options.edgeConfig!.arrowSize,
              }
            );

            // Draw horizontal line
            this.connectionDrawer.drawConnection(
              { x: x1, y: offsetY },
              { x: x2, y: offsetY },
              {
                type: "right-angle",
                color: this.options.edgeConfig!.color,
                width: this.options.edgeConfig!.width,
                dasharray: this.options.edgeConfig!.dasharray,
              }
            );

            // Draw vertical line to child
            this.connectionDrawer.drawConnection(
              { x: x2, y: offsetY },
              { x: x2, y: y2 },
              {
                type: "right-angle",
                color: this.options.edgeConfig!.color,
                width: this.options.edgeConfig!.width,
                dasharray: this.options.edgeConfig!.dasharray,
                // Show arrows on horizontal-to-child segments for source-to-target direction
                showArrows:
                  this.options.edgeConfig!.showArrows &&
                  (this.options.edgeConfig!.arrowDirection ===
                    "source-to-target" ||
                    this.options.edgeConfig!.arrowDirection === "both"),
                arrowDirection: this.options.edgeConfig!.arrowDirection,
                arrowSize: this.options.edgeConfig!.arrowSize,
                edgeText: childNode.node?.edgeText || undefined,
                textSize: this.options.edgeConfig!.textSize,
                textColor: this.options.edgeConfig!.textColor,
                textBackgroundColor:
                  this.options.edgeConfig!.textBackgroundColor,
              }
            );
          } else {
            // Direct connection for first parent at this level
            this.connectionDrawer.drawConnection(
              { x: x1, y: y1 },
              { x: x2, y: y2 },
              {
                type: "right-angle",
                color: this.options.edgeConfig!.color,
                width: this.options.edgeConfig!.width,
                dasharray: this.options.edgeConfig!.dasharray,
                showArrows: this.options.edgeConfig!.showArrows,
                arrowDirection: this.options.edgeConfig!.arrowDirection,
                arrowSize: this.options.edgeConfig!.arrowSize,
                edgeText: childNode.node?.edgeText || undefined,
                textSize: this.options.edgeConfig!.textSize,
                textColor: this.options.edgeConfig!.textColor,
                textBackgroundColor:
                  this.options.edgeConfig!.textBackgroundColor,
              }
            );
          }
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

        // Calculate horizontal line Y position with alternating offset
        let baseHorizontalY: number;
        if (horizontalAlign === "bottom-to-top") {
          baseHorizontalY = leftmostChild.bottomY! + verticalGap / 2;
        } else {
          baseHorizontalY = leftmostChild.topY! - verticalGap / 2;
        }

        // Apply alternating offset to avoid overlapping horizontal connector lines
        const alternatingOffset = alternatingOffsetMap[parentKey] || 0;
        const horizontalY =
          horizontalAlign === "bottom-to-top"
            ? baseHorizontalY - alternatingOffset
            : baseHorizontalY + alternatingOffset;

        // Draw horizontal connector line
        this.connectionDrawer.drawConnection(
          { x: leftmostChild.centerX!, y: horizontalY },
          { x: rightmostChild.centerX!, y: horizontalY },
          {
            type: "right-angle", // Always use right-angle connections for RightAngleRenderer
            color: this.options.edgeConfig!.color,
            width: this.options.edgeConfig!.width,
            dasharray: this.options.edgeConfig!.dasharray,
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
            type: "right-angle", // Always use right-angle connections for RightAngleRenderer
            color: this.options.edgeConfig!.color,
            width: this.options.edgeConfig!.width,
            dasharray: this.options.edgeConfig!.dasharray,
            // Only show arrows on parent-to-horizontal segment for target-to-source direction
            showArrows:
              this.options.edgeConfig!.showArrows &&
              (this.options.edgeConfig!.arrowDirection === "target-to-source" ||
                this.options.edgeConfig!.arrowDirection === "both"),
            arrowDirection: this.options.edgeConfig!.arrowDirection,
            arrowSize: this.options.edgeConfig!.arrowSize,
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
                type: "right-angle", // Always use right-angle connections for RightAngleRenderer
                color: this.options.edgeConfig!.color,
                width: this.options.edgeConfig!.width,
                dasharray: this.options.edgeConfig!.dasharray,
              }
            );
          } else if (parentX > rightmostChild.centerX!) {
            // Extend right
            this.connectionDrawer.drawConnection(
              { x: rightmostChild.centerX!, y: horizontalY },
              { x: parentX, y: horizontalY },
              {
                type: "right-angle", // Always use right-angle connections for RightAngleRenderer
                color: this.options.edgeConfig!.color,
                width: this.options.edgeConfig!.width,
                dasharray: this.options.edgeConfig!.dasharray,
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
                type: "right-angle", // Always use right-angle connections for RightAngleRenderer
                color: this.options.edgeConfig!.color,
                width: this.options.edgeConfig!.width,
                dasharray: this.options.edgeConfig!.dasharray,
                // Show arrows on horizontal-to-child segments for source-to-target direction
                showArrows:
                  this.options.edgeConfig!.showArrows &&
                  (this.options.edgeConfig!.arrowDirection ===
                    "source-to-target" ||
                    this.options.edgeConfig!.arrowDirection === "both"),
                arrowDirection: this.options.edgeConfig!.arrowDirection,
                arrowSize: this.options.edgeConfig!.arrowSize,
                edgeText: childNode.node?.edgeText || undefined,
                textSize: this.options.edgeConfig!.textSize,
                textColor: this.options.edgeConfig!.textColor,
                textBackgroundColor:
                  this.options.edgeConfig!.textBackgroundColor,
              }
            );
          }
        });
      }
    });
  }
}
