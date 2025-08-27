import { SVG_NS, NODE_CONSTANTS } from "../constants";
import { NodeOptions } from "../types";
import { NodeRenderer, NodeRenderResult } from "./types";

/**
 * BaseNodeRenderer provides common functionality for all node renderers
 * Contains shared methods for styling, effects, and text handling
 */
export abstract class BaseNodeRenderer implements NodeRenderer {
  protected svg: SVGSVGElement;

  constructor(svg: SVGSVGElement) {
    this.svg = svg;
  }

  /**
   * Abstract method that subclasses must implement to create their specific shape
   */
  abstract render(
    options: Required<NodeOptions>,
    svg: SVGSVGElement
  ): NodeRenderResult;

  /**
   * Apply common styling to an SVG element
   */
  protected applyCommonStyling(
    element: SVGElement,
    options: Required<NodeOptions>
  ): void {
    // Only set fill if not using gradient
    if (
      !options.gradient ||
      !options.gradientStartColor ||
      !options.gradientEndColor
    ) {
      element.setAttribute("fill", options.fill);
    }
    element.setAttribute("stroke", options.stroke);
    element.setAttribute("stroke-width", options.strokeWidth.toString());
    element.setAttribute("opacity", options.opacity.toString());

    // Apply custom attributes
    Object.entries(options.customAttributes).forEach(([key, value]) => {
      element.setAttribute(key, value.toString());
    });
  }

  /**
   * Create shadow effect if enabled
   */
  protected createShadow(options: Required<NodeOptions>): SVGElement | null {
    if (!options.shadow) return null;

    const shadowElement = document.createElementNS(SVG_NS, "rect");
    shadowElement.setAttribute("width", options.width.toString());
    shadowElement.setAttribute("height", options.height.toString());
    shadowElement.setAttribute(
      "x",
      (options.x + options.shadowOffset.x).toString()
    );
    shadowElement.setAttribute(
      "y",
      (options.y + options.shadowOffset.y).toString()
    );
    shadowElement.setAttribute("fill", options.shadowColor);

    // Remove any stroke/border from shadow
    shadowElement.setAttribute("stroke", "none");
    shadowElement.setAttribute("stroke-width", "0");

    // Only add opacity if shadowColor doesn't already include alpha channel
    if (!options.shadowColor.includes("rgba")) {
      shadowElement.setAttribute("opacity", "0.3"); // Add transparency for shadow effect
    }
    shadowElement.setAttribute("rx", options.borderRadius.toString());
    shadowElement.setAttribute("ry", options.borderRadius.toString());

    return shadowElement;
  }

  /**
   * Create gradient definition if enabled
   */
  protected createGradient(options: Required<NodeOptions>): string | null {
    if (
      !options.gradient ||
      !options.gradientStartColor ||
      !options.gradientEndColor
    ) {
      return null;
    }

    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

    // Check if defs element exists, create if not
    let defs = this.svg.querySelector("defs");
    if (!defs) {
      defs = document.createElementNS(SVG_NS, "defs");
      this.svg.appendChild(defs);
    }

    const gradient = document.createElementNS(SVG_NS, "linearGradient");
    gradient.setAttribute("id", gradientId);
    gradient.setAttribute("x1", "0%");
    gradient.setAttribute("y1", "0%");
    gradient.setAttribute("x2", "100%");
    gradient.setAttribute("y2", "100%");

    const stop1 = document.createElementNS(SVG_NS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", options.gradientStartColor);

    const stop2 = document.createElementNS(SVG_NS, "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", options.gradientEndColor);

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);

    return `url(#${gradientId})`;
  }

  /**
   * Create basic text element
   */
  protected createBasicText(options: Required<NodeOptions>): SVGTextElement {
    const textElement = document.createElementNS(SVG_NS, "text");
    textElement.setAttribute("x", (options.x + options.width / 2).toString());
    textElement.setAttribute("y", (options.y + options.height / 2).toString());
    textElement.setAttribute("text-anchor", options.textAnchor);
    textElement.setAttribute("dominant-baseline", "middle");
    textElement.setAttribute("font-family", options.fontFamily);
    textElement.setAttribute("font-size", options.fontSize.toString());
    textElement.setAttribute("font-weight", "bold");
    textElement.setAttribute("fill", options.fontColor);
    textElement.setAttribute("stroke", "none");
    textElement.setAttribute("stroke-width", "0");
    textElement.textContent = options.text;

    return textElement;
  }

  /**
   * Measure text width using canvas context
   */
  protected measureText(
    text: string,
    fontSize: number,
    fontFamily: string
  ): number {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return text.length * fontSize * 0.6; // Fallback estimation

    context.font = `${fontSize}px ${fontFamily}`;
    return context.measureText(text).width;
  }

