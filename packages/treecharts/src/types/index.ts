/**
 * TreeNode represents a node in the tree structure
 */
export interface TreeNode {
  value: string;
  child: TreeNode[];
  edgeText?: string; // Optional text to display on the edge leading to this node
  [key: string]: any; // Allow for additional properties
}

/**
 * FormattedTreeNode represents a node after processing for rendering
 */
export interface FormattedTreeNode {
  text: string;
  parent: string | null;
  edgeText?: string | null; // Edge text from parent to this node
  [key: string]: any; // Allow for additional properties
}

/**
 * FormattedTree is a 2D array where each sub-array represents a level in the tree
 */
export type FormattedTree = FormattedTreeNode[][];

/**
 * NodePosition represents a node's position in the formatted tree
 */
export interface NodePosition {
  level: number;
  position: number;
}

/**
 * VerticalAlignment options for tree rendering
 */
export type VerticalAlignment = "left" | "center" | "right";

/**
 * HorizontalAlignment options for tree rendering
 */
export type HorizontalAlignment = "top-to-bottom" | "bottom-to-top";

/**
 * TreeType represents the different types of tree visualizations
 */
export type TreeType = "direct" | "right-angle" | "curved" | "all-direction";

/**
 * Connection type for drawing connections between nodes
 */
export type ConnectionType = "direct" | "right-angle" | "curved" | "custom";

/**
 * Arrow direction for connections
 */
export type ArrowDirection = "source-to-target" | "target-to-source" | "both";

/**
 * Point represents a coordinate in 2D space
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * ConnectionOptions represents configuration for drawing connections between nodes
 */
export interface ConnectionOptions {
  // Connection type
  type?: "direct" | "right-angle" | "curved" | "custom";

  // Line style options
  color?: string;
  width?: number;
  dasharray?: string;
  opacity?: number;

  // Arrow/direction options
  showArrows?: boolean;
  arrowDirection?: "source-to-target" | "target-to-source" | "both";
  arrowSize?: number;
  arrowColor?: string;

  // Curve options (for curved connections)
  curveRadius?: number;

  // Custom path options
  customPath?: string;

  // Edge text options
  edgeText?: string;
  textSize?: number;
  textColor?: string;
  textBackgroundColor?: string;
}

/**
 * TreeChartOptions represents configuration for the tree chart
 */
export interface TreeChartOptions {
  boxWidth?: number;
  boxHeight?: number;
  horizontalGap?: number;
  verticalGap?: number;
  verticalAlign?: VerticalAlignment;
  horizontalAlign?: HorizontalAlignment;
  nodeColor?: string;
  lineColor?: string;
  nodeBorderRadius?: number;
  nodeBorderColor?: string;
  fontSize?: number;
  fontColor?: string;
  type?: TreeType;
  // Connection styling options
  connectionType?: ConnectionType;
  lineWidth?: number;
  lineDasharray?: string;
  showArrows?: boolean;
  arrowDirection?: ArrowDirection;
  arrowSize?: number;
  curveRadius?: number;
  // Edge text styling options
  textSize?: number;
  textColor?: string;
  textBackgroundColor?: string;
}

/**
 * SvgNodeData represents the position and dimensions of a node in the SVG
 */
export interface SvgNodeData {
  x: number;
  y: number;
  centerX?: number;
  centerY?: number;
  width?: number;
  height?: number;
  bottomY?: number;
  topY?: number;
  direction?: {
    x: number;
    y: number;
  };
  angle?: number;
  node?: FormattedTreeNode;
}

/**
 * NodeMap is a mapping of node positions to their SVG coordinates
 */
export interface NodeMap {
  [key: string]: SvgNodeData;
}

/**
 * ParentChildMap maps parent positions to arrays of child positions
 */
export interface ParentChildMap {
  [key: string]: NodePosition[];
}
