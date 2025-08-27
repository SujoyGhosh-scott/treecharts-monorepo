import {
  TreeChartOptions,
  NodeConfig,
  EdgeConfig,
  TitleConfig,
  ActionConfig,
} from "../types";

/**
 * SVG namespace for creating SVG elements
 */
export const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Node-related constants used throughout the library
 */
export const NODE_CONSTANTS = {
  // Default dimensions
  DEFAULT_MAX_WIDTH: 200,
  DEFAULT_PADDING: 5,

  // Layout constants
  BASE_PADDING: 20,
  SPACE_FOR_ARROW_BUTTON: 20,
  SMALL_MARGIN: 20,
  EXTRA_TITLE_SPACING: 30,

  // Text and typography
  DESCRIPTION_LINE_HEIGHT: 1.2,
  DESCRIPTION_FONT_SIZE: 11,
  DESCRIPTION_MARGIN_TOP: 4,
  BUTTON_FONT_SIZE: 10,
  DEFAULT_FONT_SIZE: 14,
  DEFAULT_TEXT_SIZE: 12,
  MIN_WIDTH_FOR_DESCRIPTION: 100,

  // Collapsible node specific
  BUTTON_WIDTH: 16,
  ACTION_BUTTON_SIZE: 24,
  ACTION_BUTTON_CENTER_OFFSET: 12,

  // Animation and visual effects
  STAR_POINTS: 8,
  CIRCLE_POINTS: 10,

  // Image node specific constants
  DEFAULT_IMAGE_WIDTH: 60,
  DEFAULT_IMAGE_HEIGHT: 60,
  DEFAULT_IMAGE_MARGIN: 8,
  DEFAULT_TEXT_PADDING: 8,
  DEFAULT_TEXT_SPACING: 4,
  DEFAULT_IMAGE_BORDER_RADIUS: 4,
  DEFAULT_IMAGE_BORDER_WIDTH: 1,
  DEFAULT_IMAGE_OPACITY: 1,
  DEFAULT_TITLE_FONT_SIZE: 12,
  DEFAULT_SUBTITLE_FONT_SIZE: 10,
  MIN_IMAGE_NODE_WIDTH: 120,
  MIN_IMAGE_NODE_HEIGHT: 60,

  // Default styling values
  DEFAULT_SHADOW_COLOR: "rgba(0,0,0,0.3)",
  DEFAULT_SHADOW_OFFSET: { x: 2, y: 2 },
  DEFAULT_BORDER_COLOR: "black",
  DEFAULT_BORDER_WIDTH: 1,
  DEFAULT_BORDER_RADIUS: 6,
  DEFAULT_OPACITY: 1,
  DEFAULT_FILL_COLOR: "skyblue",
  DEFAULT_FONT_COLOR: "black",
  DEFAULT_FONT_FAMILY: "Arial, sans-serif",
  DESCRIPTION_FONT_COLOR: "#666666",
  DEFAULT_TEXT_ANCHOR: "middle",
  DEFAULT_IMAGE_BORDER_COLOR: "#333333",
  DEFAULT_TITLE_COLOR: "#000000",
  DEFAULT_SUBTITLE_COLOR: "#666666",
} as const;

/**
 * Default options for tree chart rendering
 */
export const DEFAULT_OPTIONS: Required<
  Omit<TreeChartOptions, "actionConfig">
> & { actionConfig?: ActionConfig } = {
  // Chart layout defaults
  horizontalGap: 30,
  verticalGap: 80,
  verticalAlign: "center",
  horizontalAlign: "top-to-bottom",
  type: "direct",

  // Default node configuration
  nodeConfig: {
    type: "rectangle",
    width: 80,
    height: 40,
    color: "skyblue",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 6,
    opacity: 1,
    fontSize: 14,
    fontColor: "black",
    fontFamily: "Arial, sans-serif",
    shadow: false,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: { x: 2, y: 2 },
    gradient: false,
    gradientStartColor: "",
    gradientEndColor: "",
    customAttributes: {},
  } as Required<NodeConfig>,

  // Default edge configuration
  edgeConfig: {
    type: "direct",
    color: "black",
    width: 1,
    opacity: 1,
    dasharray: "",
    showArrows: false,
    arrowDirection: "source-to-target",
    arrowSize: 6,
    arrowColor: "black",
    curveRadius: 20,
    customPath: "",
    textSize: 12,
    textColor: "#666666",
    textBackgroundColor: "",
  } as Required<EdgeConfig>,

  // Default title configuration
  titleConfig: {
    title: "",
    description: "",
    position: {
      horizontal: "center",
      vertical: "top",
    },
    titleStyle: {
      fontSize: 14,
      fontColor: "#333333",
      fontFamily: "Arial, sans-serif",
      fontWeight: "bold",
      margin: 30,
    },
    descriptionStyle: {
      fontSize: 12,
      fontColor: "#666666",
      fontFamily: "Arial, sans-serif",
      fontWeight: "normal",
      margin: 20,
    },
  } as Required<TitleConfig>,
};
/**
 * Fixed dimensions for all-direction tree
 */
export const ALL_DIRECTION_DIMENSIONS = {
  svgWidth: 1200,
  svgHeight: 800,
  horizontalGap: 160,
  verticalGap: 100,
};
