import { BaseRenderer } from "./BaseRenderer";
import { createSvgElement, getNodeKey } from "../utils/svgHelpers";
import { createParentChildMap } from "../utils/treeFormatter";
import { ALL_DIRECTION_DIMENSIONS, SVG_NS } from "../constants";
import { ConnectionDrawer } from "../utils/ConnectionDrawer";
import { NodeDrawer } from "../utils/NodeDrawer";

/**
 * AllDirectionRenderer creates a radial tree layout where nodes spread out in all directions
 */
export class AllDirectionRenderer extends BaseRenderer {
  private centerX: number;
  private centerY: number;

  /**
   * Override constructor to calculate dynamic dimensions for all-direction layout
   */
  constructor(formattedTree: any, options = {}) {
    super(formattedTree, {
      ...options,
      horizontalGap: ALL_DIRECTION_DIMENSIONS.horizontalGap,
      verticalGap: ALL_DIRECTION_DIMENSIONS.verticalGap,
    });

    // Calculate dynamic dimensions based on tree depth and breadth
    const { svgWidth, svgHeight } = this.calculateDynamicDimensions();
    this.centerX = svgWidth / 2;
    this.centerY = svgHeight / 2;

    // Override SVG with calculated dimensions
    this.svg = createSvgElement(
      svgWidth,
      svgHeight,
      `0 0 ${svgWidth} ${svgHeight}`
    );

    // Reinitialize connection drawer with the new SVG
    this.connectionDrawer = new ConnectionDrawer(this.svg);

    // Reinitialize node drawer with the new SVG
    this.nodeDrawer = new NodeDrawer(this.svg);
  }

  /**
   * Calculate dynamic SVG dimensions based on tree structure
   */
  private calculateDynamicDimensions(): {
    svgWidth: number;
    svgHeight: number;
  } {
    const treeDepth = this.formattedTree.length;
    const nodeConfig = this.options.nodeConfig!;
    const boxWidth = nodeConfig.width!;
    const boxHeight = nodeConfig.height!;
    const { horizontalGap, verticalGap } = this.options;

    // Calculate the actual maximum distances we'll use
    const firstLevelHorizontalDistance = Math.min(
      140,
      ALL_DIRECTION_DIMENSIONS.horizontalGap
    );
    const firstLevelVerticalDistance = Math.min(
      120,
      ALL_DIRECTION_DIMENSIONS.verticalGap
    );
    const deeperLevelHorizontalDistance = Math.min(
      110,
      ALL_DIRECTION_DIMENSIONS.horizontalGap
    );
    const deeperLevelVerticalDistance = Math.min(
      90,
      ALL_DIRECTION_DIMENSIONS.verticalGap
    );

    // Calculate maximum extent from center in any direction
    let maxHorizontalExtent = firstLevelHorizontalDistance; // First level horizontal
    let maxVerticalExtent = firstLevelVerticalDistance; // First level vertical

    // Add distances for deeper levels
    if (treeDepth > 2) {
      maxHorizontalExtent += (treeDepth - 2) * deeperLevelHorizontalDistance;
      maxVerticalExtent += (treeDepth - 2) * deeperLevelVerticalDistance;
    }

    // Add half the node size to account for node dimensions
    maxHorizontalExtent += boxWidth / 2;
    maxVerticalExtent += boxHeight / 2;

    // Add generous padding to ensure no clipping
    const padding = 50;

    // Calculate required canvas size
    const requiredWidth = maxHorizontalExtent * 2 + padding;
    const requiredHeight = maxVerticalExtent * 2 + padding;

    // Use the larger of the calculated sizes to ensure everything fits
    const svgWidth = Math.max(400, requiredWidth);
    const svgHeight = Math.max(400, requiredHeight);

    return { svgWidth, svgHeight };
  }

