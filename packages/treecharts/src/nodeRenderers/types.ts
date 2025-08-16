import { NodeOptions } from "../types";

/**
 * Result of rendering a node, including bounds and center points
 */
export interface NodeRenderResult {
  element: SVGElement;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  centerX: number;
  centerY: number;
}

/**
 * Base interface that all node renderers must implement
 */
export interface NodeRenderer {
  /**
   * Render the node and return the SVG element with bounds information
   */
  render(options: Required<NodeOptions>, svg: SVGSVGElement): NodeRenderResult;

  /**
   * Calculate dynamic width for nodes that auto-size based on content
   * Optional - only needed for nodes that support dynamic sizing
   */
  calculateDynamicWidth?(node: any, config: any): number;

  /**
   * Calculate dynamic height for nodes that auto-size based on content
   * Optional - only needed for nodes that support dynamic sizing
   */
  calculateDynamicHeight?(node: any, config: any): number;
}

/**
 * Node type to renderer class mapping
 */
export type NodeType =
  | "rectangle"
  | "circle"
  | "ellipse"
  | "diamond"
  | "hexagon"
  | "triangle"
  | "pentagon"
  | "octagon"
  | "star"
  | "node-with-description"
  | "collapsible-node"
  | "custom";
