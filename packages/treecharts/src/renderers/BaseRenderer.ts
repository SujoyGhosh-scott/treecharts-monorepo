import { FormattedTree, TreeChartOptions, NodeMap } from "../types";
import { DEFAULT_OPTIONS } from "../constants";
import {
  createSvgElement,
  calculateSvgWidth,
  calculateSvgHeight,
} from "../utils/svgHelpers";
import { ConnectionDrawer } from "../utils/ConnectionDrawer";
import { NodeDrawer } from "../utils/NodeDrawer";
import { TitleDrawer } from "../utils/TitleDrawer";
import { ActionDrawer } from "../utils/ActionDrawer";
import { LayoutCalculator } from "../utils/LayoutCalculator";
import { NodeFactory } from "../utils/NodeFactory";

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
  protected layoutCalculator: LayoutCalculator;
  protected nodeFactory: NodeFactory;
  protected containerElement?: HTMLElement;
  protected onTreeUpdate?: () => void;
  protected titleSpace?: { top: number; bottom: number };

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

    // Create temporary SVG for initialization
    this.svg = createSvgElement(100, 100);

    // Initialize drawers
    this.connectionDrawer = new ConnectionDrawer(this.svg);
    this.nodeDrawer = new NodeDrawer(this.svg);
    this.titleDrawer = new TitleDrawer(this.svg, options.titleConfig);

    // Initialize layout and node factory utilities
    this.layoutCalculator = new LayoutCalculator(
      this.formattedTree,
      this.options,
      this.nodeDrawer,
      this.titleDrawer
    );
    this.nodeFactory = new NodeFactory(this.nodeDrawer, () => {
      if (this.onTreeUpdate) {
        this.onTreeUpdate();
      }
    });

    // Calculate proper SVG dimensions
    const svgWidth = calculateSvgWidth(
      this.formattedTree,
      this.options,
      this.nodeDrawer
    );
    this.titleSpace = this.titleDrawer.calculateTitleSpace(svgWidth);
    const svgHeight = calculateSvgHeight(
      this.formattedTree,
      this.options,
      this.nodeDrawer,
      this.titleSpace
    );

    // Update SVG with correct dimensions
    this.svg.setAttribute("width", svgWidth.toString());
    this.svg.setAttribute("height", svgHeight.toString());
  }

  /**
   * Set the callback for tree updates (for collapsible nodes)
   */
  public setTreeUpdateCallback(callback: () => void): void {
    this.onTreeUpdate = callback;
  }

  /**
   * Create nodes for the tree using the layout calculator and node factory
   */
  protected createNodes(): void {
    // Calculate the complete layout for the tree
    const layout = this.layoutCalculator.calculateTreeLayout();

    // Create all nodes from the calculated layout
    this.nodeMap = this.nodeFactory.createNodesFromLayout(layout);
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

    this.titleDrawer.drawTitle(svgWidth, svgHeight, this.titleSpace);
  }
}
