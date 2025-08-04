import { FormattedTree, TreeChartOptions, NodeMap } from "../types";
import { DEFAULT_OPTIONS, SVG_NS } from "../constants";
import { createSvgElement, getNodeKey } from "../utils/svgHelpers";
import { ConnectionDrawer } from "../utils/ConnectionDrawer";
import { NodeDrawer } from "../utils/NodeDrawer";

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
    } as Required<TreeChartOptions>;

    // Create SVG element
    const svgWidth = this.calculateSvgWidth();
    const svgHeight = this.calculateSvgHeight();
    this.svg = createSvgElement(svgWidth, svgHeight);

    // Initialize connection drawer
    this.connectionDrawer = new ConnectionDrawer(this.svg);

    // Initialize node drawer
    this.nodeDrawer = new NodeDrawer(this.svg);
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
    return this.formattedTree.length * (boxHeight + verticalGap);
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

        // Calculate Y based on horizontal alignment
        let y;
        if (horizontalAlign === "bottom-to-top") {
          y = totalHeight - (levelIndex + 1) * (boxHeight + verticalGap);
        } else {
          y = levelIndex * (boxHeight + verticalGap);
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
    return this.svg;
  }
}
