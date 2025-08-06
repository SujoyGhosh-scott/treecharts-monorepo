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
    borderRadius: 0,
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
    icon: "",
    iconSize: 16,
    iconColor: "black",
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
