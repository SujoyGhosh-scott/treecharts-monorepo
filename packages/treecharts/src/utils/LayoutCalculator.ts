import { NODE_CONSTANTS } from "../constants";
import { NodeLayoutPosition, LevelLayout, TreeLayout } from "../types";
import { calculateSvgWidth, calculateSvgHeight } from "./svgHelpers";
import { NodeDrawer } from "./NodeDrawer";
import { TitleDrawer } from "./TitleDrawer";

export class LayoutCalculator {
  constructor(
    private formattedTree: any[][],
    private options: any,
    private nodeDrawer: NodeDrawer,
    private titleDrawer: TitleDrawer
  ) {}

  /**
   * Calculate the complete layout for the tree
   */
  public calculateTreeLayout(): TreeLayout {
    const { verticalAlign, horizontalGap, verticalGap, horizontalAlign } =
      this.options;
    const nodeConfig = this.options.nodeConfig!;
    const boxWidth = nodeConfig.width!;
    const boxHeight = nodeConfig.height!;
    const basePadding = NODE_CONSTANTS.BASE_PADDING;

    const totalWidth = calculateSvgWidth(
      this.formattedTree,
      this.options,
      this.nodeDrawer
    );
    const titleSpace = this.titleDrawer.calculateTitleSpace();
    const totalHeight = calculateSvgHeight(
      this.formattedTree,
      this.options,
      this.nodeDrawer,
      titleSpace
    );
    const yOffset = titleSpace.top + basePadding;

    // Calculate layouts for all levels
    const levels = this.calculateLevelLayouts(
      totalWidth,
      totalHeight,
      yOffset,
      basePadding,
      boxWidth,
      boxHeight,
      horizontalGap,
      verticalGap,
      verticalAlign,
      horizontalAlign,
      titleSpace,
      nodeConfig
    );

    return {
      levels,
      totalWidth,
      totalHeight,
      yOffset,
    };
  }

  /**
   * Calculate layouts for all levels in the tree
   */
  private calculateLevelLayouts(
    totalWidth: number,
    totalHeight: number,
    yOffset: number,
    basePadding: number,
    boxWidth: number,
    boxHeight: number,
    horizontalGap: number,
    verticalGap: number,
    verticalAlign: string,
    horizontalAlign: string,
    titleSpace: any,
    nodeConfig: any
  ): LevelLayout[] {
    // First pass: calculate heights and node data for each level
    const levelHeights: number[] = [];
    const levelNodeData: Array<Array<any>> = [];

    this.formattedTree.forEach((level, levelIndex) => {
      const { maxHeightInLevel, nodeData } = this.calculateLevelNodeData(
        level,
        levelIndex,
        nodeConfig,
        boxWidth,
        boxHeight,
        horizontalGap,
        totalWidth,
        basePadding,
        verticalAlign
      );

      levelHeights.push(maxHeightInLevel);
      levelNodeData.push(nodeData);
    });

    // Second pass: create final layouts with Y positions
    return this.createFinalLayouts(
      levelNodeData,
      levelHeights,
      yOffset,
      verticalGap,
      horizontalAlign,
      totalHeight,
      titleSpace,
      basePadding
    );
  }

