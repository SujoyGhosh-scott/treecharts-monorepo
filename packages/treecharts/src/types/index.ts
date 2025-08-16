/**
 * TreeNode represents a node in the tree structure
 */
export interface TreeNode {
  value: string;
  description?: string; // Optional description for node-with-description type
  child: TreeNode[];
  edgeText?: string; // Optional text to display on the edge leading to this node
  nodeConfig?: Partial<NodeConfig>; // Optional node-specific styling configuration
  [key: string]: any; // Allow for additional properties
  collapsibleState?: CollapsibleNodeState; // For collapsible nodes
}

/**
 * FormattedTreeNode represents a node after processing for rendering
 */
export interface FormattedTreeNode {
  text: string;
  description?: string; // Description for node-with-description type
  parent: string | null;
  edgeText?: string | null; // Edge text from parent to this node
  nodeConfig?: Partial<NodeConfig>; // Node-specific styling configuration
  [key: string]: any; // Allow for additional properties
  collapsibleState?: CollapsibleNodeState; // For collapsible nodes
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
 * NodeConfig represents configuration for node styling and behavior
 */
export interface NodeConfig {
  // Basic node properties
  type?: NodeType;
  width?: number;
  height?: number;

  // Visual styling
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  opacity?: number;

  // Text styling
  fontSize?: number;
  fontColor?: string;
  fontFamily?: string;
  padding?: number; // Add missing padding property

  // Advanced styling
  shadow?: boolean;
  shadowColor?: string;
  shadowOffset?: Point;
  gradient?: boolean;
  gradientStartColor?: string;
  gradientEndColor?: string;

  // Icon support
  icon?: string;
  iconSize?: number;
  iconColor?: string;

  // Collapsible node support
  collapsible?: boolean;

  // Custom attributes for advanced customization
  customAttributes?: { [key: string]: string | number };
}

/**
 * EdgeConfig represents configuration for edge/connection styling and behavior
 */
export interface EdgeConfig {
  // Connection type and basic styling
  type?: ConnectionType;
  color?: string;
  width?: number;
  opacity?: number;
  dasharray?: string;

  // Arrow/direction options
  showArrows?: boolean;
  arrowDirection?: ArrowDirection;
  arrowSize?: number;
  arrowColor?: string;

  // Curve options (for curved connections)
  curveRadius?: number;

  // Custom path options
  customPath?: string;

  // Edge text styling
  textSize?: number;
  textColor?: string;
  textBackgroundColor?: string;
}

/**
 * TitlePosition represents the positioning options for chart titles
 */
export interface TitlePosition {
  horizontal: "left" | "center" | "right";
  vertical: "top" | "bottom";
}

/**
 * TitleConfig represents configuration for chart title and description
 */
export interface TitleConfig {
  // Title text
  title: string;
  description: string;

  // Position configuration
  position: TitlePosition;

  // Title styling
  titleStyle: {
    fontSize: number;
    fontColor: string;
    fontFamily: string;
    fontWeight: string;
    margin: number;
  };

  // Description styling
  descriptionStyle: {
    fontSize: number;
    fontColor: string;
    fontFamily: string;
    fontWeight: string;
    margin: number;
  };
}

/**
 * Action button position options
 */
export type ActionPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

/**
 * ActionConfig represents configuration for action buttons
 */
export interface ActionConfig {
  // Download action
  download?: {
    enabled: boolean;
    position?: ActionPosition;
    filename?: string;
  };
}

/**
 * TreeChartOptions represents configuration for the tree chart
 */
export interface TreeChartOptions {
  // Chart layout and positioning
  horizontalGap?: number;
  verticalGap?: number;
  verticalAlign?: VerticalAlignment;
  horizontalAlign?: HorizontalAlignment;
  type?: TreeType;

  // Node configuration
  nodeConfig?: NodeConfig;

  // Edge configuration
  edgeConfig?: EdgeConfig;

  // Title configuration
  titleConfig?: Partial<TitleConfig>;

  // Action configuration
  actionConfig?: ActionConfig;
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

/**
 * NodeType represents the different types of node shapes
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
  | "custom"
  | "node-with-description"
  | "collapsible-node";
/**
 * CollapsibleNodeState for tracking expanded/collapsed state
 */
export interface CollapsibleNodeState {
  expanded: boolean;
}

/**
 * LevelNodeData represents the processed node data for a specific level during rendering
 */
export interface LevelNodeData {
  node: FormattedTreeNode;
  nodeIndex: number;
  effectiveNodeConfig: NodeConfig;
  effectiveWidth: number;
  effectiveHeight: number;
  x: number;
}

/**
 * NodeOptions represents configuration for drawing individual nodes
 */
export interface NodeOptions {
  // Node type and positioning
  type?: NodeType;
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  // Basic styling
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  borderRadius?: number;
  opacity?: number;

  // Text content and styling
  text?: string;
  description?: string; // For node-with-description type
  fontSize?: number;
  fontColor?: string;
  fontFamily?: string;
  textAnchor?: "start" | "middle" | "end";
  padding?: number;

  // Description-specific styling
  descriptionFontSize?: number;
  descriptionFontColor?: string;
  descriptionMarginTop?: number;

  // Advanced styling
  shadow?: boolean;
  shadowColor?: string;
  shadowOffset?: Point;
  gradient?: boolean;
  gradientStartColor?: string;
  gradientEndColor?: string;

  // Icon support
  icon?: string;
  iconSize?: number;
  iconColor?: string;

  // Custom attributes for advanced customization
  customAttributes?: { [key: string]: string | number };

  // Collapsible node options
  collapsible?: boolean;
  expanded?: boolean;
  onToggleExpand?: (expanded: boolean) => void;
}
