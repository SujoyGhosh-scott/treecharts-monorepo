import { TreeNode, TreeChartOptions, FormattedTree, TreeType } from "./types";
import { formatTree } from "./utils/treeFormatter";
import { createRenderer } from "./renderers";
import { DEFAULT_OPTIONS } from "./constants";

/**
 * Main TreeChart class for creating tree visualizations
 */
export class TreeChart {
  private container: HTMLElement | null = null;
  private options: Required<Omit<TreeChartOptions, "actionConfig">> & {
    actionConfig?: TreeChartOptions["actionConfig"];
  };
  private formattedTree: FormattedTree = [];
  private svg: SVGSVGElement | null = null;

  /**
   * Constructor for TreeChart
   *
   * @param containerId ID of the HTML element to render the chart in (optional)
   * @param options Configuration options for the chart
   */
  constructor(containerId?: string, options: TreeChartOptions = {}) {
    // If containerId is provided, get the container element
    if (containerId) {
      this.container = document.getElementById(containerId);
      if (!this.container) {
        console.warn(`Container element with ID "${containerId}" not found.`);
      }
    }

    // Merge default options with provided options
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    } as Required<Omit<TreeChartOptions, "actionConfig">> & {
      actionConfig?: TreeChartOptions["actionConfig"];
    };
  }

  /**
   * Set the container element for the chart
   *
   * @param containerId ID of the HTML element
   * @returns The TreeChart instance for chaining
   */
  public setContainer(containerId: string): TreeChart {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.warn(`Container element with ID "${containerId}" not found.`);
    }
    return this;
  }

  /**
   * Set chart options
   *
   * @param options Configuration options
   * @returns The TreeChart instance for chaining
   */
  public setOptions(options: TreeChartOptions): TreeChart {
    this.options = {
      ...this.options,
      ...options,
    } as Required<Omit<TreeChartOptions, "actionConfig">> & {
      actionConfig?: TreeChartOptions["actionConfig"];
    };
    return this;
  }

  /**
   * Set the type of tree visualization
   *
   * @param type Type of tree visualization
   * @returns The TreeChart instance for chaining
   */
  public setType(type: TreeType): TreeChart {
    this.options.type = type;
    return this;
  }

  /**
   * Render the tree chart
   *
   * @param data Tree data to visualize
   * @returns The created SVG element
   */
  public render(data: TreeNode): SVGSVGElement {
    // Format the tree data for rendering with alignment options
    this.formattedTree = formatTree(data, {
      horizontalAlign: this.options.horizontalAlign,
    });

    // Create appropriate renderer based on type
    const renderer = createRenderer(
      this.options.type,
      this.formattedTree,
      this.options
    );

    // Set up callback for collapsible nodes to trigger re-rendering
    renderer.setTreeUpdateCallback(() => {
      this.render(data);
    });

    // Set container for action positioning
    if (this.container) {
      renderer.setContainer(this.container);
    }

    // Render the tree
    this.svg = renderer.render();

    // If container exists, append the SVG to it
    if (this.container) {
      this.container.innerHTML = ""; // Clear container
      this.container.appendChild(this.svg);
    }

    return this.svg;
  }

  /**
   * Update the chart with new data
   *
   * @param data New tree data
   * @returns The updated SVG element
   */
  public update(data: TreeNode): SVGSVGElement {
    return this.render(data);
  }

  /**
   * Get the SVG element
   *
   * @returns The SVG element or null if not rendered
   */
  public getSvg(): SVGSVGElement | null {
    return this.svg;
  }

  /**
   * Resize the chart
   *
   * @param width New width
   * @param height New height
   * @returns The TreeChart instance for chaining
   */
  public resize(width: number, height: number): TreeChart {
    if (this.svg) {
      this.svg.setAttribute("width", width.toString());
      this.svg.setAttribute("height", height.toString());
    }
    return this;
  }
}
