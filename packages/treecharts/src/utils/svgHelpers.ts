import { SVG_NS } from "../constants";

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
  getNodeKey,
};