  /**
   * Calculate lines needed for text wrapping
   */
  protected calculateTextLines(
    text: string,
    maxWidth: number,
    fontSize: number,
    fontFamily: string
  ): string[] {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return [text]; // Fallback

    context.font = `${fontSize}px ${fontFamily}`;

    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = context.measureText(testLine).width;

      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  /**
   * Create multiple text lines for wrapped text
   */
  protected createWrappedText(
    lines: string[],
    x: number,
    startY: number,
    fontSize: number,
    fontFamily: string,
    fontColor: string,
    lineHeight: number = 1.2
  ): SVGTextElement[] {
    const textElements: SVGTextElement[] = [];

    lines.forEach((line, index) => {
      const textElement = document.createElementNS(SVG_NS, "text");
      textElement.setAttribute("x", x.toString());
      textElement.setAttribute(
        "y",
        (startY + index * fontSize * lineHeight).toString()
      );
      textElement.setAttribute("text-anchor", "middle");
      textElement.setAttribute("dominant-baseline", "middle");
      textElement.setAttribute("font-family", fontFamily);
      textElement.setAttribute("font-size", fontSize.toString());
      textElement.setAttribute("font-weight", "normal");
      textElement.setAttribute("fill", fontColor);
      textElement.setAttribute("stroke", "none");
      textElement.setAttribute("stroke-width", "0");
      textElement.textContent = line;

      textElements.push(textElement);
    });

    return textElements;
  }

  /**
   * Create a rectangle element with common styling
   */
  protected createRectangleElement(
    options: Required<NodeOptions>
  ): SVGRectElement {
    const rect = document.createElementNS(SVG_NS, "rect");

    rect.setAttribute("width", options.width.toString());
    rect.setAttribute("height", options.height.toString());
    rect.setAttribute("x", options.x.toString());
    rect.setAttribute("y", options.y.toString());
    rect.setAttribute("rx", options.borderRadius.toString());
    rect.setAttribute("ry", options.borderRadius.toString());

    // Apply gradient or solid fill
    const gradientUrl = this.createGradient(options);
    const fill = gradientUrl || options.fill;
    rect.setAttribute("fill", fill);

    // Apply common styling
    this.applyCommonStyling(rect, options);

    return rect;
  }

  /**
   * Create canvas-based text wrapping for descriptions
   */
  protected createWrappedDescriptionText(
    description: string,
    maxTextWidth: number,
    fontSize: number,
    fontFamily: string,
    x: number,
    startY: number,
    fillColor: string,
    lineHeight: number = NODE_CONSTANTS.DESCRIPTION_LINE_HEIGHT,
    textAnchor: "start" | "middle" | "end" = "middle"
  ): SVGElement[] {
    const elements: SVGElement[] = [];

    // Create canvas for text measurement
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) return elements;

    context.font = `${fontSize}px ${fontFamily}`;

    // Wrap text using simple word wrapping
    const words = description.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? currentLine + " " + word : word;
      const testWidth = context.measureText(testLine).width;

      if (testWidth > maxTextWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }

    // Create text elements for each line
    lines.forEach((line, index) => {
      const lineY = startY + index * fontSize * lineHeight;

      const descriptionText = document.createElementNS(SVG_NS, "text");
      descriptionText.setAttribute("x", x.toString());
      descriptionText.setAttribute("y", lineY.toString());
      descriptionText.setAttribute("font-family", fontFamily);
      descriptionText.setAttribute("font-size", fontSize.toString());
      descriptionText.setAttribute("font-weight", "normal");
      descriptionText.setAttribute("fill", fillColor);
      descriptionText.setAttribute("stroke", "none");
      descriptionText.setAttribute("stroke-width", "0");
      descriptionText.setAttribute("text-anchor", textAnchor);
      descriptionText.setAttribute("dominant-baseline", "alphabetic");
      descriptionText.textContent = line;
      elements.push(descriptionText);
    });

    return elements;
  }

  /**
   * Calculate lines needed for text wrapping using canvas measurement
   */
  protected calculateWrappedTextLines(
    text: string,
    maxWidth: number,
    fontSize: number,
    fontFamily: string
  ): number {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) return 1;

    context.font = `${fontSize}px ${fontFamily}`;

    const words = text.split(" ");
    let lines = 1;
    let currentLineWidth = 0;

    for (const word of words) {
      const wordWidth = context.measureText(word + " ").width;
      if (currentLineWidth + wordWidth > maxWidth && currentLineWidth > 0) {
        lines++;
        currentLineWidth = wordWidth;
      } else {
        currentLineWidth += wordWidth;
      }
    }

    return lines;
  }

  /**
   * Create an SVG group container
   */
  protected createGroup(): SVGGElement {
    return document.createElementNS(SVG_NS, "g");
  }
}