  /**
   * Override node creation for radial layout
   */
  protected createNodes(): void {
    const nodeConfig = this.options.nodeConfig!;
    const boxWidth = nodeConfig.width!;
    const boxHeight = nodeConfig.height!;

    // Group nodes by their parent
    const parentToChildrenMap = createParentChildMap(this.formattedTree);

    // Process root node (level 0) first
    if (this.formattedTree.length > 0 && this.formattedTree[0].length > 0) {
      const rootNode = this.formattedTree[0][0];
      const rootX = this.centerX - boxWidth / 2;
      const rootY = this.centerY - boxHeight / 2;

      // Merge default nodeConfig with node-specific config (if provided)
      const effectiveNodeConfig = rootNode.nodeConfig
        ? { ...nodeConfig, ...rootNode.nodeConfig }
        : nodeConfig;

      // Use effective width and height (might be overridden by node-specific config)
      const effectiveWidth = effectiveNodeConfig.width || boxWidth;
      const effectiveHeight = effectiveNodeConfig.height || boxHeight;

      // Create root node using NodeDrawer
      const rootNodeResult = this.nodeDrawer.drawNode({
        type: effectiveNodeConfig.type,
        x: rootX,
        y: rootY,
        width: effectiveWidth,
        height: effectiveHeight,
        fill: effectiveNodeConfig.color,
        stroke: effectiveNodeConfig.borderColor,
        strokeWidth: effectiveNodeConfig.borderWidth,
        borderRadius: effectiveNodeConfig.borderRadius,
        text: rootNode.text,
        fontSize: effectiveNodeConfig.fontSize,
        fontColor: effectiveNodeConfig.fontColor,
        opacity: effectiveNodeConfig.opacity,
        shadow: effectiveNodeConfig.shadow,
        shadowColor: effectiveNodeConfig.shadowColor,
        shadowOffset: effectiveNodeConfig.shadowOffset,
        gradient: effectiveNodeConfig.gradient,
        gradientStartColor: effectiveNodeConfig.gradientStartColor,
        gradientEndColor: effectiveNodeConfig.gradientEndColor,
      });

      this.nodeMap[`0-0`] = {
        centerX: this.centerX,
        centerY: this.centerY,
        x: rootX,
        y: rootY,
        width: effectiveWidth,
        height: effectiveHeight,
      };
    }

    // Process first level children using a radial distribution
    if (this.formattedTree.length > 1) {
      const firstLevelParent = JSON.stringify({ level: 0, position: 0 });
      const firstLevelChildren = parentToChildrenMap[firstLevelParent] || [];
      const childCount = firstLevelChildren.length;

      // Distribute first level children in a circle
      firstLevelChildren.forEach((childInfo: any, index: number) => {
        const childNode =
          this.formattedTree[childInfo.level][childInfo.position];

        // Merge default nodeConfig with node-specific config (if provided)
        const effectiveNodeConfig = childNode.nodeConfig
          ? { ...nodeConfig, ...childNode.nodeConfig }
          : nodeConfig;

        // Use effective width and height (might be overridden by node-specific config)
        const effectiveWidth = effectiveNodeConfig.width || boxWidth;
        const effectiveHeight = effectiveNodeConfig.height || boxHeight;

        // Calculate angle (in radians)
        const angleStep = (2 * Math.PI) / childCount;
        const angle = index * angleStep;

        // Determine which spacing to use based on angle - balanced distances
        const isMoreHorizontal =
          Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle));
        const distance = isMoreHorizontal
          ? Math.min(140, ALL_DIRECTION_DIMENSIONS.horizontalGap) // Increased horizontal distance
          : Math.min(120, ALL_DIRECTION_DIMENSIONS.verticalGap); // Increased vertical distance

        // Calculate position
        const nodeX =
          this.centerX + Math.cos(angle) * distance - effectiveWidth / 2;
        const nodeY =
          this.centerY + Math.sin(angle) * distance - effectiveHeight / 2;

        // Create node using NodeDrawer
        const nodeResult = this.nodeDrawer.drawNode({
          type: effectiveNodeConfig.type,
          x: nodeX,
          y: nodeY,
          width: effectiveWidth,
          height: effectiveHeight,
          fill: effectiveNodeConfig.color,
          stroke: effectiveNodeConfig.borderColor,
          strokeWidth: effectiveNodeConfig.borderWidth,
          borderRadius: effectiveNodeConfig.borderRadius,
          text: childNode.text,
          fontSize: effectiveNodeConfig.fontSize,
          fontColor: effectiveNodeConfig.fontColor,
          opacity: effectiveNodeConfig.opacity,
          shadow: effectiveNodeConfig.shadow,
          shadowColor: effectiveNodeConfig.shadowColor,
          shadowOffset: effectiveNodeConfig.shadowOffset,
          gradient: effectiveNodeConfig.gradient,
          gradientStartColor: effectiveNodeConfig.gradientStartColor,
          gradientEndColor: effectiveNodeConfig.gradientEndColor,
        });

        // Store node data with direction
        const dirX = Math.cos(angle);
        const dirY = Math.sin(angle);

        this.nodeMap[getNodeKey(childInfo.level, childInfo.position)] = {
          centerX: nodeX + effectiveWidth / 2,
          centerY: nodeY + effectiveHeight / 2,
          x: nodeX,
          y: nodeY,
          width: effectiveWidth,
          height: effectiveHeight,
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

      level.forEach((node: any, nodeIndex: number) => {
        if (node.parent) {
          const parent = JSON.parse(node.parent);
          const parentKey = getNodeKey(parent.level, parent.position);
          const parentNode = this.nodeMap[parentKey];

          if (parentNode) {
            // Merge default nodeConfig with node-specific config (if provided)
            const effectiveNodeConfig = node.nodeConfig
              ? { ...nodeConfig, ...node.nodeConfig }
              : nodeConfig;

            // Use effective width and height (might be overridden by node-specific config)
            const effectiveWidth = effectiveNodeConfig.width || boxWidth;
            const effectiveHeight = effectiveNodeConfig.height || boxHeight;

            // Get parent's direction and angle
            const direction = parentNode.direction || { x: 0, y: 0 };
            const parentAngle = parentNode.angle || 0;

            // Find siblings
            const parentJsonStr = node.parent;
            const siblings = parentToChildrenMap[parentJsonStr] || [];
            const siblingCount = siblings.length;
            const siblingIndex = siblings.findIndex(
              (s: any) => s.level === levelIndex && s.position === nodeIndex
            );

            // Calculate child angle with fan effect for siblings
            let angle = parentAngle;

            if (siblingCount > 1) {
              // Fan siblings out slightly
              const fanAngle = Math.PI / 6; // 30 degrees total fan
              const fanStep = fanAngle / (siblingCount - 1);
              angle = parentAngle - fanAngle / 2 + siblingIndex * fanStep;
            }

            // Determine distance based on direction - balanced distances for better spacing
            const isMoreHorizontal =
              Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle));
            const distance = isMoreHorizontal
              ? Math.min(110, ALL_DIRECTION_DIMENSIONS.horizontalGap) // Increased horizontal distance
              : Math.min(90, ALL_DIRECTION_DIMENSIONS.verticalGap); // Increased vertical distance

            // Calculate position
            const dirX = Math.cos(angle);
            const dirY = Math.sin(angle);

            const nodeX = parentNode.x + dirX * distance;
            const nodeY = parentNode.y + dirY * distance;

            // Create node using NodeDrawer
            const nodeResult = this.nodeDrawer.drawNode({
              type: effectiveNodeConfig.type,
              x: nodeX,
              y: nodeY,
              width: effectiveWidth,
              height: effectiveHeight,
              fill: effectiveNodeConfig.color,
              stroke: effectiveNodeConfig.borderColor,
              strokeWidth: effectiveNodeConfig.borderWidth,
              borderRadius: effectiveNodeConfig.borderRadius,
              text: node.text,
              fontSize: effectiveNodeConfig.fontSize,
              fontColor: effectiveNodeConfig.fontColor,
              opacity: effectiveNodeConfig.opacity,
              shadow: effectiveNodeConfig.shadow,
              shadowColor: effectiveNodeConfig.shadowColor,
              shadowOffset: effectiveNodeConfig.shadowOffset,
              gradient: effectiveNodeConfig.gradient,
              gradientStartColor: effectiveNodeConfig.gradientStartColor,
              gradientEndColor: effectiveNodeConfig.gradientEndColor,
            });

            // Store node data
            this.nodeMap[getNodeKey(levelIndex, nodeIndex)] = {
              centerX: nodeX + effectiveWidth / 2,
              centerY: nodeY + effectiveHeight / 2,
              x: nodeX,
              y: nodeY,
              width: effectiveWidth,
              height: effectiveHeight,
              direction: { x: dirX, y: dirY },
              angle: angle,
            };
          }
        }
      });
    }
  }

  /**
   * Draw edges between nodes for all-direction tree with improved edge connection
   */
  protected drawConnections(): void {
    this.formattedTree.forEach((level: any, levelIndex: number) => {
      // Skip the root level (level 0)
      if (levelIndex === 0) return;

      level.forEach((node: any, nodeIndex: number) => {
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

            // Find intersection points with rectangles - improved calculation
            let parentConnectX, parentConnectY, childConnectX, childConnectY;
            const nodeConfig = this.options.nodeConfig!;
            const boxWidth = nodeConfig.width!;
            const boxHeight = nodeConfig.height!;

            // Calculate connection points on the edges of rectangles
            // For parent node - find where the line intersects the rectangle edge
            const parentHalfWidth = boxWidth / 2;
            const parentHalfHeight = boxHeight / 2;

            // Check which edge the line intersects
            const parentTx =
              Math.abs(normalizedVectorX) < 1e-10
                ? 1e10
                : parentHalfWidth / Math.abs(normalizedVectorX);
            const parentTy =
              Math.abs(normalizedVectorY) < 1e-10
                ? 1e10
                : parentHalfHeight / Math.abs(normalizedVectorY);

            if (parentTx < parentTy) {
              // Intersects vertical edge
              parentConnectX =
                parentCenterX +
                (normalizedVectorX > 0 ? parentHalfWidth : -parentHalfWidth);
              parentConnectY = parentCenterY + normalizedVectorY * parentTx;
            } else {
              // Intersects horizontal edge
              parentConnectX = parentCenterX + normalizedVectorX * parentTy;
              parentConnectY =
                parentCenterY +
                (normalizedVectorY > 0 ? parentHalfHeight : -parentHalfHeight);
            }

            // For child node - find where the line intersects the rectangle edge
            const childHalfWidth = boxWidth / 2;
            const childHalfHeight = boxHeight / 2;

            const childTx =
              Math.abs(normalizedVectorX) < 1e-10
                ? 1e10
                : childHalfWidth / Math.abs(normalizedVectorX);
            const childTy =
              Math.abs(normalizedVectorY) < 1e-10
                ? 1e10
                : childHalfHeight / Math.abs(normalizedVectorY);

            if (childTx < childTy) {
              // Intersects vertical edge
              childConnectX =
                childCenterX +
                (normalizedVectorX < 0 ? childHalfWidth : -childHalfWidth);
              childConnectY = childCenterY - normalizedVectorY * childTx;
            } else {
              // Intersects horizontal edge
              childConnectX = childCenterX - normalizedVectorX * childTy;
              childConnectY =
                childCenterY +
                (normalizedVectorY < 0 ? childHalfHeight : -childHalfHeight);
            }

            // Draw the connection using ConnectionDrawer
            this.connectionDrawer.drawConnection(
              { x: parentConnectX, y: parentConnectY },
              { x: childConnectX, y: childConnectY },
              {
                type: "direct", // Always use direct connections for AllDirectionRenderer (radial layout)
                color: this.options.edgeConfig!.color,
                width: this.options.edgeConfig!.width,
                dasharray: this.options.edgeConfig!.dasharray,
                showArrows: this.options.edgeConfig!.showArrows,
                arrowDirection: this.options.edgeConfig!.arrowDirection,
                arrowSize: this.options.edgeConfig!.arrowSize,
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
