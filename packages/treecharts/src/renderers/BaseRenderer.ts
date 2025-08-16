import {
  FormattedTree,
  TreeChartOptions,
  NodeMap,
  LevelNodeData,
} from "../types";
import { DEFAULT_OPTIONS, SVG_NS, NODE_CONSTANTS } from "../constants";
import { createSvgElement, getNodeKey } from "../utils/svgHelpers";
import { ConnectionDrawer } from "../utils/ConnectionDrawer";
import { NodeDrawer } from "../utils/NodeDrawer";
import { TitleDrawer } from "../utils/TitleDrawer";
import { ActionDrawer } from "../utils/ActionDrawer";

/**
 * BaseRenderer class that all specific renderers extend
 * Provides common functionality for tree rendering
 */
export abstract class BaseRenderer {
  protected formattedTree: FormattedTree;
  protected options: Required<Omit<TreeChartOptions, "actionConfig">> & {
    actionConfig?: TreeChartOptions["actionConfig"];
  };
  protected nodeMap: NodeMap = {};
  protected svg: SVGSVGElement;
  protected connectionDrawer: ConnectionDrawer;
  protected nodeDrawer: NodeDrawer;
  protected titleDrawer: TitleDrawer;
  protected actionDrawer?: ActionDrawer;
  protected containerElement?: HTMLElement;
  protected onTreeUpdate?: () => void;

  /**
   * Constructor for BaseRenderer
   *
   * @param formattedTree The formatted tree data
   * @param options Rendering options
   */
  constructor(formattedTree: FormattedTree, options: TreeChartOptions = {}) {
    this.formattedTree = formattedTree;

    // Merge default options with provided options
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
      nodeConfig: {
        ...DEFAULT_OPTIONS.nodeConfig,
        ...options.nodeConfig,
      },
      edgeConfig: {
        ...DEFAULT_OPTIONS.edgeConfig,
        ...options.edgeConfig,
      },
      titleConfig: {
        ...DEFAULT_OPTIONS.titleConfig,
        ...options.titleConfig,
      },
      actionConfig: {
        ...options.actionConfig,
      },
    } as Required<Omit<TreeChartOptions, "actionConfig">> & {
      actionConfig?: TreeChartOptions["actionConfig"];
    };

    // Create SVG element
    const svgWidth = this.calculateSvgWidth();
    const svgHeight = this.calculateSvgHeight();
    this.svg = createSvgElement(svgWidth, svgHeight);

    // Initialize connection drawer
    this.connectionDrawer = new ConnectionDrawer(this.svg);

    // Initialize node drawer
    this.nodeDrawer = new NodeDrawer(this.svg);

