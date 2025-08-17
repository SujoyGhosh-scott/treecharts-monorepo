import { SVG_NS, NODE_CONSTANTS } from "../constants";
import { FormattedTree, TreeChartOptions } from "../types";

/**
 * Creates an SVG element with the specified dimensions
 *
 * @param width Width of the SVG
 * @param height Height of the SVG
 * @param viewBox Optional viewBox attribute
 * @returns SVG element
 */
export function createSvgElement(
  width: number,
  height: number,
  viewBox?: string
): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("width", width.toString());
  svg.setAttribute("height", height.toString());

  if (viewBox) {
    svg.setAttribute("viewBox", viewBox);
  }

  return svg;
}

/**
 * Calculate width needed for the SVG based on tree data
 */
export function calculateSvgWidth(
  formattedTree: FormattedTree,
  options: any,
  nodeDrawer: any
): number {
  const { horizontalGap } = options;
  const basePadding = NODE_CONSTANTS.BASE_PADDING;
  const nodeConfig = options.nodeConfig!;
  const boxWidth = nodeConfig.width!;

  // Calculate the maximum width needed for any level
  let maxLevelWidth = 0;

  formattedTree.forEach((level) => {
    // Calculate actual node widths for this level
    const nodeWidths: number[] = [];
    level.forEach((node: any) => {
      const effectiveNodeConfig = node.nodeConfig
        ? { ...nodeConfig, ...node.nodeConfig }
        : nodeConfig;

      // Use actual node width based on type
      let actualWidth = effectiveNodeConfig.width || boxWidth;

      // For dynamic nodes, calculate their actual width
      if (
        effectiveNodeConfig.type === "node-with-description" ||
        effectiveNodeConfig.type === "collapsible-node" ||
        effectiveNodeConfig.type === "image"
      ) {
        actualWidth = nodeDrawer.calculateDynamicNodeWidth(
          node,
          effectiveNodeConfig
        );
      }

      nodeWidths.push(actualWidth);
    });

    // Calculate total level width with proper spacing
    const totalNodesWidth = nodeWidths.reduce((sum, width) => sum + width, 0);
    const totalGaps = (level.length - 1) * horizontalGap;
    const levelWidth = totalNodesWidth + totalGaps;

    maxLevelWidth = Math.max(maxLevelWidth, levelWidth);
  });

  return maxLevelWidth + basePadding * 2;
}

/**
 * Calculate height needed for the SVG based on tree data
 */
export function calculateSvgHeight(
  formattedTree: FormattedTree,
  options: any,
  nodeDrawer: any,
  titleSpace: { top: number; bottom: number }
): number {
  const boxHeight = options.nodeConfig!.height!;
  const { verticalGap } = options;
  const basePadding = NODE_CONSTANTS.BASE_PADDING;

  // Calculate actual heights for each level
  let totalHeight = 0;
  formattedTree.forEach((level, levelIndex) => {
    let maxHeightInLevel = boxHeight;

    level.forEach((node: any) => {
      const effectiveNodeConfig = node.nodeConfig
        ? { ...options.nodeConfig!, ...node.nodeConfig }
        : options.nodeConfig!;

      // Calculate dynamic height for nodes that need it
      if (
        effectiveNodeConfig.type === "node-with-description" ||
        effectiveNodeConfig.type === "collapsible-node" ||
        effectiveNodeConfig.type === "image"
      ) {
        const dynamicHeight = nodeDrawer.calculateDynamicNodeHeight(
          node,
          effectiveNodeConfig
        );
        maxHeightInLevel = Math.max(maxHeightInLevel, dynamicHeight);
      }
    });

    totalHeight += maxHeightInLevel;
    if (levelIndex < formattedTree.length - 1) {
      totalHeight += verticalGap;
    }
  });

  const baseHeight = totalHeight + basePadding * 2;
  return baseHeight + titleSpace.top + titleSpace.bottom;
}

/**
 * Utility to get node map key from level and position
 *
 * @param level Level in the tree
 * @param position Position within the level
 * @returns String key for the node map
 */
export function getNodeKey(level: number, position: number): string {
  return `${level}-${position}`;
}

/**
 * Export utility functions
 */
export const svgHelpers = {
  createSvgElement,
  getNodeKey,
  calculateSvgWidth,
  calculateSvgHeight,
};