  /**
   * Calculate node data and maximum height for a single level
   */
  private calculateLevelNodeData(
    level: any[],
    levelIndex: number,
    nodeConfig: any,
    boxWidth: number,
    boxHeight: number,
    horizontalGap: number,
    totalWidth: number,
    basePadding: number,
    verticalAlign: string
  ) {
    let maxHeightInLevel = boxHeight;

    // Calculate actual node widths for this level
    const nodeWidths: number[] = [];
    level.forEach((node: any) => {
      const effectiveNodeConfig = node.nodeConfig
        ? { ...nodeConfig, ...node.nodeConfig }
        : nodeConfig;

      // Use actual node width based on type
      let actualWidth = effectiveNodeConfig.width || boxWidth;
      if (
        effectiveNodeConfig.type === "node-with-description" ||
        effectiveNodeConfig.type === "collapsible-node" ||
        effectiveNodeConfig.type === "image"
      ) {
        actualWidth = this.nodeDrawer.calculateDynamicNodeWidth(
          node,
          effectiveNodeConfig
        );
      }
      nodeWidths.push(actualWidth);
    });

    // Calculate total level width and starting position
    const totalNodesWidth = nodeWidths.reduce((sum, width) => sum + width, 0);
    const totalGaps = (level.length - 1) * horizontalGap;
    const levelWidth = totalNodesWidth + totalGaps;

    // Calculate starting X based on alignment
    let startX = basePadding;
    if (verticalAlign === "center") {
      startX = (totalWidth - levelWidth) / 2;
    } else if (verticalAlign === "right") {
      startX = totalWidth - levelWidth - basePadding;
    }

    // Create node data for this level
    const nodeData: Array<any> = [];
    level.forEach((node: any, nodeIndex: number) => {
      // Calculate X position based on actual node widths
      let x = startX;
      for (let i = 0; i < nodeIndex; i++) {
        x += nodeWidths[i] + horizontalGap;
      }

      // Merge default nodeConfig with node-specific config
      const effectiveNodeConfig = node.nodeConfig
        ? { ...nodeConfig, ...node.nodeConfig }
        : nodeConfig;

      // Calculate effective dimensions
      let effectiveWidth = effectiveNodeConfig.width || boxWidth;
      if (
        effectiveNodeConfig.type === "node-with-description" ||
        effectiveNodeConfig.type === "collapsible-node" ||
        effectiveNodeConfig.type === "image"
      ) {
        effectiveWidth = this.nodeDrawer.calculateDynamicNodeWidth(
          node,
          effectiveNodeConfig
        );
      }
      const effectiveHeight = effectiveNodeConfig.height || boxHeight;

      // For dynamic node types, calculate the actual height
      let effectiveActualHeight = effectiveHeight;
      if (
        effectiveNodeConfig.type === "node-with-description" ||
        effectiveNodeConfig.type === "image" ||
        (effectiveNodeConfig.type === "collapsible-node" &&
          node.description &&
          node.collapsibleState?.expanded)
      ) {
        effectiveActualHeight = this.nodeDrawer.calculateDynamicNodeHeight(
          node,
          effectiveNodeConfig
        );
        maxHeightInLevel = Math.max(maxHeightInLevel, effectiveActualHeight);
      } else {
        maxHeightInLevel = Math.max(maxHeightInLevel, effectiveHeight);
      }

      nodeData.push({
        node,
        nodeIndex,
        effectiveNodeConfig,
        effectiveWidth,
        effectiveHeight,
        effectiveActualHeight,
        x,
      });
    });

    return { maxHeightInLevel, nodeData };
  }

  /**
   * Create final layouts with Y positions calculated
   */
  private createFinalLayouts(
    levelNodeData: Array<Array<any>>,
    levelHeights: number[],
    yOffset: number,
    verticalGap: number,
    horizontalAlign: string,
    totalHeight: number,
    titleSpace: any,
    basePadding: number
  ): LevelLayout[] {
    const levels: LevelLayout[] = [];
    let cumulativeY = yOffset;

    levelNodeData.forEach((levelNodes, levelIndex) => {
      const levelHeight = levelHeights[levelIndex];

      const nodes: NodeLayoutPosition[] = levelNodes.map((nodeData) => {
        // Calculate Y position using actual level heights
        let y;
        if (horizontalAlign === "bottom-to-top") {
          // For bottom-to-top, use simple cumulative positioning since levels are already reversed
          y = cumulativeY;
        } else {
          y = cumulativeY;
        }

        return {
          node: nodeData.node,
          nodeIndex: nodeData.nodeIndex,
          effectiveNodeConfig: nodeData.effectiveNodeConfig,
          x: nodeData.x,
          y,
          width: nodeData.effectiveWidth,
          height: nodeData.effectiveHeight,
          actualHeight: nodeData.effectiveActualHeight,
        };
      });

      levels.push({
        levelIndex,
        levelHeight,
        nodes,
      });

      // Move to next level
      cumulativeY += levelHeight + verticalGap;
    });

    return levels;
  }
}
