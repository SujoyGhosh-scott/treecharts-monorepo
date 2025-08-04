import { FormattedTree, TreeChartOptions, NodeMap } from "../types";
import { DEFAULT_OPTIONS, SVG_NS } from "../constants";
import { createSvgElement, getNodeKey } from "../utils/svgHelpers";
import { ConnectionDrawer } from "../utils/ConnectionDrawer";
import { NodeDrawer } from "../utils/NodeDrawer";
import { TitleDrawer } from "../utils/TitleDrawer";

/**
 * BaseRenderer class that all specific renderers extend
 * Provides common functionality for tree rendering
 */
export abstract class BaseRenderer {
  protected formattedTree: FormattedTree;
  protected options: Required<TreeChartOptions>;
  protected nodeMap: NodeMap = {};
  protected svg: SVGSVGElement;
  protected connectionDrawer: ConnectionDrawer;
  protected nodeDrawer: NodeDrawer;
  protected titleDrawer: TitleDrawer;

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
    } as Required<TreeChartOptions>;

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
    return maxNodes * (boxWidth + horizontalGap);
  }

  /**
   * Calculate height needed for the SVG
   */
  protected calculateSvgHeight(): number {
    const boxHeight = this.options.nodeConfig!.height!;
    const { verticalGap } = this.options;
    const baseHeight = this.formattedTree.length * (boxHeight + verticalGap);

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

    const totalWidth = this.calculateSvgWidth();
    const totalHeight = this.calculateSvgHeight();

    // Calculate offset for title space
    const titleSpace = this.calculateTitleSpace();
    const yOffset = titleSpace.top;

    this.formattedTree.forEach((level, levelIndex) => {
      const levelWidth = level.length * (boxWidth + horizontalGap);

      // Calculate starting X based on alignment
      let startX = 0;
      if (verticalAlign === "center") {
        startX = (totalWidth - levelWidth) / 2;
      } else if (verticalAlign === "right") {
        startX = totalWidth - levelWidth;
      }

      level.forEach((node, nodeIndex) => {
        const x = startX + nodeIndex * (boxWidth + horizontalGap);

        // Calculate Y based on horizontal alignment and add title offset
        let y;
        if (horizontalAlign === "bottom-to-top") {
          y =
            totalHeight -
            (levelIndex + 1) * (boxHeight + verticalGap) -
            titleSpace.bottom;
        } else {
          y = levelIndex * (boxHeight + verticalGap) + yOffset;
        }

        // Create node and store its position using NodeDrawer
        const nodeResult = this.nodeDrawer.drawNode({
          type: nodeConfig.type,
          x,
          y,
          width: boxWidth,
          height: boxHeight,
          fill: nodeConfig.color,
          stroke: nodeConfig.borderColor,
          strokeWidth: nodeConfig.borderWidth,
          borderRadius: nodeConfig.borderRadius,
          text: node.text,
          fontSize: nodeConfig.fontSize,
          fontColor: nodeConfig.fontColor,
          opacity: nodeConfig.opacity,
          shadow: nodeConfig.shadow,
          shadowColor: nodeConfig.shadowColor,
          shadowOffset: nodeConfig.shadowOffset,
          gradient: nodeConfig.gradient,
          gradientStartColor: nodeConfig.gradientStartColor,
          gradientEndColor: nodeConfig.gradientEndColor,
        });

        this.nodeMap[getNodeKey(levelIndex, nodeIndex)] = {
          x,
          y,
          centerX: nodeResult.centerX,
          centerY: nodeResult.centerY,
          width: boxWidth,
          height: boxHeight,
          bottomY: y + boxHeight,
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

    return this.svg;
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
