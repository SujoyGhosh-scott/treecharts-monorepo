import { SVG_NS } from "../constants";
import { FormattedTreeNode, TreeChartOptions } from "../types";

/**
 * Creates an SVG element with the specified dimensions
 *
 * @param width Width of the SVG
 * @param height Height of the SVG
 * @param viewBox Optional viewBox attribute
 * @returns SVG element
 */
export function createSvgElement(
  width: number,
  height: number,
  viewBox?: string
): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("width", width.toString());
  svg.setAttribute("height", height.toString());

  if (viewBox) {
    svg.setAttribute("viewBox", viewBox);
  }

  return svg;
}

/**
 * Creates a node (rectangle with text) in the SVG
 *
 * @param svg SVG element to add the node to
 * @param x X position of the node
 * @param y Y position of the node
 * @param text Text to display in the node
 * @param options Styling options
 * @returns Object with node elements and dimensions
 */
export function createNode(
  svg: SVGSVGElement,
  x: number,
  y: number,
  text: string,
  options: TreeChartOptions
): {
  rect: SVGRectElement;
  text: SVGTextElement;
  centerX: number;
  centerY: number;
} {
  const {
    boxWidth,
    boxHeight,
    nodeColor,
    nodeBorderColor,
    nodeBorderRadius,
    fontSize,
    fontColor,
  } = options;

  // Create rectangle
  const rect = document.createElementNS(SVG_NS, "rect");
  rect.setAttribute("x", x.toString());
  rect.setAttribute("y", y.toString());
  rect.setAttribute("width", boxWidth!.toString());
  rect.setAttribute("height", boxHeight!.toString());
  rect.setAttribute("fill", nodeColor!);
  rect.setAttribute("stroke", nodeBorderColor!);

  if (nodeBorderRadius && nodeBorderRadius > 0) {
    rect.setAttribute("rx", nodeBorderRadius.toString());
  }

  svg.appendChild(rect);

  // Calculate center positions
  const centerX = x + boxWidth! / 2;
  const centerY = y + boxHeight! / 2;

  // Create text
  const textElement = document.createElementNS(SVG_NS, "text");
  textElement.setAttribute("x", centerX.toString());
  textElement.setAttribute("y", (centerY + 5).toString()); // +5 for vertical centering
  textElement.setAttribute("text-anchor", "middle");
  textElement.setAttribute("font-size", fontSize!.toString());
  textElement.setAttribute("fill", fontColor!);
  textElement.textContent = text;
  svg.appendChild(textElement);

  return { rect, text: textElement, centerX, centerY };
}

/**
 * Creates a straight line between two points
 *
 * @param svg SVG element to add the line to
 * @param x1 Starting X position
 * @param y1 Starting Y position
 * @param x2 Ending X position
 * @param y2 Ending Y position
 * @param color Line color
 * @returns The created line element
 */
export function createLine(
  svg: SVGSVGElement,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string
): SVGLineElement {
  const line = document.createElementNS(SVG_NS, "line");
  line.setAttribute("x1", x1.toString());
  line.setAttribute("y1", y1.toString());
  line.setAttribute("x2", x2.toString());
  line.setAttribute("y2", y2.toString());
  line.setAttribute("stroke", color);
  svg.appendChild(line);
  return line;
}

/**
 * Creates a curved path between two points
 *
 * @param svg SVG element to add the path to
 * @param x1 Starting X position
 * @param y1 Starting Y position
 * @param x2 Ending X position
 * @param y2 Ending Y position
 * @param curvature Amount of curve (0-1)
 * @param color Path color
 * @returns The created path element
 */
export function createCurvedPath(
  svg: SVGSVGElement,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  curvature: number,
  color: string
): SVGPathElement {
  const path = document.createElementNS(SVG_NS, "path");

  // Calculate the vertical distance for the curve intensity
  const verticalDistance = Math.abs(y2 - y1);
  const curveIntensity = verticalDistance * curvature;

  // Control points for the bezier curve
  const control1X = x1;
  const control1Y = y1 + (y2 > y1 ? curveIntensity : -curveIntensity);
  const control2X = x2;
  const control2Y = y2 - (y2 > y1 ? curveIntensity : -curveIntensity);

  const d = `M ${x1} ${y1} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${x2} ${y2}`;

  path.setAttribute("d", d);
  path.setAttribute("stroke", color);
  path.setAttribute("fill", "none");
  svg.appendChild(path);

  return path;
}

/**
 * Utility to get node map key from level and position
 *
 * @param level Level in the tree
 * @param position Position within the level
 * @returns String key for the node map
 */
export function getNodeKey(level: number, position: number): string {
  return `${level}-${position}`;
}

/**
 * Export utility functions
 */
export const svgHelpers = {
  createSvgElement,
  createNode,
  createLine,
  createCurvedPath,
  getNodeKey,
};
