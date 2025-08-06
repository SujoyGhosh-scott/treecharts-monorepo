import { FormattedTree, TreeChartOptions, NodeMap } from "../types";
import { DEFAULT_OPTIONS, SVG_NS } from "../constants";
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
   * Calculate width needed for the SVG
   */
  protected calculateSvgWidth(): number {
    const maxNodes = Math.max(
      ...this.formattedTree.map((level) => level.length)
    );
    const boxWidth = this.options.nodeConfig!.width!;
    const { horizontalGap } = this.options;
    const basePadding = 20; // Add padding around the chart
    return maxNodes * (boxWidth + horizontalGap) + basePadding * 2;
  }

  /**
   * Calculate height needed for the SVG
   */
  protected calculateSvgHeight(): number {
    const boxHeight = this.options.nodeConfig!.height!;
    const { verticalGap } = this.options;
    const basePadding = 20; // Add padding around the chart
    const baseHeight =
      this.formattedTree.length * (boxHeight + verticalGap) + basePadding * 2;

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
    const basePadding = 20; // Same padding value used in size calculations

    const totalWidth = this.calculateSvgWidth();
    const totalHeight = this.calculateSvgHeight();

    // Calculate offset for title space
    const titleSpace = this.calculateTitleSpace();
    const yOffset = titleSpace.top + basePadding;

    this.formattedTree.forEach((level, levelIndex) => {
      const levelWidth = level.length * (boxWidth + horizontalGap);

      // Calculate starting X based on alignment, accounting for padding
      let startX = basePadding;
      if (verticalAlign === "center") {
        startX = (totalWidth - levelWidth) / 2;
      } else if (verticalAlign === "right") {
        startX = totalWidth - levelWidth - basePadding;
      }

      level.forEach((node, nodeIndex) => {
        const x = startX + nodeIndex * (boxWidth + horizontalGap);

        // Calculate Y based on horizontal alignment and add title offset and padding
        let y;
        if (horizontalAlign === "bottom-to-top") {
          y =
            totalHeight -
            (levelIndex + 1) * (boxHeight + verticalGap) -
            titleSpace.bottom -
            basePadding;
        } else {
          y = levelIndex * (boxHeight + verticalGap) + yOffset;
        }

        // Merge default nodeConfig with node-specific config (if provided)
        const effectiveNodeConfig = node.nodeConfig
          ? { ...nodeConfig, ...node.nodeConfig }
          : nodeConfig;

        // Use effective width and height (might be overridden by node-specific config)
        const effectiveWidth = effectiveNodeConfig.width || boxWidth;
        const effectiveHeight = effectiveNodeConfig.height || boxHeight;

        // Create node and store its position using NodeDrawer
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

        this.nodeMap[getNodeKey(levelIndex, nodeIndex)] = {
          x,
          y,
          centerX: nodeResult.centerX,
          centerY: nodeResult.centerY,
          width: effectiveWidth,
          height: effectiveHeight,
          bottomY: y + effectiveHeight,
          topY: y,
          node,
        };
      });
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
