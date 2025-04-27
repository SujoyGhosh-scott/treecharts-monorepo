import { FormattedTree, TreeChartOptions, NodeMap } from "../types";
import { DEFAULT_OPTIONS, SVG_NS } from "../constants";
import { createSvgElement, createNode, getNodeKey } from "../utils/svgHelpers";

/**
 * BaseRenderer class that all specific renderers extend
 * Provides common functionality for tree rendering
 */
export abstract class BaseRenderer {
  protected formattedTree: FormattedTree;
  protected options: Required<TreeChartOptions>;
  protected nodeMap: NodeMap = {};
  protected svg: SVGSVGElement;

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
    } as Required<TreeChartOptions>;

    // Create SVG element
    const svgWidth = this.calculateSvgWidth();
    const svgHeight = this.calculateSvgHeight();
    this.svg = createSvgElement(svgWidth, svgHeight);
  }

  /**
   * Calculate width needed for the SVG
   */
  protected calculateSvgWidth(): number {
    const maxNodes = Math.max(
      ...this.formattedTree.map((level) => level.length)
    );
    const { boxWidth, horizontalGap } = this.options;
    return maxNodes * (boxWidth + horizontalGap);
  }

  /**
   * Calculate height needed for the SVG
   */
  protected calculateSvgHeight(): number {
    const { boxHeight, verticalGap } = this.options;
    return this.formattedTree.length * (boxHeight + verticalGap);
  }

  /**
   * Create nodes for the tree
   * Each renderer implementation might override this for specific positioning logic
   */
  protected createNodes(): void {
    const {
      verticalAlign,
      boxWidth,
      boxHeight,
      horizontalGap,
      verticalGap,
      horizontalAlign,
    } = this.options;
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

        // Create node and store its position
        const { centerX, centerY } = createNode(
          this.svg,
          x,
          y,
          node.text,
          this.options
        );

        this.nodeMap[getNodeKey(levelIndex, nodeIndex)] = {
          x,
          y,
          centerX,
          centerY,
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
