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

    // Use the same approach as DirectRenderer but draw right-angle connections
    // and handle multiple children with horizontal connector lines

    // First, collect parent-child relationships to identify parents with multiple children
    const parentToChildren: {
      [parentKey: string]: Array<{
        levelIndex: number;
        nodeIndex: number;
        node: any;
      }>;
    } = {};

    this.formattedTree.forEach((level, levelIndex) => {
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

    // Now draw connections for each parent
    Object.keys(parentToChildren).forEach((parentKey) => {
      const children = parentToChildren[parentKey];
      const parentNode = this.nodeMap[parentKey];

      if (!parentNode || children.length === 0) return;

      if (children.length === 1) {
        // Single child - draw simple right-angle connection
        const child = children[0];
        const childKey = getNodeKey(child.levelIndex, child.nodeIndex);
        const childNode = this.nodeMap[childKey];

        if (childNode) {
          this.drawSingleChildConnection(
            parentNode,
            childNode,
            horizontalAlign
          );
        }
      } else {
        // Multiple children - draw horizontal connector line and individual connections
        this.drawMultipleChildrenConnections(
          parentNode,
          children,
          horizontalAlign,
          verticalGap
        );
      }
    });
  }

  private drawSingleChildConnection(
    parentNode: any,
    childNode: any,
    horizontalAlign: string
  ): void {
    const parentPoint = {
      x: parentNode.centerX!,
      y:
        horizontalAlign === "bottom-to-top"
          ? parentNode.topY!
          : parentNode.bottomY!,
    };

    const childPoint = {
      x: childNode.centerX!,
      y:
        horizontalAlign === "bottom-to-top"
          ? childNode.bottomY!
          : childNode.topY!,
    };

    // Use the new high-level method for cleaner three-segment right-angle connection
    this.connectionDrawer.drawThreeSegmentRightAngle(parentPoint, childPoint, {
      type: "right-angle",
      color: this.options.edgeConfig!.color,
      width: this.options.edgeConfig!.width,
      edgeText: childNode.node?.edgeText || undefined,
      textSize: this.options.edgeConfig!.textSize,
      textColor: this.options.edgeConfig!.textColor,
      showArrows: this.options.edgeConfig!.showArrows,
      arrowDirection: this.options.edgeConfig!.arrowDirection,
      arrowSize: this.options.edgeConfig!.arrowSize,
    });
  }

  private drawMultipleChildrenConnections(
    parentNode: any,
    children: any[],
    horizontalAlign: string,
    verticalGap: number
  ): void {
    // Get child nodes
    const childNodes = children
      .map((child) => {
        const childKey = getNodeKey(child.levelIndex, child.nodeIndex);
        return { ...child, nodeData: this.nodeMap[childKey] };
      })
      .filter((child) => child.nodeData);

    if (childNodes.length === 0) return;

    // Calculate connection points
    let parentY, childrenY, horizontalY;
    if (horizontalAlign === "bottom-to-top") {
      parentY = parentNode.topY!;
      childrenY = childNodes[0].nodeData.bottomY!;
      horizontalY = childrenY + verticalGap / 2;
    } else {
      parentY = parentNode.bottomY!;
      childrenY = childNodes[0].nodeData.topY!;
      horizontalY = childrenY - verticalGap / 2;
    }

    const parentPoint = { x: parentNode.centerX!, y: parentY };
    const childPoints = childNodes.map((child) => ({
      x: child.nodeData.centerX!,
      y: childrenY,
    }));

    // Use the new high-level method for multi-child connections (without text)
    this.connectionDrawer.drawMultiChildRightAngle(
      parentPoint,
      childPoints,
      horizontalY,
      {
        type: "right-angle",
        color: this.options.edgeConfig!.color,
        width: this.options.edgeConfig!.width,
        showArrows: this.options.edgeConfig!.showArrows,
        arrowDirection: this.options.edgeConfig!.arrowDirection,
        arrowSize: this.options.edgeConfig!.arrowSize,
      }
    );

    // Now add text to individual child connections using the dedicated method
    const childTexts = childNodes.map((child) => child.nodeData.node?.edgeText);
    this.connectionDrawer.drawChildConnectionsWithText(
      childPoints,
      horizontalY,
      childTexts,
      {
        type: "right-angle",
        color: this.options.edgeConfig!.color,
        width: this.options.edgeConfig!.width,
        textSize: this.options.edgeConfig!.textSize,
        textColor: this.options.edgeConfig!.textColor,
        textBackgroundColor: this.options.edgeConfig!.textBackgroundColor,
        showArrows: this.options.edgeConfig!.showArrows,
        arrowDirection: this.options.edgeConfig!.arrowDirection,
        arrowSize: this.options.edgeConfig!.arrowSize,
      }
    );
  }
}
