import { BaseRenderer } from "./BaseRenderer";
import {
  createSvgElement,
  createNode,
  createLine,
  getNodeKey,
} from "../utils/svgHelpers";
import { createParentChildMap } from "../utils/treeFormatter";
import { ALL_DIRECTION_DIMENSIONS, SVG_NS } from "../constants";

/**
 * AllDirectionRenderer creates a radial tree layout where nodes spread out in all directions
 */
export class AllDirectionRenderer extends BaseRenderer {
  /**
   * Override constructor to use fixed dimensions for all-direction layout
   */
  constructor(formattedTree: any, options = {}) {
    super(formattedTree, {
      ...options,
      horizontalGap: ALL_DIRECTION_DIMENSIONS.horizontalGap,
      verticalGap: ALL_DIRECTION_DIMENSIONS.verticalGap,
    });

    // Override SVG with fixed dimensions
    this.svg = createSvgElement(
      ALL_DIRECTION_DIMENSIONS.svgWidth,
      ALL_DIRECTION_DIMENSIONS.svgHeight,
      `0 0 ${ALL_DIRECTION_DIMENSIONS.svgWidth} ${ALL_DIRECTION_DIMENSIONS.svgHeight}`
    );
  }

  /**
   * Override node creation for radial layout
   */
  protected createNodes(): void {
    const {
      boxWidth,
      boxHeight,
      nodeColor,
      nodeBorderColor,
      nodeBorderRadius,
      fontSize,
      fontColor,
    } = this.options;

    // Center coordinates
    const centerX = ALL_DIRECTION_DIMENSIONS.svgWidth / 2;
    const centerY = ALL_DIRECTION_DIMENSIONS.svgHeight / 2;

    // Group nodes by their parent
    const parentToChildrenMap = createParentChildMap(this.formattedTree);

    // Process root node (level 0) first
    if (this.formattedTree.length > 0 && this.formattedTree[0].length > 0) {
      const rootNode = this.formattedTree[0][0];
      const rootX = centerX - boxWidth / 2;
      const rootY = centerY - boxHeight / 2;

      // Create root node
      const rect = document.createElementNS(SVG_NS, "rect");
      rect.setAttribute("x", rootX.toString());
      rect.setAttribute("y", rootY.toString());
      rect.setAttribute("width", boxWidth.toString());
      rect.setAttribute("height", boxHeight.toString());
      rect.setAttribute("fill", nodeColor);
      rect.setAttribute("stroke", nodeBorderColor);

      if (nodeBorderRadius > 0) {
        rect.setAttribute("rx", nodeBorderRadius.toString());
      }

      this.svg.appendChild(rect);

      const text = document.createElementNS(SVG_NS, "text");
      text.setAttribute("x", centerX.toString());
      text.setAttribute("y", (centerY + 5).toString());
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", fontSize.toString());
      text.setAttribute("fill", fontColor);
      text.textContent = rootNode.text;
      this.svg.appendChild(text);

      this.nodeMap[`0-0`] = {
        centerX: centerX,
        centerY: centerY,
        x: rootX,
        y: rootY,
        width: boxWidth,
        height: boxHeight,
      };
    }

    // Process first level children using a radial distribution
    if (this.formattedTree.length > 1) {
      const firstLevelParent = JSON.stringify({ level: 0, position: 0 });
      const firstLevelChildren = parentToChildrenMap[firstLevelParent] || [];
      const childCount = firstLevelChildren.length;

      // Distribute first level children in a circle
      firstLevelChildren.forEach((childInfo, index) => {
        // Calculate angle (in radians)
        const angleStep = (2 * Math.PI) / childCount;
        const angle = index * angleStep;

        // Determine which spacing to use based on angle
        const isMoreHorizontal =
          Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle));
        const distance = isMoreHorizontal
          ? ALL_DIRECTION_DIMENSIONS.horizontalGap
          : ALL_DIRECTION_DIMENSIONS.verticalGap;

        // Calculate position
        const nodeX = centerX + Math.cos(angle) * distance - boxWidth / 2;
        const nodeY = centerY + Math.sin(angle) * distance - boxHeight / 2;

        // Create node
        const rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttribute("x", nodeX.toString());
        rect.setAttribute("y", nodeY.toString());
        rect.setAttribute("width", boxWidth.toString());
        rect.setAttribute("height", boxHeight.toString());
        rect.setAttribute("fill", nodeColor);
        rect.setAttribute("stroke", nodeBorderColor);

        if (nodeBorderRadius > 0) {
          rect.setAttribute("rx", nodeBorderRadius.toString());
        }

        this.svg.appendChild(rect);

        const text = document.createElementNS(SVG_NS, "text");
        text.setAttribute("x", (nodeX + boxWidth / 2).toString());
        text.setAttribute("y", (nodeY + boxHeight / 2 + 5).toString());
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-size", fontSize.toString());
        text.setAttribute("fill", fontColor);
        text.textContent =
          this.formattedTree[childInfo.level][childInfo.position].text;
        this.svg.appendChild(text);

        // Store node data with direction
        const dirX = Math.cos(angle);
        const dirY = Math.sin(angle);

        this.nodeMap[getNodeKey(childInfo.level, childInfo.position)] = {
          centerX: nodeX + boxWidth / 2,
          centerY: nodeY + boxHeight / 2,
          x: nodeX,
          y: nodeY,
          width: boxWidth,
          height: boxHeight,
          direction: { x: dirX, y: dirY },
          angle: angle,
        };
      });
    }

    // Process remaining levels - continue in the same general direction as the parent
    for (
      let levelIndex = 2;
      levelIndex < this.formattedTree.length;
      levelIndex++
    ) {
      const level = this.formattedTree[levelIndex];

      level.forEach((node, nodeIndex) => {
        if (node.parent) {
          const parent = JSON.parse(node.parent);
          const parentKey = getNodeKey(parent.level, parent.position);
          const parentNode = this.nodeMap[parentKey];

          if (parentNode) {
            // Get parent's direction and angle
            const direction = parentNode.direction || { x: 0, y: 0 };
            const parentAngle = parentNode.angle || 0;

            // Find siblings
            const parentJsonStr = node.parent;
            const siblings = parentToChildrenMap[parentJsonStr] || [];
            const siblingCount = siblings.length;
            const siblingIndex = siblings.findIndex(
              (s) => s.level === levelIndex && s.position === nodeIndex
            );

            // Calculate child angle with fan effect for siblings
            let angle = parentAngle;

            if (siblingCount > 1) {
              // Fan siblings out slightly
              const fanAngle = Math.PI / 6; // 30 degrees total fan
              const fanStep = fanAngle / (siblingCount - 1);
              angle = parentAngle - fanAngle / 2 + siblingIndex * fanStep;
            }

            // Determine distance based on direction
            const isMoreHorizontal =
              Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle));
            const distance = isMoreHorizontal
              ? ALL_DIRECTION_DIMENSIONS.horizontalGap
              : ALL_DIRECTION_DIMENSIONS.verticalGap;

            // Calculate position
            const dirX = Math.cos(angle);
            const dirY = Math.sin(angle);

            const nodeX = parentNode.x + dirX * distance;
            const nodeY = parentNode.y + dirY * distance;

            // Create node
            const rect = document.createElementNS(SVG_NS, "rect");
            rect.setAttribute("x", nodeX.toString());
            rect.setAttribute("y", nodeY.toString());
            rect.setAttribute("width", boxWidth.toString());
            rect.setAttribute("height", boxHeight.toString());
            rect.setAttribute("fill", nodeColor);
            rect.setAttribute("stroke", nodeBorderColor);

            if (nodeBorderRadius > 0) {
              rect.setAttribute("rx", nodeBorderRadius.toString());
            }

            this.svg.appendChild(rect);

            const text = document.createElementNS(SVG_NS, "text");
            text.setAttribute("x", (nodeX + boxWidth / 2).toString());
            text.setAttribute("y", (nodeY + boxHeight / 2 + 5).toString());
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", fontSize.toString());
            text.setAttribute("fill", fontColor);
            text.textContent = node.text;
            this.svg.appendChild(text);

            // Store node data
            this.nodeMap[getNodeKey(levelIndex, nodeIndex)] = {
              centerX: nodeX + boxWidth / 2,
              centerY: nodeY + boxHeight / 2,
              x: nodeX,
              y: nodeY,
              width: boxWidth,
              height: boxHeight,
              direction: { x: dirX, y: dirY },
              angle: angle,
            };
          }
        }
      });
    }
  }

  /**
   * Draw edges between nodes for all-direction tree
   */
  protected drawConnections(): void {
    const { lineColor } = this.options;

    this.formattedTree.forEach((level, levelIndex) => {
      // Skip the root level (level 0)
      if (levelIndex === 0) return;

      level.forEach((node, nodeIndex) => {
        if (node.parent) {
          const parent = JSON.parse(node.parent);
          const childKey = getNodeKey(levelIndex, nodeIndex);
          const parentKey = getNodeKey(parent.level, parent.position);

          const childNode = this.nodeMap[childKey];
          const parentNode = this.nodeMap[parentKey];

          if (childNode && parentNode) {
            // Calculate edge-to-edge connection points
            const childCenterX = childNode.centerX!;
            const childCenterY = childNode.centerY!;
            const parentCenterX = parentNode.centerX!;
            const parentCenterY = parentNode.centerY!;

            // Vector from parent to child
            const vectorX = childCenterX - parentCenterX;
            const vectorY = childCenterY - parentCenterY;
            const length = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
            const normalizedVectorX = vectorX / length;
            const normalizedVectorY = vectorY / length;

            // Find intersection points with rectangles
            let parentConnectX, parentConnectY, childConnectX, childConnectY;
            const boxWidth = this.options.boxWidth;
            const boxHeight = this.options.boxHeight;

            // For parent node
            if (Math.abs(normalizedVectorX) > Math.abs(normalizedVectorY)) {
              // Horizontal predominant direction
              parentConnectX =
                parentCenterX +
                (normalizedVectorX > 0 ? boxWidth / 2 : -boxWidth / 2);
              parentConnectY =
                parentCenterY +
                (normalizedVectorY * (boxWidth / 2)) /
                  Math.abs(normalizedVectorX);
            } else {
              // Vertical predominant direction
              parentConnectX =
                parentCenterX +
                (normalizedVectorX * (boxHeight / 2)) /
                  Math.abs(normalizedVectorY);
              parentConnectY =
                parentCenterY +
                (normalizedVectorY > 0 ? boxHeight / 2 : -boxHeight / 2);
            }

            // For child node
            if (Math.abs(normalizedVectorX) > Math.abs(normalizedVectorY)) {
              // Horizontal predominant direction
              childConnectX =
                childCenterX +
                (normalizedVectorX < 0 ? boxWidth / 2 : -boxWidth / 2);
              childConnectY =
                childCenterY +
                (normalizedVectorY * (boxWidth / 2)) /
                  Math.abs(normalizedVectorX);
            } else {
              // Vertical predominant direction
              childConnectX =
                childCenterX +
                (normalizedVectorX * (boxHeight / 2)) /
                  Math.abs(normalizedVectorY);
              childConnectY =
                childCenterY +
                (normalizedVectorY < 0 ? boxHeight / 2 : -boxHeight / 2);
            }

            // Draw the connection
            createLine(
              this.svg,
              parentConnectX,
              parentConnectY,
              childConnectX,
              childConnectY,
              lineColor
            );
          }
        }
      });
    });
  }
}
