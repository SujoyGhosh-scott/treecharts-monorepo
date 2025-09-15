// Export main React component
export { TreeChart, default } from "./TreeChart";
export type { TreeChartProps, TreeChartRef } from "./types";

// Re-export types from core library for convenience
export type {
  TreeNode,
  TreeChartOptions,
  NodeConfig,
  EdgeConfig,
  TitleConfig,
  ActionConfig,
  TreeType,
  NodeType,
  VerticalAlignment,
  HorizontalAlignment,
  ArrowDirection,
  Point,
  ConnectionOptions,
  ImageConfig,
  ImageTitleConfig,
  ImageSubtitleConfig,
  ImageTextPositionConfig,
  CollapsibleNodeState,
  TitlePosition,
  ActionPosition,
} from "treecharts";