    // Initialize title drawer
    this.titleDrawer = new TitleDrawer(this.svg, options.titleConfig);
  }

  /**
   * Set the callback for tree updates (for collapsible nodes)
   */
  public setTreeUpdateCallback(callback: () => void): void {
    this.onTreeUpdate = callback;
  }

  /**
   * Calculate width needed for the SVG
   */
  protected calculateSvgWidth(): number {
    const { horizontalGap } = this.options;
    const basePadding = NODE_CONSTANTS.BASE_PADDING; // Add padding around the chart
    const nodeConfig = this.options.nodeConfig!;
    const boxWidth = nodeConfig.width!;

    // Calculate the maximum width needed for any level
    let maxLevelWidth = 0;

    this.formattedTree.forEach((level, levelIndex) => {
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
          effectiveNodeConfig.type === "collapsible-node"
        ) {
          actualWidth = this.calculateDynamicNodeWidth(
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

    const finalWidth = maxLevelWidth + basePadding * 2;
    return finalWidth;
  }

  /**
   * Calculate dynamic width for nodes that auto-size based on content
   */
  private calculateDynamicNodeWidth(node: any, nodeConfig: any): number {
    const maxNodeWidth = nodeConfig.width || NODE_CONSTANTS.DEFAULT_MAX_WIDTH;
    const lineHeight = NODE_CONSTANTS.DESCRIPTION_LINE_HEIGHT;
    const padding = nodeConfig.padding || NODE_CONSTANTS.DEFAULT_PADDING;
    const fontSize = nodeConfig.fontSize || NODE_CONSTANTS.DEFAULT_FONT_SIZE;
    const descriptionFontSize =
      nodeConfig.descriptionFontSize || NODE_CONSTANTS.DESCRIPTION_FONT_SIZE;

    // Create canvas for text measurement
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      return maxNodeWidth; // Fallback to max width
    }

    // Measure main text
    context.font = `bold ${fontSize}px ${
      nodeConfig.fontFamily || "Arial, sans-serif"
    }`;
    const textWidth = context.measureText(node.value || "").width;
    let maxRequiredWidth = textWidth;

    // Handle description if present
    if (node.description && node.description.trim()) {
      context.font = `${descriptionFontSize}px ${
        nodeConfig.fontFamily || "Arial, sans-serif"
      }`;

      // Calculate available width for description
      const availableWidth = maxNodeWidth - padding * 2;

      // Simple word wrapping to estimate width needed
      const words = node.description.split(" ");
      let currentLineWidth = 0;
      let maxLineWidth = 0;

      for (const word of words) {
        const wordWidth = context.measureText(word + " ").width;
        if (
          currentLineWidth + wordWidth > availableWidth &&
          currentLineWidth > 0
        ) {
          maxLineWidth = Math.max(maxLineWidth, currentLineWidth);
          currentLineWidth = wordWidth;
        } else {
          currentLineWidth += wordWidth;
        }
      }
      maxLineWidth = Math.max(maxLineWidth, currentLineWidth);
      maxRequiredWidth = Math.max(maxRequiredWidth, maxLineWidth);
    }

    // For collapsible nodes, add space for arrow button
    if (nodeConfig.type === "collapsible-node") {
      maxRequiredWidth += NODE_CONSTANTS.SPACE_FOR_ARROW_BUTTON;
    }

    // Calculate final width - use the maximum of configured width or required width
    // Don't cap at maxNodeWidth for dynamic nodes since they need to fit their content
    const minWidthRequired = maxRequiredWidth + padding * 2;
    const finalWidth = Math.max(nodeConfig.width || 0, minWidthRequired);
    return finalWidth;
  }

  /**
   * Calculate dynamic height for nodes that auto-size based on content
   */
  private calculateDynamicNodeHeight(node: any, nodeConfig: any): number {
    const lineHeight = NODE_CONSTANTS.DESCRIPTION_LINE_HEIGHT;
    const padding = nodeConfig.padding || NODE_CONSTANTS.DEFAULT_PADDING;
    const fontSize = nodeConfig.fontSize || NODE_CONSTANTS.DEFAULT_FONT_SIZE;
    const descriptionFontSize =
      nodeConfig.descriptionFontSize || NODE_CONSTANTS.DESCRIPTION_FONT_SIZE;
    const descriptionMarginTop =
      nodeConfig.descriptionMarginTop || NODE_CONSTANTS.DESCRIPTION_MARGIN_TOP;

    let totalRequiredHeight = fontSize; // Start with main text height

    // Handle description if present
    if (node.description && node.description.trim()) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (context) {
        context.font = `${descriptionFontSize}px ${
          nodeConfig.fontFamily || "Arial, sans-serif"
        }`;

        // Calculate available width for text wrapping
        const maxWidth = nodeConfig.width || NODE_CONSTANTS.DEFAULT_MAX_WIDTH;
        const availableWidth = maxWidth - padding * 2;

        // Count lines needed for description
        const words = node.description.split(" ");
        let lines = 1;
        let currentLineWidth = 0;

        for (const word of words) {
          const wordWidth = context.measureText(word + " ").width;
          if (
            currentLineWidth + wordWidth > availableWidth &&
            currentLineWidth > 0
          ) {
            lines++;
            currentLineWidth = wordWidth;
          } else {
            currentLineWidth += wordWidth;
          }
        }

        // Calculate description height
        const descriptionHeight = lines * descriptionFontSize * lineHeight;
        totalRequiredHeight += descriptionMarginTop + descriptionHeight;
      }
    }

    // Calculate final height with padding
    const minHeightRequired = totalRequiredHeight + padding * 2;
    return Math.max(nodeConfig.height || 0, minHeightRequired);
  }

  /**
   * Calculate height needed for the SVG
   */
  protected calculateSvgHeight(): number {
    const boxHeight = this.options.nodeConfig!.height!;
    const { verticalGap } = this.options;
    const basePadding = NODE_CONSTANTS.BASE_PADDING; // Add padding around the chart

    // Calculate actual heights for each level
    let totalHeight = 0;
    this.formattedTree.forEach((level, levelIndex) => {
      let maxHeightInLevel = boxHeight;

      level.forEach((node: any) => {
        const effectiveNodeConfig = node.nodeConfig
          ? { ...this.options.nodeConfig!, ...node.nodeConfig }
          : this.options.nodeConfig!;

        // Calculate dynamic height for nodes that need it
        if (
          effectiveNodeConfig.type === "node-with-description" ||
          effectiveNodeConfig.type === "collapsible-node"
        ) {
          const dynamicHeight = this.calculateDynamicNodeHeight(
            node,
            effectiveNodeConfig
          );
          maxHeightInLevel = Math.max(maxHeightInLevel, dynamicHeight);
        }
      });

      totalHeight += maxHeightInLevel;
      if (levelIndex < this.formattedTree.length - 1) {
        totalHeight += verticalGap;
      }
    });

    const baseHeight = totalHeight + basePadding * 2;

    // Add space for title if provided
    const titleSpace = this.calculateTitleSpace();
    return baseHeight + titleSpace.top + titleSpace.bottom;
  }

  /**
   * Calculate space needed for titles
   */
  protected calculateTitleSpace(): { top: number; bottom: number } {
    let topSpace = 0;
    let bottomSpace = 0;

    // Get title configuration with defaults
    const titleConfig = {
      ...DEFAULT_OPTIONS.titleConfig,
      ...this.options.titleConfig,
      position: {
        ...DEFAULT_OPTIONS.titleConfig.position,
        ...this.options.titleConfig?.position,
      },
      titleStyle: {
        ...DEFAULT_OPTIONS.titleConfig.titleStyle,
        ...this.options.titleConfig?.titleStyle,
      },
      descriptionStyle: {
        ...DEFAULT_OPTIONS.titleConfig.descriptionStyle,
        ...this.options.titleConfig?.descriptionStyle,
      },
    };

    // Only calculate space if title or description is provided
    if (!titleConfig.title && !titleConfig.description) {
      return { top: topSpace, bottom: bottomSpace };
    }

    const { vertical } = titleConfig.position;

    if (vertical === "top") {
      if (titleConfig.title) {
        topSpace +=
          titleConfig.titleStyle.fontSize! + titleConfig.titleStyle.margin!;
      }
      if (titleConfig.description) {
        topSpace +=
          titleConfig.descriptionStyle.fontSize! +
          titleConfig.descriptionStyle.margin!;
      }
    } else {
      if (titleConfig.title) {
        bottomSpace +=
          titleConfig.titleStyle.fontSize! + titleConfig.titleStyle.margin!;
      }
      if (titleConfig.description) {
        bottomSpace +=
          titleConfig.descriptionStyle.fontSize! +
          titleConfig.descriptionStyle.margin!;
      }
    }

    return { top: topSpace, bottom: bottomSpace };
  }

  /**
   * Create nodes for the tree
   * Each renderer implementation might override this for specific positioning logic
   */
  protected createNodes(): void {
    const { verticalAlign, horizontalGap, verticalGap, horizontalAlign } =
      this.options;
    const nodeConfig = this.options.nodeConfig!;
    const boxWidth = nodeConfig.width!;
    const boxHeight = nodeConfig.height!;
    const basePadding = NODE_CONSTANTS.BASE_PADDING;

    const totalWidth = this.calculateSvgWidth();
    const totalHeight = this.calculateSvgHeight();
    const titleSpace = this.calculateTitleSpace();
    const yOffset = titleSpace.top + basePadding;

    // First pass: calculate actual heights for each level
    const levelHeights: number[] = [];
    const levelNodeData: Array<Array<LevelNodeData>> = [];

    this.formattedTree.forEach((level, levelIndex) => {
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
          effectiveNodeConfig.type === "collapsible-node"
        ) {
          // Use the same dynamic width calculation as in calculateSvgWidth
          actualWidth = this.calculateDynamicNodeWidth(
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

      // Calculate starting X based on alignment
      let startX = basePadding;
      if (verticalAlign === "center") {
        startX = (totalWidth - levelWidth) / 2;
      } else if (verticalAlign === "right") {
        startX = totalWidth - levelWidth - basePadding;
      }

      const levelNodes: Array<LevelNodeData> = [];

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

        // Use actual node width based on type - dynamic calculation for special node types
        let effectiveWidth = effectiveNodeConfig.width || boxWidth;
        if (
          effectiveNodeConfig.type === "node-with-description" ||
          effectiveNodeConfig.type === "collapsible-node"
        ) {
          effectiveWidth = this.calculateDynamicNodeWidth(
            node,
            effectiveNodeConfig
          );
        }
        const effectiveHeight = effectiveNodeConfig.height || boxHeight;

        // For dynamic node types, calculate the actual height
        let effectiveActualHeight = effectiveHeight;
        if (
          effectiveNodeConfig.type === "node-with-description" ||
          (effectiveNodeConfig.type === "collapsible-node" &&
            node.description &&
            node.collapsibleState?.expanded)
        ) {
          effectiveActualHeight = this.calculateDynamicNodeHeight(
            node,
            effectiveNodeConfig
          );
          maxHeightInLevel = Math.max(maxHeightInLevel, effectiveActualHeight);
        } else {
          maxHeightInLevel = Math.max(maxHeightInLevel, effectiveHeight);
        }

        levelNodes.push({
          node,
          nodeIndex,
          effectiveNodeConfig,
          effectiveWidth,
          effectiveHeight,
          x,
        });
      });

      levelHeights.push(maxHeightInLevel);
      levelNodeData.push(levelNodes);
    });

    // Second pass: create nodes with adjusted Y positions
    let cumulativeY = yOffset;

    levelNodeData.forEach((levelNodes, levelIndex) => {
      const levelHeight = levelHeights[levelIndex];

      levelNodes.forEach(
        ({
          node,
          nodeIndex,
          effectiveNodeConfig,
          effectiveWidth,
          effectiveHeight,
          x,
        }) => {
          // Calculate Y position using actual level heights
          let y;
          if (horizontalAlign === "bottom-to-top") {
            const remainingLevels = levelHeights
              .slice(levelIndex + 1)
              .reduce((sum, h) => sum + h + verticalGap, 0);
            y =
              totalHeight -
              remainingLevels -
              levelHeight -
              titleSpace.bottom -
              basePadding;
          } else {
            y = cumulativeY;
          }

          // Create node using NodeDrawer
          const nodeResult = this.nodeDrawer.drawNode({
            type: effectiveNodeConfig.type,
            x,
            y,
            width: effectiveWidth,
            height: effectiveHeight,
            fill: effectiveNodeConfig.color,
            stroke: effectiveNodeConfig.borderColor,
            strokeWidth: effectiveNodeConfig.borderWidth,
            borderRadius: effectiveNodeConfig.borderRadius,
            text: node.text,
            description: node.description,
            fontSize: effectiveNodeConfig.fontSize,
            fontColor: effectiveNodeConfig.fontColor,
            padding: effectiveNodeConfig.padding || 5, // Use nodeConfig padding for all node types
            opacity: effectiveNodeConfig.opacity,
            shadow: effectiveNodeConfig.shadow,
            shadowColor: effectiveNodeConfig.shadowColor,
            shadowOffset: effectiveNodeConfig.shadowOffset,
            gradient: effectiveNodeConfig.gradient,
            gradientStartColor: effectiveNodeConfig.gradientStartColor,
            gradientEndColor: effectiveNodeConfig.gradientEndColor,
            collapsible: effectiveNodeConfig.collapsible,
            expanded: node.collapsibleState?.expanded || false,
            onToggleExpand: (expanded: boolean) => {
              // Update the node state
              if (node.collapsibleState) {
                node.collapsibleState.expanded = expanded;
              } else {
                node.collapsibleState = { expanded };
              }
              // Trigger tree re-rendering
              if (this.onTreeUpdate) {
                this.onTreeUpdate();
              }
            },
          });

          this.nodeMap[getNodeKey(levelIndex, nodeIndex)] = {
            x: nodeResult.bounds.x,
            y: nodeResult.bounds.y,
            centerX: nodeResult.centerX,
            centerY: nodeResult.centerY,
            width: nodeResult.bounds.width,
            height: nodeResult.bounds.height,
            bottomY: nodeResult.bounds.y + nodeResult.bounds.height,
            topY: nodeResult.bounds.y,
            node,
          };
        }
      );

      // Move to next level (only for top-to-bottom)
      if (horizontalAlign !== "bottom-to-top") {
        cumulativeY += levelHeight + verticalGap;
      }
    });
  }

  /**
   * Abstract method to draw connections between nodes
   * Each renderer must implement this
   */
  protected abstract drawConnections(): void;

  /**
   * Render the tree and return the SVG element
   */
  public render(): SVGSVGElement {
    this.createNodes();
    this.drawConnections();

    // Draw title and description
    this.renderTitle();

    // Draw action buttons if configured
    this.renderActions();

    return this.svg;
  }

  /**
   * Set container element for action positioning
   */
  public setContainer(containerElement: HTMLElement): void {
    this.containerElement = containerElement;
  }

  /**
   * Render action buttons
   */
  protected renderActions(): void {
    if (this.options.actionConfig && this.containerElement) {
      this.actionDrawer = new ActionDrawer(
        this.svg,
        this.options.actionConfig,
        this.containerElement
      );
      this.actionDrawer.drawActions();
    }
  }

  /**
   * Render chart title and description
   */
  protected renderTitle(): void {
    const svgWidth = parseInt(this.svg.getAttribute("width") || "0");
    const svgHeight = parseInt(this.svg.getAttribute("height") || "0");

    this.titleDrawer.drawTitle(svgWidth, svgHeight);
  }
}
