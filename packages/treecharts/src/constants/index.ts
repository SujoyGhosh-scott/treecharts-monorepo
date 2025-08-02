/**
 * SVG namespace for creating SVG elements
 */
export const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Default options for tree chart rendering
 */
export const DEFAULT_OPTIONS = {
  boxWidth: 80,
  boxHeight: 40,
  horizontalGap: 30,
  verticalGap: 80,
  verticalAlign: "center",
  horizontalAlign: "top-to-bottom",
  nodeColor: "skyblue",
  lineColor: "black",
  nodeBorderRadius: 0,
  nodeBorderColor: "black",
  fontSize: 14,
  fontColor: "black",
  type: "direct",
  // Connection styling defaults
  connectionType: "direct",
  lineWidth: 1,
  lineDasharray: "",
  showArrows: false,
  arrowDirection: "source-to-target",
  arrowSize: 6,
  curveRadius: 20,
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
